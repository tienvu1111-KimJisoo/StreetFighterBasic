import { Camera } from '../engine/Camera.js';
import { Ken } from '../entities/fighters/Ken.js';
import { Ryu } from '../entities/fighters/Ryu.js';
import { Shadow } from '../entities/fighters/shared/Shadow.js';
import { KenStage } from '../entities/stage/KenStage.js';
import { StatusBar } from '../entities/overlays/StatusBar.js';
import { FpsCounter } from '../entities/overlays/FpsCounter.js';
import { STAGE_MID_POINT, STAGE_PADDING } from '../constants/stage.js';
import { gameState } from '../state/gameState.js';
import { FighterAttackStrength, FighterId, FighterAttackBaseData, FIGHTER_HURT_DELAY } from '../constants/fighter.js';
import { LightHitSplash } from '../entities/fighters/shared/LightHitSplash.js';
import { MediumHitSplash } from '../entities/fighters/shared/MediumHitSplash.js';
import { HeavyHitSplash } from '../entities/fighters/shared/HeavyHitSplash.js';
import { FRAME_TIME } from '../constants/game.js';

export class BattleScene {
    fighters = [];
    camera = undefined;
    shadow = [];
    entities = [];
    hurtTimer = undefined;
    fightersDrawOrder = [0, 1];

    constructor(){
        this.stage = new KenStage();

        this.overlays = [
            new StatusBar(),
            new FpsCounter(),
        ];

        this.startRound();
    }

    getFighterEntityClass(id){
        switch(id){
            case FighterId.RYU:
                return Ryu;
            case FighterId.KEN:
                return Ken;
            default:
                throw new Error('Unimplemented fighter entity request!');
        }
    }

    getFighterEntity(fighterState, index){
        const FighterEntityClass = this.getFighterEntityClass(fighterState.id);

        return new FighterEntityClass(index, this.handleAttackHit.bind(this));
    }

    getFighterEntities(){
        const fighterEntities = gameState.fighters.map(this.getFighterEntity.bind(this));

        fighterEntities[0].opponent = fighterEntities[1];
        fighterEntities[1].opponent = fighterEntities[0];

        return fighterEntities;
    }

    getHitSplashClass(strength){
        switch(strength){
            case FighterAttackStrength.LIGHT:
                return LightHitSplash;
            case FighterAttackStrength.MEDIUM:
                return MediumHitSplash;
            case FighterAttackStrength.HEAVY:
                return HeavyHitSplash;   
            default:
                throw new Error('Unknown strength requested!');
        }
    }

    addEntity(EntityClass, ...args){
        this.entities.push(new EntityClass(...args, this.removeEntity.bind(this)));
    }

    removeEntity(entity){
        this.entities = this.entities.filter((thisEntity) => thisEntity !== entity);
    }

    handleAttackHit(time, playerId, opponentId, position, strength){
        gameState.fighters[playerId].score += FighterAttackBaseData[strength].score;
        gameState.fighters[opponentId].hitPoints -= FighterAttackBaseData[strength].damage;

        // slide
        this.hurtTimer = time.previous + (FIGHTER_HURT_DELAY * FRAME_TIME);
        //////////////

        this.fighterDrawOrder = [playerId, opponentId];
        this.addEntity(this.getHitSplashClass(strength), position.x, position.y, playerId);
    }

    startRound(){
        this.fighters = this.getFighterEntities();
        this.camera = new Camera(STAGE_MID_POINT + STAGE_PADDING - 192, 16, this.fighters);
        this.shadows = this.fighters.map(fighter => new Shadow(fighter));
    }

    updateFighter(time, context){
        for(const fighter of this.fighters){
            if(time.previous < this.hurtTimer) {
                fighter.updateHurtShake(time, this.hurtTimer);
            } else {
                fighter.update(time, context, this.camera);
            }
        }
    }

    updateShadow(time, context){
        for(const shadow of this.shadows){
            shadow.update(time, context, this.camera);
        }
    }

    updateEntities(time, context){
        for(const entity of this.entities){
            entity.update(time, context, this.camera);
        }
    }

    updateOverlays(time, context){
        for(const overlay of this.overlays){
            overlay.update(time, context, this.camera);
        }
    }

    update(time, context){
        this.updateFighter(time, context);
        this.updateShadow(time, context);
        this.stage.update(time);
        this.updateEntities(time, context);
        this.camera.update(time, context);
        this.updateOverlays(time, context);
    }

    drawFighters(context){
        for(const fighterId of this.fightersDrawOrder){
            this.fighters[fighterId].draw(context, this.camera);
        }
    }

    drawShadows(context){
        for(const shadow of this.shadows){
            shadow.draw(context, this.camera);
        }
    }

    drawEntities(context){
        for(const entity of this.entities){
            entity.draw(context, this.camera);
        }
    }

    drawOverlays(context){
        for(const overlay of this.overlays){
            overlay.draw(context, this.camera);
        }
    }

    draw(context){
        this.stage.drawBackground(context, this.camera);
        this.drawShadows(context);
        this.drawFighters(context);
        this.drawEntities(context);
        this.stage.drawForeground(context, this.camera);
        this.drawOverlays(context);
    }
}