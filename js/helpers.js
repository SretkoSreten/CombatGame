
const timestamp = (prev_time) => {
    let now = Date.now();
    dt = (now - prev_time) / 1000;
    return now;
}
const drawBackground = () => {
    let image = new Image();
    image.src = "D:/Projects/WebProjects/Games/fighters/images/arenas/arena.png";
    ctx.drawImage(image, 0, 0, 395, 250, 0, 0, canvas.width, canvas.height);
}
const checkWinner = (players) => {

    players.forEach(player => {
        player.draw();
        player.update(dt);
        players.forEach(enemy => {
            if (enemy == player) return;
            player.collide(enemy);
            if (enemy.health.getHealth() <= 0){
                player.win();
            }
        });
    });
}
const checkGameOver = (players) => {

    players.forEach(player => {
        if (player.dead){
            displayGameOver();
        }
    });
}