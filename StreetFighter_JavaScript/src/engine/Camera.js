import { SCROLL_BOUNDRY, STAGE_HEIGHT, STAGE_PADDING, STAGE_WIDTH } from '../constants/stage.js';

export class Camera{
    constructor(x, y, fighters){
        this.position = {x, y};
        this.fighters = fighters;
    }

    update(_, context){
        const [{position: position1}, {position: position2}] = this.fighters;

        this.position.y = -5 +  Math.floor(Math.min(position1.y, position2.y) /10);

        const lowX = Math.min(position1.x, position2.x);
        const highX = Math.max(position1.x, position2.x);

        if(highX - lowX > context.canvas.width - SCROLL_BOUNDRY * 2){
            const midPoint = (highX - lowX) / 2;
            this.position.x = lowX + midPoint - (context.canvas.width /2);
        } else {
            for(const fighter of this.fighters){
                if(fighter.position.x < this.position.x + SCROLL_BOUNDRY){
                    this.position.x = fighter.position.x - SCROLL_BOUNDRY;
                } else if (fighter.position.x > this.position.x + context.canvas.width - SCROLL_BOUNDRY){
                    this.position.x = fighter.position.x - context.canvas.width + SCROLL_BOUNDRY;
                }
            }
        }

        if(this.position.x < STAGE_PADDING)
            this.position.x = STAGE_PADDING;
        if(this.position.x > STAGE_WIDTH + STAGE_PADDING - context.canvas.width)
            this.position.x = STAGE_WIDTH + STAGE_PADDING - context.canvas.width;

        if(this.position.y < 0)
            this.position.y = 0;
        if(this.position.y > STAGE_HEIGHT - context.canvas.height)
            this.position.y = STAGE_HEIGHT - context.canvas.height;
    }
}