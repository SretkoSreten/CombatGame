const displayGameOver = () => {

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height) 
    ctx.fillStyle = `rgba(0, 0, 0, 0.8)` 
    ctx.fill() // do the drawing

    ctx.font = "40px Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "center"
    ctx.fillText("Game over", canvas.width/2, canvas.height/2);

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(`press space to start game`, canvas.width/2, canvas.height / 2 + 30);

    window.addEventListener("keydown", e => {
        if (e.keyCode == 32)
            window.location.reload();
    })
}
const displayLoadingScreen = () => {

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height) 
    ctx.fillStyle = `rgba(0, 0, 0, 1)` 
    ctx.fill() 

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center"
    ctx.fillText("Loading...", canvas.width/2, canvas.height/2);
}