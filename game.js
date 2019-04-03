const startBtn = document.querySelector("#startgame")
startBtn.addEventListener("click", startGame)

var mySpaceShip;
var myAstroid = [];
var myDistance;

function startGame() {
    //    Create Canvas
    myGameArea.start();
    //    Create Spaceship
    mySpaceShip = new component(30, 10, "yellow", 10, 400);
    //    Distance Traveled (Score)
    myDistance = new component("25px", "Consolas", "white", 1160, 40, "text")
}

const main = document.querySelector("#main");

//Create Canvas Function
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1490;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        main.insertBefore(this.canvas, main.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        // Key Listeners
        window.addEventListener("keydown", function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener("keyup", function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },

    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

//Create Spaceship Function
function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 0.5;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = color;
            ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            ctx.restore();
        }
    }
    this.newPos = function () {
        this.x += this.speedX -= this.gravity;
        this.y += this.speedY;
        this.hitSides();
    }
    // Adds solid walls to the canvas so that the spaceship can't leave the screen
    this.hitSides = function () {
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > myGameArea.canvas.width - this.width) {
            this.x = myGameArea.canvas.width - this.width;
        }
        if (this.y > myGameArea.canvas.height - this.height) {
            this.y = myGameArea.canvas.height - this.height;
        }
        if (this.y < 50) {
            this.y = 50;
        }
    }

    // Adds a crash function when to objects collide
    this.crashWith = function (otherObj) {
        var shipLeft = this.x;
        var shipRight = this.x + (this.width);
        var shipTop = this.y;
        var shipBtm = this.y + (this.height);
        var astroidLeft = otherObj.x;
        var astroidRight = otherObj.x + (otherObj.width);
        var astroidTop = otherObj.y;
        var astroidBtm = otherObj.y + (otherObj.height);
        var crash = true;
        if (shipLeft > astroidRight || shipRight < astroidLeft || shipTop > astroidBtm || shipBtm < astroidTop) {
            crash = false;
        }
        return crash
    }
}


//Makes the Game Run (by deleting and adding frames)
function updateGameArea() {
    var x, y;

    for (i = 0; i < myAstroid.length; i += 1) {
        if (mySpaceShip.crashWith(myAstroid[i])) {
            myGameArea.stop();
            return;
            console.log("for number 1")
        }
    }

    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyInterval(400)) {
        x = myGameArea.canvas.width;
        minDimension1 = 20;
        maxDimension1 = 200;

        dimension1 = Math.floor(Math.random() * (maxDimension1 - minDimension1 + 1) + minDimension1);

        minGap = 50;
        maxGap = 800;
        gap1 = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

        myAstroid.push(new component(dimension1, dimension1, "green", x, gap1));

    }
    if (myGameArea.frameNo == 1 || everyInterval(150)) {
        x = myGameArea.canvas.width;

        minDimension2 = 10;
        maxDimension2 = 150;

        dimension2 = Math.floor(Math.random() * (maxDimension2 - minDimension2 + 1) + minDimension2);

        minGap = 50;
        maxGap = 800;

        gap2 = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

        myAstroid.push(new component(dimension2, dimension2, "red", x, gap2));
    }
    if (myGameArea.frameNo == 1 || everyInterval(600)) {
        x = myGameArea.canvas.width;

        minDimension3 = 50;
        maxDimension3 = 300;

        dimension3 = Math.floor(Math.random() * (maxDimension3 - minDimension3 + 1) + minDimension3);

        minGap = 50;
        maxGap = 800;

        gap3 = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

        myAstroid.push(new component(dimension3, dimension3, "pink", x, gap3));
    }

    for (i = 0; i < myAstroid.length; i += 1) {
        myAstroid[i].x -= 1;
        myAstroid[i].angle += 1 * Math.PI /180;
        myAstroid[i].update();
        console.log("got number 2")
    }

    myDistance.text = "DISTANCE:  " + myGameArea.frameNo;
    myDistance.update();
    mySpaceShip.newPos();
    mySpaceShip.update();
    mySpaceShip.speedX = 0;
    mySpaceShip.speedY = 0;


    //Functions that determines movement speed (number) and direction (Y or X)

    //    UP
    if (myGameArea.keys && myGameArea.keys[38]) {
        mySpaceShip.speedY -= 2;
    }

    //    DOWN
    if (myGameArea.keys && myGameArea.keys[40]) {
        mySpaceShip.speedY += 2;
        console.log(myGameArea.frameNo)
    }

    //Untag if we need left and right movement*

    //    LEFT
    if (myGameArea.keys && myGameArea.keys[37]) {
        mySpaceShip.speedX -= 2;
    }

    //    RIGHT
    if (myGameArea.keys && myGameArea.keys[39]) {
        mySpaceShip.speedX += (2 + mySpaceShip.gravity);
    }

}

function everyInterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}
