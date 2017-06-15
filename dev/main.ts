/// <reference path="howler.d.ts"/>

class Game {

    private static GameInstance: Game;
    public player : Player;
    private score: number = 0;

    private coin: Coin;
    private coinArray: Array<Coin> = [];

    private enemy: Enemy;

    private gameObjects: Array<GameObject> = new Array<GameObject>();

    private sound: any;
    constructor() {

        let container:HTMLElement = document.getElementById("container");

        this.player = new Player(container, 65, 68, 87, 83, this);

        for(var i = 0; i < 500; i++) {
            let x = (Math.random() * (container.clientWidth));
            let y = (Math.random() * (container.clientHeight));
            this.coin = new Coin(container, x, y, 15, 15, this);
            this.gameObjects.push(this.coin);
        }

        for(var i = 0; i < 12; i++) {
            let x = (Math.random() * (container.clientWidth));  
            let y = (Math.random() * (container.clientHeight));
            this.enemy = new Enemy(container, x, y, 200, 200, this);
            this.gameObjects.push(this.enemy);
        }

        requestAnimationFrame(() => this.gameLoop());

    }

    private gameLoop(){
        this.player.move();

        for(var o of this.gameObjects) {
            
            if(o instanceof Enemy) {
                o.move();
            }

            if(Utils.checkCollision(this.player, o)){

                this.player.onGrow(1);

                if(o instanceof Coin) {
                    for(var i = 0; i < this.gameObjects.length; i++) {
                        if(o == this.gameObjects[i]) {
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

                if(o instanceof Enemy) {
                    this.endGame();
                    cancelAnimationFrame(1);
                }
  
            }
        }

        requestAnimationFrame(this.gameLoop.bind(this));

    }

    private updateScore() {
        document.getElementById("score").innerHTML = "SCORE: " + this.score;
    }

    public static getInstance() {
        if (! Game.GameInstance) {
            Game.GameInstance = new Game();
        }
        return Game.GameInstance;
    }

    public endGame() {
        for(var o of this.gameObjects) {
            for(var i = 0; i < this.gameObjects.length; i++) {
                // if(o == this.gameObjects[i]) {
                    // o.deleteDiv();
                    this.gameObjects.splice(i, 1);
                    o = null;
                // }
            }
        }

        

        console.log('end game!');
    }
} 

// load
window.addEventListener("load", function() {
    Game.getInstance();
});