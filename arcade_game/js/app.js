

// get html elements
const livesScoreTag = document.getElementById('player-lives'),
    scoreTag = document.getElementById('player-score'),
    scores = document.getElementsByClassName('scores')[0],
    winnerAlert = document.getElementsByClassName('winner-alert')[0],
    lives = Array.from(document.getElementsByClassName('fa-heart')),
    restartButton = document.getElementById('restart-button');


//Game sounds
let jump = new Audio("sounds/Jump.mp3"),
    hit = new Audio('sounds/Slap.mp3'),
    applause = new Audio('sounds/Applause.mp3');

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

    if (this.position[0] < player.position[0] + player.width  &&
        this.position[0] + this.width  > player.position[0] &&
        this.position[1] < player.position[1] + player.height &&
        this.position[1] + this.height > player.position[1]) {
        player.reset(false);
        player.playSounds('hit');
    };
};


/**
* @description This is the player
* @constructor
* @param {int} x - x coordinate of the player inside the canvas
* @param {int} y - y coordinate of the player inside the canvas
*/
class Player {
    constructor(x, y) {
        this.position = [x, y];
        this.sprite = 'images/char-boy.png';
        this.width = 90;
        this.height = 75;
        this.collisions = 0;
        this.lives = 5;
        this.score = 0;
        this.multiplier = 1; //TODO: this is to be increased everytime a gem is cathed
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.position[0], this.position[1])
    }
    /**
     *
     * @description Used to keep track of winnings and losing the game
     * @memberof Player
     */
    update() {
        if (this.position[1] < 100) {
            this.reset(true);
            this.playSounds('win');
        };
        (this.lives === 0) ? gameover(): true;
    }
    /**
     *
     * @description Method to update score on the page
     * @memberof Player
     */
    updateScores() {
        scoreTag.innerText = this.score;
    }
    /**
    * @description This method resets the player and updates scores according to one of three options:
    * @param {string/boolean} win -
    *   - win === fullReset to restart scores and position
    *   - win === true after reaching water; resets position and increases score
    *   - win === false after being hit; resets position and decreases lives
    * @memberof Player
    */
    reset(win) {
        this.position = [215, 380];

        if (win === 'fullReset') {
            this.collisions = 0;
            this.lives = 5;
            this.score = 0;
            isRunning = true;

            winnerAlert.classList.add('hidden');
            lives.forEach(element => {
                //reset the lives
                element.classList.remove('hidden');
            });

            restartButton.before(scoreTag);
        };

        if (win === true) {
            this.score += 1 * this.multiplier;
        };

        if (win === false) {
            this.collisions += 1;
            this.lives -= 1;
            lives[this.lives].classList.add('hidden');
            this.position = [215, 463];
        };

        this.updateScores();
    }
    /**
     *
     * @description Method called by an eventListener for pressed keys; used to move the player
     * @param {string} pressedKey - four directional values to move the player
     * @memberof Player
     */
    handleInput(pressedKey) {
        switch (pressedKey) {
            case 'left':
                this.position[0] -= 101;
                if (this.position[0] <= -10) {
                    this.position[0] = 417;
                    };
                this.playSounds('move');
                break;
            case 'right':
                this.position[0] += 101;
                if (this.position[0] >= 500) {
                    this.position[0] = 13;
                };
                this.playSounds('move');
                break;
            case 'up':
                this.position[1] -= 83;
                if (this.position[1] <= -100) {
                    this.position[1] += 83;
                };
                this.playSounds('move');
                break;
            case 'down':
                this.position[1] += 83;
                if (this.position[1] >= 470) {
                    this.position[1] -= 83;
                };
                this.playSounds('move');
                break;
        }
    }
    playSounds(arg) {
        if (arg === 'move') {
            jump.currentTime = 0;
            jump.play();
            return
        };
        if (arg === 'hit') {
            hit.play();
            return
        };
        if (arg === 'win') {
            applause.play();
        }
    }
}

/*
* Instantiation of objects.
*/

let enemy1 = new Enemy(10, 135, 10);
    enemy2 = new Enemy(10, 215, 4),
    enemy3 = new Enemy(10, 305, 3);

//add enemies to the array needed by engine.js
let allEnemies = [enemy1, enemy2, enemy3];

const player = new Player(215, 380);

/**
* @description This listens for key presses and sends the keys to player.handleInput()
*/
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);

    // restart game by pressing spacebar
    if (e.keyCode === 32 ) {
        player.reset('fullReset');
    };
});

/*
* Click events for a full reset
*/

restartButton.addEventListener('click', function () {
    player.reset('fullReset');
});

winnerAlert.addEventListener('click', function () {
    player.reset('fullReset');
});

/**
* @description Function called when player lives reaches 0. Pauses rendering of the game,
* toggles the winner alert div and moves the score;
*/
function gameover() {
    isRunning = false;
    winnerAlert.classList.remove('hidden');
    winnerAlert.insertBefore(scoreTag, winnerAlert.children[2])
};