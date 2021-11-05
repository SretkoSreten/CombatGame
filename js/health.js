class HealthBar
{
    constructor(x, y, health, side)
    {
        this.x = x;
        this.y = y;
        this.health = health;
        this.max_health = health;
        this.w = 0;
        this.h = 20;
        this.pad = 180;
        this.side = side;
    }
    draw()
    {
        this.w = this.getPercentage() * this.pad;
        
        this.drawHealthBack();

        if (this.side == "left")
        {
            ctx.fillStyle = "#8BC34A";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }
        if (this.side == "right")
        {
            let max_health_w = (this.max_health / this.max_health) * this.pad;
            ctx.fillStyle = "#8BC34A";
            ctx.fillRect(this.x + (max_health_w - this.w), this.y, this.w, this.h);
        }

        ctx.fillStyle = "white";
        ctx.font = "bold 15px Arial";
        
        if (this.side == "left")
            ctx.fillText("Sub-Zero", this.x + 50, this.y - 10);
        if (this.side == "right")
            ctx.fillText("Kano", canvas.width - 60, this.y - 10);
    }
    takeDamage(damage)
    {
        this.health -= damage;
        if (this.health <= 0) this.health = 0;
    }
    drawHealthBack()
    {
        let w = (this.max_health / this.max_health) * this.pad;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, w, this.h);
    }
    getPercentage()
    {
        return this.health / this.max_health;
    }
    getHealth()
    {
        return this.health;
    }
}