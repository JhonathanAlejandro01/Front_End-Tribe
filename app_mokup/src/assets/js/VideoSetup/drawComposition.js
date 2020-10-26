
function drawWithCompositing(ctx, image,compositOperation) {
    ctx.globalCompositeOperation = compositOperation;
    ctx.drawImage(image, 0, 0);
}