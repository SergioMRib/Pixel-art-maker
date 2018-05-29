// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.position = [x, y];
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y) {
        this.position = [x, y];
        this.sprite = 'images/char-boy.png'
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.position[0], this.position[1])
    }
    update() {
        return
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
            if (this.position[1] >= 400) {
                this.position[1] -= 83;
            }
        };
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let enemy1 = new Enemy(10, 60, 10),
    enemy2 = new Enemy(10, 145, 4),
    enemy3 = new Enemy(10, 225, 3);

let allEnemies = [enemy1, enemy2, enemy3];

// Place the player object in a variable called player
const player = new Player(200, 315);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    console.log('key pressed')
    player.handleInput(allowedKeys[e.keyCode]);
    console.log(player.position);
});
