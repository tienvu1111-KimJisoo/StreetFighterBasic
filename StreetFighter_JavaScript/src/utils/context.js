// export function drawFrame(context, image, dimensions, x, y, direction = 1){
//     const [sourceX, sourceY, sourceWidth, sourceHeight] = dimensions;

//     context.scale(direction, 1);
//     context.drawImage(
//         image,
//         sourceX, sourceY, sourceWidth, sourceHeight,
//         x * direction, y, sourceWidth, sourceHeight,
//     );
//     context.setTransform(1, 0, 0, 1, 0, 0);
// }

// export function drawFrame(context, frameKey, x, y){
//     const [sourceX, sourceY, sourceWidth, sourceHeight] = this.frames.get(frameKey);

//     context.drawImage(
//         this.image,
//         sourceX, sourceY, sourceWidth, sourceHeight,
//         x, y, sourceWidth, sourceHeight,
//     );
//     context.setTransform(1, 0, 0, 1, 0, 0)   
// }

export function getContext(){
    const canvasEl = document.querySelector('canvas');
    const context = canvasEl.getContext('2d');

    context.imageSmoothingEnabled = false;

    return context;
}