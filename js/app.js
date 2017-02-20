var score = 0;
var selected = false;

// Enemies our player must avoid
var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -83;
    this.y = 60 + Math.floor(Math.random() * 3) * 83;
    this.speed = 200 + Math.random() * 300;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x += dt * this.speed;
    } else {
        this.x = -83;
        this.y = 60 + Math.floor(Math.random() * 3) * 83;
        this.speed = 200 + Math.random() * 300;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 392;
};

Player.prototype.update = function () {
    if (this.y === -23) {
        score += 1;
        this.y = 392;
        console.log(score);
    }

    for (var i = 0; i < allEnemies.length; i++) {

        if (allEnemies[i].x + 101 >= this.x && allEnemies[i].x - 101 <= this.x + 101 && allEnemies[i].y === this.y) {
            score -= 1;
            this.x = 202;
            this.y = 392;
        }
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case 'left':
            if (this.x >= 101) {
                this.x -= 101;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
            break;
        case 'down':
            if (this.y < 392) {
                this.y += 83;
            }
            break;
    }
};

// character
var Character = function (num) {
    var charArr = ['images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-pink-girl.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png'
    ];
    this.sprite = charArr[num];
    this.x = num * 101;
    this.y = 392;
};

Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Selector
var Selector = function () {
    this.charArr = ['images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-pink-girl.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png'
    ];
    this.num = 2;
    this.x = 202;
    this.y = 392;
    this.selected = false;
    this.charSprite = this.charArr[2];
};

Selector.prototype.render = function () {
    ctx.drawImage(Resources.get('images/Selector.png'), this.x, this.y);
};

Selector.prototype.handleInput = function (keyCode) {
    switch (keyCode) {
        case 'left':
            if (this.x >= 101) {
                this.x -= 101;
                this.num -= 1;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
                this.num += 1;
            }
            break;
        case 'up':
        case 'down':
            this.selected = true;
            player.sprite = this.charArr[this.num];
            player.x = this.x;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();
var character0 = new Character(0);
var character1 = new Character(1);
var character2 = new Character(2);
var character3 = new Character(3);
var character4 = new Character(4);
var allCharacters = [character0, character1, character2, character3, character4];
var selector = new Selector();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (selector && selector.selected) {
        player.handleInput(allowedKeys[e.keyCode]);
    } else {
        selector.handleInput(allowedKeys[e.keyCode]);
    }
});

// selector
// function selector() {
//     var charArr = ['images/char-boy.png',
//             'images/char-cat-girl.png',
//             'images/char-pink-girl.png',
//             'images/char-horn-girl.png',
//             'images/char-princess-girl.png'
//         ],
//         num = charArr.length,
//         i = 0;
//         // selectorImg = new Image();

//         // selectorImg.src = 'images/Selector.png';

//     for (; i < num; i++) {
//         ctx.drawImage(Resources.get(charArr[i]), i * 101, 392);
//         Resources.get(charArr[i]).addEventListener('mouseover', function(i){
//             ctx.drawImage(selectorImg, i * 101, 392);
//         });
//     }
// }