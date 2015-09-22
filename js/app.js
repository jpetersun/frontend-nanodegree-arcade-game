var Character = function(loc){
    this.loc = loc;
};
Character.prototype.move = function(){
    this.loc++;
};

// Creates the enemy with x, y, and speed values.
//The r value represents its width and the b value
//represents its height. These values are used to
//determine a collision if conditions are met.
var Enemy = function(locX, locY, speed){
    Character.call(this, locX, locY);
    this.sprite = 'images/enemy-bug.png';
    this.x = locX;
    this.y = locY;
    this.speed = speed;
    this.r = 101 / 3;
    this.b = 171 / 3;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Updates and multiplies the enemies given speed by time
    //delta then adds that value to the enemies current x
    //pixel position.
    this.x = this.x + (this.speed * dt);

    //If the enemies current x pixel position exceeds
    //the canvas's width then the enemy's x
    //pixel position starts over.
    if (this.x > 500) {
        this.x = -this.x;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Starts the player's position on the second row
//of grass on the middle of the canvas. The r value
//represents its width and the b value represents
//its height. These values are used to determine
//a collision if conditions are met.
var Player = function(loc){
    Character.call(this, loc);
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
    this.r = 101 / 3;
    this.b = 171 / 3;
};
    Player.prototype = Object.create(Character.prototype);
    Player.prototype.constructor = Player;

//Updates the players current position
//when moving across the screen.
Player.prototype.update = function(dt) {
    this.x * dt;
    this.y * dt;
};

//Draws the player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//An event listener is set to detect keyup positions of
//the arrows keys. They move the player with a set pixel
//amount in each direction. Boundries for the keys are set
//so that the player cannot move outside of the canvas.
Player.prototype.handleInput = function(key) {
    if (key === 'left') {
        this.x -= 82;
        if (this.x < 0)
            this.x = 0;
    }
    if (key === 'right') {
        this.x += 82;
        if (this.x > 400) {
            this.x = 400;
        }
    }
    if (key === 'up') {
        this.y -= 82;
        if (this.y < 0)
            this.y = 0;
    }
    if (key === 'down') {
        this.y += 82;
        if (this.y > 400) {
            this.y = 400;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
player.move();

//Instantiated an array with new enemies each given a
//starting x, and y position, as well as a speed value.
var allEnemies = [
    new Enemy(-100, 60, 200),
    new Enemy(-50, 145, 225),
    new Enemy(-200, 225, 175)
];

//Checks for collisions between player
//and all enemies using the Axis-Aligned Bounding
//Box algorithm found on Mozilla Developer Network.
//If a collision occurs then the player's position
//is set back to the initial position of the game, and
//console logs 'You died!'.
function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++)
        if (player.x < allEnemies[i].x + allEnemies[i].r &&
            player.x + player.r > allEnemies[i].x &&
            player.y < allEnemies[i].y + allEnemies[i].b &&
            player.b + player.y > allEnemies[i].y) {
        player.x = 200;
        player.y = 320;
        console.log("You died!");
    }
}

//If the player's y position is equal to 0, on
//the row of water, then a console log message
//says 'You won!'. Then it sets the player's position
//back to the intial position at the start of
//the game.
function victory() {
    if (player.y === 0) {
        console.log("You won!");
        player.x = 200;
        player.y = 320;
    }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
