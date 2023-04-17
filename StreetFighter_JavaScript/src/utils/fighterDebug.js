import { gameState } from '../state/gameState.js';
import { drawBox, drawCross } from './entityDebug.js';


export function DEBUG_drawCollisionInfo(fighter, context, camera){
    const { position, direction, boxes } = fighter;

    context.lineWidth = 1;

    drawBox(context, camera, position, direction, Object.values(boxes.push), '#55FF55');

    for(const hurtBox of Object.values(boxes.hurt)){
        drawBox(context, camera, position, direction, hurtBox, '#7777FF');
    }

    drawBox(context, camera, position, direction, Object.values(boxes.hit), '#FF0000');

    drawCross(context, camera, position, '#FFFFFF');
}

export function DEBUG_logHit(fighter, hitStrength, hitLocation) {
    console.log(`${gameState.fighters[fighter.playerId].id} has hit ${gameState.fighters[fighter.opponent.playerId].id}'s ${hitLocation} with a ${hitStrength} attack`);
}