// get html elements
let livesScoreTag = document.getElementById('player-lives'),
    scoreTag = document.getElementById('player-score'),
    scores = document.getElementsByClassName('scores')[0],
    winnerAlert = document.getElementsByClassName('winner-alert')[0];
const restartButton = document.getElementById('restart-button');


// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.position = [x, y];
    this.width = 90;
    this.height = 75;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.position[0] += this.speed * (dt * 50); // 50 is a correction factor for dt

    // when enemy reaches canvas limit redraw on the left and calculate new speed
    if (this.position[0] >= 505) {
        this.position[0] = -101;
        this.speed = Math.floor(Math.random() * 10) + 3;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.position[0], this.position[1]);
};

Enemy.prototype.checkCollisions = function (player) {
    //console.log("Checked for collision");

    if (this.position[0] < player.position[0] + player.width  && this.position[0] + this.width  > player.position[0] &&
		this.position[1] < player.position[1] + player.height && this.position[1] + this.height > player.position[1]) {
        player.reset(false);
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y) {
        this.position = [x, y];
        this.sprite = 'images/char-boy.png';
        this.width = 90;
        this.height = 75;
        this.collisions = 0;
        this.lives = 5;
        this.score = 0;
        this.multiplier = 1; //this is to be increased everytime a gem is cathed
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.position[0], this.position[1])
    }
    update() {
        if (this.position[1] < 100) {;
            this.reset(true);
        };
        (this.lives === 0) ? gameover(): true;
    }
    updateScores() {
        //method to update scores on the page
        livesScoreTag.innerText = this.lives;
        scoreTag.innerText = this.score;
    }
    reset(win) {
        if (win === 'fullReset') {
            // to reinitiate the game
            this.collisions = 0;
            this.lives = 5;
            this.score = 0;
            isRunning = true;
            winnerAlert.classList.add('hidden');
            restartButton.before(scores);
        };
        if (win === true) {
            this.score += 1 * this.multiplier;
        }
        if (win === false) {
            this.collisions += 1;
            this.lives -= 1;
        }
        this.position = [200, 380];
        this.updateScores();
    }
    handleInput(pressedKey) {
        if (pressedKey === 'left') {
            this.position[0] -= 101;
            if (this.position[0] <= -10) {
                this.position[0] = 402;
                }
            };
        if (pressedKey === 'right') {
            this.position[0] += 101;
            if (this.position[0] >= 500) {
                this.position[0] = -2;
            }
        };
        if (pressedKey === 'up') {
            this.position[1] -= 83;
            if (this.position[1] <= -100) {
                this.position[1] += 83;
            }
        };
        if (pressedKey === 'down') {
            this.position[1] += 83;
            if (this.position[1] >= 470) {
                this.position[1] -= 83;
            }
        };
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let enemy1 = new Enemy(10, 135, 10);
    enemy2 = new Enemy(10, 215, 4),
    enemy3 = new Enemy(10, 305, 3);

let allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = new Player(200, 380);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
    console.log(player.position);
});

restartButton.addEventListener('click', function () {
    console.log('restart button clicked')
    player.reset('fullReset');
});

winnerAlert.addEventListener('click', function () {
    player.reset('fullReset');
});

function gameover() {
    isRunning = false;
    winnerAlert.classList.remove('hidden');
    winnerAlert.appendChild(scores);
};