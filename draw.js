var scale = 10;

function drawVector(ctx, pos, dir, color) {
    ctx.beginPath();
    var p1 = Vector.multiply(pos,scale);
    var d1 = Vector.multiply(dir, scale);
    var end = Vector.add(p1,d1);
    ctx.moveTo(p1.x,ctx.canvas.height-p1.y);
    ctx.lineTo(end.x,ctx.canvas.height-end.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawLine (ctx, pos1, pos2, color) {
    ctx.beginPath();
    var p1 = Vector.multiply(pos1,scale);
    var p2 = Vector.multiply(pos2,scale);
    ctx.moveTo(p1.x,ctx.canvas.height-p1.y);
    ctx.lineTo(p2.x,ctx.canvas.height-p2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawFilledCircle(ctx, pos, radius, color) {
    ctx.beginPath();
    var p1 = Vector.multiply(pos,scale);
    ctx.arc(p1.x, ctx.canvas.height-p1.y, radius*scale, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}

function drawCircle(ctx, pos, radius, color) {
    ctx.beginPath();
    var p1 = Vector.multiply(pos,scale);
    ctx.arc(p1.x, ctx.canvas.height-p1.y, radius*scale, 0, 2 * Math.PI, false);
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawTarget(ctx, pos, color) {
    ctx.beginPath();
    var p1 = Vector.multiply(pos,scale);
    ctx.arc(p1.x, ctx.canvas.height-p1.y, 10, 0, 2 * Math.PI, false);
    ctx.arc(p1.x, ctx.canvas.height-p1.y, 20, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawText(ctx, pos, text)
{
    ctx.fillStyle = 'black';
    ctx.font = "20px Arial";
    var p1 = Vector.multiply(pos,scale);
    ctx.fillText(text,p1.x,ctx.canvas.height-p1.y);
}