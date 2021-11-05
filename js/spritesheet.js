class SpriteSheet
{
    constructor(img, sx, sy, sWidth, sHeight, width, height)
    {
        this.image = new Image();
        this.image.src = img;
        this.sx = sx;
        this.sy = sy;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.width = width;
        this.height = height;
    }
    updateSprite(px, py)
    {
        this.sx = px;
        this.sy = py;
    }
    draw(x, y)
    {
        ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, 
        this.sHeight, x, y, this.width, this.height);
    }
}