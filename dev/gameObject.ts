abstract class GameObject {

    //Je zou je x, y, width en height protected kunnen maken en vervolgens een functie maken die deze waarden ophaalt.
    //Deze functies kan je dan aanroepen in main.ts. En dat kan ook van elke class/instance die overerft van GameObject.ts

    public div:HTMLElement;
    public posX:number;
    public posY:number;
    
    public width:number;
    public height:number;

    public xspeed:number = 0;
    public yspeed:number = 0;
    public speedmultiplier:number = 1;
    public direction:number = 1;

    protected game: Game;

    constructor(str:string, container: HTMLElement, x:number, y:number, width:number, height:number, g:Game) {

        this.game = g;

        //get x and y
        this.posX = x;
        this.posY = y;

        //get width and height
        this.width = width;
        this.height = height;

        this.div = document.createElement(str);
        container.appendChild(this.div);

        //draw image on screen
        this.draw();
    }

    public draw():void {
        this.div.style.transform ="translate(" +this.posX + "px," + this.posY + "px)";
    }

    public deleteDiv() {
        this.div.remove();
    }

    //een functie voor getX. getY, getWidth, getHeight
}