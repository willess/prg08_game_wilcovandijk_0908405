var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(str, container, x, y, width, height, g) {
        this.xspeed = 0;
        this.yspeed = 0;
        this.speedmultiplier = 1;
        this.direction = 1;
        this.game = g;
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.height = height;
        this.div = document.createElement(str);
        container.appendChild(this.div);
        this.draw();
    }
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
    };
    GameObject.prototype.deleteDiv = function () {
        this.div.remove();
    };
    return GameObject;
}());
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin(container, posX, posY, coinWidth, coinHeight, g) {
        _super.call(this, "coin", container, posX, posY, coinWidth, coinHeight, g);
    }
    return Coin;
}(GameObject));
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(container, posX, posY, coinWidth, coinHeight, g) {
        _super.call(this, "enemy", container, posX, posY, coinWidth, coinHeight, g);
        g.player.subscribe(this);
        var arrayList = ["trump", "putin", "merkel", "erdogan"];
        this.backgroundImage = arrayList[Math.floor(Math.random() * arrayList.length)];
        this.div.style.backgroundImage = "url(./images/" + this.backgroundImage + ".gif)";
        this.speedX = (Math.random() * 4);
        this.speedY = (Math.random() * 4);
        this.container = container;
    }
    Enemy.prototype.notify = function () {
        var _this = this;
        console.log("Player is Shrinking!!!!!");
        this.div.style.backgroundImage = "none";
        this.div.style.animation = "red-flashing 0.3s infinite";
        this.div.style.webkitAnimation = "red-flashing 0.3s infinite";
        this.div.style.animation = "red-flashing 0.25s infinite";
        setTimeout(function () {
            _this.div.style.animation = "none";
            _this.div.style.backgroundImage = "url(./images/" + _this.backgroundImage + ".gif)";
        }, 1700);
    };
    Enemy.prototype.move = function () {
        if (this.posY + 200 > this.container.clientHeight || this.posY < 0) {
            this.speedY *= -1;
        }
        if (this.posX + 200 > this.container.clientWidth || this.posX < 0) {
            this.speedX *= -1;
        }
        this.posX += this.speedX;
        this.posY += this.speedY;
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
    };
    return Enemy;
}(GameObject));
var Enums;
(function (Enums) {
    (function (Dimension) {
        Dimension[Dimension["playerHeight"] = 50] = "playerHeight";
        Dimension[Dimension["playerWidth"] = 50] = "playerWidth";
    })(Enums.Dimension || (Enums.Dimension = {}));
    var Dimension = Enums.Dimension;
})(Enums || (Enums = {}));
var Grow = (function () {
    function Grow(p) {
        this.player = p;
    }
    Grow.prototype.update = function () {
        this.player.width += 1;
        this.player.height += 1;
        this.player.div.style.width = this.player.width + "px";
        this.player.div.style.height = this.player.height + "px";
        this.onMove();
    };
    Grow.prototype.onShrink = function () {
        this.player.behaviour = new Shrink(this.player);
    };
    Grow.prototype.onMove = function () {
        this.player.behaviour = new Move(this.player);
    };
    Grow.prototype.onGrow = function () {
        this.player.behaviour = new Grow(this.player);
    };
    return Grow;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.score = 0;
        this.coinArray = [];
        this.gameObjects = new Array();
        var container = document.getElementById("container");
        this.player = new Player(container, 65, 68, 87, 83, Enums.Dimension.playerHeight, Enums.Dimension.playerWidth, this);
        for (var i = 0; i < 500; i++) {
            var x = (Math.random() * (container.clientWidth));
            var y = (Math.random() * (container.clientHeight));
            this.coin = new Coin(container, x, y, 15, 15, this);
            this.gameObjects.push(this.coin);
        }
        for (var i = 0; i < 12; i++) {
            var x = (Math.random() * (container.clientWidth));
            var y = (Math.random() * (container.clientHeight));
            this.enemy = new Enemy(container, x, y, 200, 200, this);
            this.gameObjects.push(this.enemy);
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        this.player.move();
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var o = _a[_i];
            if (o instanceof Enemy) {
                o.move();
            }
            if (Utils.checkCollision(this.player, o)) {
                this.player.onGrow(1);
                if (o instanceof Coin) {
                    for (var i = 0; i < this.gameObjects.length; i++) {
                        if (o == this.gameObjects[i]) {
                            this.sound = new Howl({
                                urls: ["sound/confirm.mp3"],
                                sprite: {
                                    confirm: [0, 150000],
                                }
                            });
                            this.sound.play('confirm');
                            this.score++;
                            this.updateScore();
                            this.gameObjects.splice(i, 1);
                            o.deleteDiv();
                            o = null;
                        }
                    }
                }
                if (o instanceof Enemy) {
                    this.endGame();
                    cancelAnimationFrame(1);
                }
            }
        }
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Game.prototype.updateScore = function () {
        document.getElementById("score").innerHTML = "SCORE: " + this.score;
    };
    Game.getInstance = function () {
        if (!Game.GameInstance) {
            Game.GameInstance = new Game();
        }
        return Game.GameInstance;
    };
    Game.prototype.endGame = function () {
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var o = _a[_i];
            for (var i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects.splice(i, 1);
                o = null;
            }
        }
        console.log('end game!');
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.getInstance();
});
var Move = (function () {
    function Move(p) {
        this.player = p;
    }
    Move.prototype.update = function () {
    };
    Move.prototype.onShrink = function () {
        this.player.behaviour = new Shrink(this.player);
    };
    Move.prototype.onMove = function () {
    };
    Move.prototype.onGrow = function () {
        this.player.behaviour = new Grow(this.player);
    };
    return Move;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(container, left, right, up, down, playerHeight, playerWidth, g) {
        _super.call(this, "player", container, 1000, 1000, playerWidth, playerHeight, g);
        this.observers = [];
        this.spaceKey = 32;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.speedmultiplier = 2;
        this.container = container;
        this.posX = (this.container.clientWidth / 2) + (window.innerWidth / 2) - 25;
        this.posY = (this.container.clientHeight / 2) + (window.innerHeight / 2) - 25;
        this.containerX = this.container.clientWidth - (this.container.clientWidth * 1.5);
        this.containerY = this.container.clientHeight - (this.container.clientHeight * 1.5);
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;
        this.behaviour = new Move(this);
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    Player.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Player.prototype.unsubscribe = function () {
    };
    Player.prototype.onShrink = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.notify();
        }
        this.behaviour.onShrink();
    };
    Player.prototype.onMove = function () {
        this.behaviour.onMove();
    };
    Player.prototype.onGrow = function (grow) {
        this.behaviour.onGrow();
    };
    Player.prototype.onWindowClick = function (e) {
        var a = e.clientX + e.clientX;
        Utils.setSpeed(this, e.clientX - this.posX, e.clientY - this.posY);
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                if (this.posY > 0) {
                    this.upSpeed = 5;
                    this.onMove();
                }
                break;
            case this.downkey:
                if (this.posY < this.container.clientHeight - this.height) {
                    this.downSpeed = 5;
                    this.onMove();
                }
                break;
            case this.leftkey:
                if (this.posX > 0) {
                    this.leftSpeed = 5;
                    this.onMove();
                }
                break;
            case this.rightkey:
                if (this.posX < this.container.clientWidth - this.width) {
                    this.rightSpeed = 5;
                    this.onMove();
                }
                break;
            case this.spaceKey:
                this.onShrink();
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
        }
    };
    Player.prototype.move = function () {
        this.behaviour.update();
        this.posX += this.xspeed;
        this.posY += this.yspeed;
        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;
        this.containerX = this.containerX + this.leftSpeed - this.rightSpeed;
        this.containerY = this.containerY + this.upSpeed - this.downSpeed;
        if (this.posX >= this.container.clientWidth - this.width) {
            this.rightSpeed = 0;
        }
        if (this.posX < 0) {
            this.leftSpeed = 0;
        }
        if (this.posY >= this.container.clientHeight - this.height) {
            this.downSpeed = 0;
        }
        if (this.posY < 0) {
            this.upSpeed = 0;
        }
        this.container.style.transform = "translate(" + this.containerX + "px," + this.containerY + "px)";
        this.div.style.transform = "translate(" + this.posX + "px," + this.posY + "px)";
    };
    return Player;
}(GameObject));
var Shrink = (function () {
    function Shrink(p) {
        this.timer = 100;
        this.player = p;
    }
    Shrink.prototype.update = function () {
        this.timer--;
        console.log(this.timer);
        document.getElementById("shrinkText").innerHTML = "Shrinking --- " + this.timer;
        if (this.timer < 1) {
            this.player.width -= 5;
            this.player.height -= 5;
            this.player.div.style.width = this.player.width + "px";
            this.player.div.style.height = this.player.height + "px";
            this.onMove();
        }
    };
    Shrink.prototype.onShrink = function () {
        this.player.behaviour = new Shrink(this.player);
    };
    Shrink.prototype.onMove = function () {
        document.getElementById("shrinkText").innerHTML = "Press space to shrink";
        this.player.behaviour = new Move(this.player);
    };
    Shrink.prototype.onGrow = function () {
        this.player.behaviour = new Grow(this.player);
    };
    return Shrink;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.setSpeed = function (go, xdist, ydist) {
        var distance = Math.sqrt(xdist * xdist + ydist * ydist);
        go.xspeed = xdist / distance;
        go.yspeed = ydist / distance;
        go.xspeed *= go.speedmultiplier;
        go.yspeed *= go.speedmultiplier;
    };
    Utils.checkCollision = function (p, c) {
        if (p.posX < c.posX + c.width && p.posX + p.width > c.posX && p.posY < c.posY + c.height + c.height && p.height + p.posY > c.posY) {
            return true;
        }
        return false;
    };
    return Utils;
}());
//# sourceMappingURL=main.js.map