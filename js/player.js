class Player
{
    constructor(player_stats, folderUrl, side, controllers)
    {
        this.x = player_stats.x;
        this.y = player_stats.y;
        this.player_stats = player_stats;
        this.side = side;
        this.controllers = controllers;

        this.animationList = [];
        this.animationsLen = 10;
        this.animationFrame = 0;
        this.animationIndex = 0;
        this.animationType = 0;

        this.health = null;
        this.enemy = null;

        this.left = false;
        this.right = false;
        this.isLoop = true;
        this.dead = false;
        this.over = false;

        this.gravity = 0.45;
        this.vely = 0;
        this.w = 150;
        this.speed = 5;
        this.h = 130;
        this.isGround = true;
        this.isJumping = false;
        this.isAttacking = false;
        this.minDistance = 50;

        this.setAnimationsSprites(folderUrl);
        this.setHealthBar();

    }
    setHealthBar()
    {
        this.health = new HealthBar(this.player_stats.healthBarX, this.player_stats.healthBarY, 
        100, this.side);   
    }
    setSprites(actionType, animationLen, side, playerUrl)
    {
        let tempList = [];

        for (let i = 0; i < animationLen; i++)
        {
            let imageUrl = `D:/Projects/WebProjects/Games/fighters/images/${playerUrl}/${side}/${actionType}/${i}.png`;
            let sprite = new SpriteSheet(imageUrl, 0, 0, 180, 130, 
                this.w, this.h)
            tempList.push(sprite);
        }
        this.animationList.push(tempList);
    }
    draw()
    {
        this.health.draw();

        this.setAnimations();

        if (this.over) return;

        if (this.side == "left" && !this.isJumping){
            if (this.right) this.walk();
            if (this.left) this.walking_backward();
        }
        if (this.side == "right" && !this.isJumping){
            if (this.left) this.walk();
            if (this.right) this.walking_backward();
        }
    }
    setAnimations()
    {   
        if (this.isLoop){

            let len = this.animationList[this.animationType].length;

            if (this.animationIndex != 0 && this.animationIndex % len == 0 && this.dead){ 
                this.over = true;
                this.animationIndex = len - 1;
                return;
            }

            if (this.left == false && this.right == false)
                this.stand();
            
            this.sprite = this.animationList[this.animationType][this.animationIndex % len];
            this.sprite.draw(this.x, this.y);
        }
        else
        {
            let len = this.animationList[this.animationType].length;

            if (this.animationIndex != 0 && this.animationIndex % len == 0 && this.dead){ 
                this.over = true;
                this.animationIndex = len - 1;
                return;
            }

            if (this.animationIndex != 0 && this.animationIndex % len == 0){ 
                this.stand();
                return;
            }
            this.sprite = this.animationList[this.animationType][this.animationIndex % len];
            this.sprite.draw(this.x, this.y);            
        }
    }
    update(dt)
    {
        if (this.over) return;

        this.animationFrame += dt;

        if (this.animationFrame >= 0.05 && !this.dead){
            this.animationFrame = 0;
            this.animationIndex += 1;
        }
        
        if (this.animationFrame >= 0.05 && this.dead){
            this.animationFrame = 0;
            this.animationIndex += 1;
            this.y += 10;
        }

        if (this.animationIndex >= this.animationsLen)
            this.animationIndex = 0;

        if (this.left)
            this.x -= this.speed;
        if (this.right)
            this.x += this.speed;

        this.y += this.vely;
        this.vely += this.gravity;

        this.x = this.clamp(
            this.x,
            0,
            canvas.width - this.w / 2
        );

        let health = this.health.getHealth();

        if (health <= 0 && !this.dead)
        {
            this.dead = true;
            this.fall();
        }
    }
    collide(enemy)
    {
        if (this.y > canvas.height - 150)
        {
            this.isGround = true;
            this.vely = 0;
        }

        let dis = Math.sqrt(
            Math.pow(this.x - enemy.x, 2) + 
            Math.pow(this.y - enemy.y, 2) 
        );

        if (dis <= 40)
        {
            if (this.side == "left")
                enemy.x += enemy.speed;
            if (this.side == "right")
                enemy.x -= enemy.speed;
        }
        if (dis <= this.minDistance)
        {
            this.isAttacking = true;
            this.enemy = enemy;
        }
        else
        {
            this.isAttacking = false;
        }
    }    
    clamp(v, min, max) {
        if (v < min) {
          return min;
        } else if (v > max) {
          return max;
        } else {
          return v;
        }
    }
    low_kick()
    {
        if (this.isAttacking) {
            this.enemy.health.takeDamage(this.player_stats.low_kick_damage);
        }

        this.animationType = 3;
        this.animationIndex = 0;
        this.isLoop = false;
    }
    uppercut()
    {
        if (this.isAttacking) {
            this.enemy.health.takeDamage(this.player_stats.uppercut_damage);
        }

        this.animationType = 1;
        this.animationIndex = 0;
        this.isLoop = false;
    }
    jumping()
    {
        if (this.left || this.right) return;
        this.isGround = false;
        this.animationType = 4;
        this.animationIndex = 0;
        this.isLoop = false;
        this.vely = -7;
    }
    high_punch()
    {
        if (this.isAttacking) {
            this.enemy.health.takeDamage(this.player_stats.high_punch_damage);
        }

        this.animationType = 5;
        this.animationIndex = 0;
        this.isLoop = false;
    }
    high_kick()
    {
        if (this.isAttacking) {
            this.enemy.health.takeDamage(this.player_stats.high_kick_damage);
        }

        this.animationType = 6;
        this.animationIndex = 0;
        this.isLoop = false;
    }
    forward_jump()
    {
        this.isJumping = true;
        this.vely = -7;
        this.animationType = 7;
        this.animationIndex = 0;
        this.isLoop = false;
    }
    fall()
    {
        this.y += 20;
        this.dead = true;
        this.animationType = 8;
        this.animationIndex = 0;
        this.isLoop = false;
    }
    backward_jump()
    {
        this.isJumping = true;
        this.animationType = 9;
        this.animationIndex = 0;
        this.vely = -7;
        this.isLoop = false;
    }
    walking_backward()
    {
        this.animationType = 10;
        this.isLoop = true;
    }
    win()
    {
        this.over = true;
        this.animationType = 11;
        this.animationIndex = 0;
        this.isLoop = false;
    }
    walk()
    {
        this.animationType = 2;
        this.isLoop = true;
    }
    stand()
    {
        this.isJumping = false;
        this.animationType = 0;
        this.isLoop = true;
    }
    keydown(e)
    {
        if (this.dead) return;

        if (e.keyCode == this.controllers.left)
            this.left = true;
        if (e.keyCode == this.controllers.right)
            this.right = true;
        if (e.keyCode == this.controllers.low_kick)
            this.low_kick();
        if (e.keyCode == this.controllers.jumping && this.isGround)
            this.jumping();
        if (e.keyCode == this.controllers.high_kick)
            this.high_kick();
        if (e.keyCode == this.controllers.uppercut)
            this.uppercut();
        if (e.keyCode == this.controllers.high_punch)
            this.high_punch();
        if (e.keyCode == this.controllers.jumping && this.left)
            this.backward_jump();
        if (e.keyCode == this.controllers.jumping && this.right)
            this.forward_jump();
    }
    keyup(e)
    {
        if (e.keyCode == this.controllers.left)
            this.left = false;
        if (e.keyCode == this.controllers.right)
            this.right = false;
    }
    setAnimationsSprites(folderUrl)
    {
        this.setSprites("stand", 10, this.side, folderUrl)
        this.setSprites("uppercut", 5, this.side, folderUrl)
        this.setSprites("walking", 9, this.side, folderUrl)
        this.setSprites("low_kick", 6, this.side, folderUrl)
        this.setSprites("jumping", 6, this.side, folderUrl)
        this.setSprites("high_punch", 8, this.side, folderUrl)
        this.setSprites("high_kick", 7, this.side, folderUrl)
        this.setSprites("forward_jump", 8, this.side, folderUrl)
        this.setSprites("fall", 7, this.side, folderUrl)
        this.setSprites("backward_jump", 8, this.side, folderUrl)
        this.setSprites("walking_backward", 9, this.side, folderUrl)
        this.setSprites("win", 10, this.side, folderUrl)
    }
}