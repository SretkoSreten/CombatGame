const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

let prev_time = Date.now();
let dt = 0;

let startGame = true;

let players = [];

const player1_controllers =
{
    left: 65,
    right: 68,
    uppercut: 81,
    low_kick: 88,
    high_kick: 87,
    high_punch: 90,
    jumping: 32,
}
const player2_controllers =
{
    left: 74,
    right: 76,
    uppercut: 77,
    low_kick: 85,
    high_kick: 79,
    high_punch: 80,
    jumping: 73,
}

const player1_stats =
{
    x: 50,
    y : canvas.height - 150,
    healthBarX: 20,
    healthBarY: 40,
    low_kick_damage: 20,
    high_kick_damage: 20,
    uppercut_damage: 20,
    high_punch_damage: 20,
}

const player2_stats =
{
    x: canvas.width - 120,
    y : canvas.height - 150,
    healthBarX: canvas.width - 200,
    healthBarY: 40,
    low_kick_damage: 20,
    high_kick_damage: 20,
    uppercut_damage: 20,
    high_punch_damage: 20,
}

const setPlayers = () => {

    const player = new Player(player1_stats, "player1", "left", player1_controllers);
    const player1 = new Player(player2_stats, "player2", "right", player2_controllers);

    players.push(player);
    players.push(player1);

    players.forEach(player => {
        window.addEventListener("keydown", e => player.keydown(e));
        window.addEventListener("keyup", e => player.keyup(e));
    });

}

const setup = () => {

    startGame = true;

    setPlayers();

    const loop = () => {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        window.requestAnimationFrame(loop);

        if (startGame)
        {
            setTimeout(() => startGame = false, 1000);
            displayLoadingScreen();
            return;
        }

        drawBackground();

        prev_time = timestamp(prev_time);

        checkWinner(players);
        checkGameOver(players);
    }
    loop();
}
setup();