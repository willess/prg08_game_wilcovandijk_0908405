
class Game {

    private static GameInstance: Game;
    private player : Player;
    private score: number = 0;

    private coin: Coin;
    private coinArray: Array<Coin> = [];

    private posX: number;
    private posY: number;
    private coinWidth: number;
    private coinHeight: number;


    constructor() {

        let container:HTMLElement = document.getElementById("container");

        this.player = new Player(container, 65, 68, 87, 83);


        for(var i = 0; i < 50; i++) {
            this.posX = (Math.random() * (window.innerWidth));
            this.posY = (Math.random() * (window.innerHeight));
            this.coinWidth = 15;
            this.coinHeight = 15;
            this.coin = new Coin(container, this.posX, this.posY, this.coinWidth, this.coinHeight);
            this.coinArray.push(this.coin);
        }

        requestAnimationFrame(() => this.gameLoop());

    }

    private gameLoop(){
        this.player.move();

        for(var coin of this.coinArray) {
            if(Utils.checkCollision(this.player, coin)){
                for(var i = 0; i < this.coinArray.length; i++) {
                    if(coin == this.coinArray[i]) {
                        this.score++;
                        this.updateScore();
                        this.coinArray.splice(i, 1);
                        coin.deleteDiv();
                    }
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
} 

// load
window.addEventListener("load", function() {
    Game.getInstance();
});