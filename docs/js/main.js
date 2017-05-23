var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GameObject = (function () {
    function GameObject(str, container, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.div = document.createElement(str);
        container.appendChild(this.div);
        this.draw();
    }
    GameObject.prototype.draw = function () {
        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    };
    GameObject.prototype.deleteDiv = function () {
        this.div.remove();
    };
    return GameObject;
}());
var Coin = (function (_super) {
    __extends(Coin, _super);
    function Coin(container, posX, posY, coinWidth, coinHeight) {
        _super.call(this, "coin", container, posX, posY, coinWidth, coinHeight);
    }
    return Coin;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.score = 0;
        this.coinArray = [];
        var container = document.getElementById("container");
        this.player = new Player(container, 65, 68, 87, 83);
        for (var i = 0; i < 50; i++) {
            this.posX = (Math.random() * (window.innerWidth));
            this.posY = (Math.random() * (window.innerHeight));
            this.coinWidth = 15;
            this.coinHeight = 15;
            this.coin = new Coin(container, this.posX, this.posY, this.coinWidth, this.coinHeight);
            this.coinArray.push(this.coin);
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        this.player.move();
        for (var _i = 0, _a = this.coinArray; _i < _a.length; _i++) {
            var coin = _a[_i];
            if (Utils.checkCollision(this.player, coin)) {
                for (var i = 0; i < this.coinArray.length; i++) {
                    if (coin == this.coinArray[i]) {
                        this.score++;
                        this.updateScore();
                        this.coinArray.splice(i, 1);
                        coin.deleteDiv();
                    }
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
    return Move;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(container, left, right, up, down) {
        _super.call(this, "player", container, 1000, 1000, 50, 50);
        this.spaceKey = 32;
        this.lastkey = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.posX = window.innerWidth / 2 - 50;
        this.posY = window.innerHeight / 2 - 50;
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;
        this.behaviour = new Move(this);
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
    }
    Player.prototype.onShrink = function () {
        this.behaviour.onShrink();
    };
    Player.prototype.onMove = function () {
        this.behaviour.onMove();
    };
    Player.prototype.shrinkPlayer = function (s) {
        this.width -= s;
        this.height -= s;
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";
        console.log(this);
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upkey:
                if (this.posY > 0) {
                    this.upSpeed = 7;
                    this.onMove();
                }
                this.lastkey = 0;
                break;
            case this.downkey:
                if (this.posY < window.innerHeight - this.height) {
                    this.downSpeed = 7;
                    this.onMove();
                }
                break;
            case this.leftkey:
                if (this.posX > 0) {
                    this.leftSpeed = 7;
                    this.onMove();
                }
                this.lastkey = 1;
                break;
            case this.rightkey:
                if (this.posX < window.innerWidth - this.width) {
                    this.rightSpeed = 7;
                    this.onMove();
                }
                this.lastkey = 2;
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
        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;
        if (this.posX >= window.innerWidth - this.width) {
            this.rightSpeed = 0;
        }
        if (this.posX < 0) {
            this.leftSpeed = 0;
        }
        if (this.posY >= window.innerHeight - this.height) {
            this.downSpeed = 0;
        }
        if (this.posY < 0) {
            this.upSpeed = 0;
        }
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
            this.player.shrinkPlayer(5);
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
    return Shrink;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.checkCollision = function (p, c) {
        if (p.posX < c.x + c.width && p.posX + p.width > c.x && p.posY < c.y + c.height + c.height && p.height + p.posY > c.y) {
            return true;
        }
        return false;
    };
    return Utils;
}());
//# sourceMappingURL=main.js.map