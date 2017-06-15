/// <reference path="gameObject.ts" />


class Player extends GameObject implements Observable {

    public behaviour: Behaviour;
    public observers: Array<Observer> = [];

    //walk keys player
    public downkey : number;
    public upkey : number;
    public leftkey : number;
    public rightkey : number;

    private spaceKey :number = 32;
    
    //speed player, start all at 0
    private leftSpeed : number = 0;
    private rightSpeed : number = 0;
    private downSpeed : number = 0;
    private upSpeed : number = 0;

    private container : HTMLElement;
    public containerX: number;
    public containerY: number;


    constructor(container: HTMLElement, left:number, right:number, up:number, down:number, playerHeight: number, playerWidth: number, g:Game) {
        super("player", container, 1000, 1000, playerWidth, playerHeight, g);
        this.speedmultiplier = 2;

        this.container = container;

        // startposition on screen player
        this.posX = (this.container.clientWidth/2) + (window.innerWidth / 2) - 25;
        this.posY = (this.container.clientHeight/2) + (window.innerHeight / 2) - 25;

        // startposition on screen containerdiv
        this.containerX = this.container.clientWidth - (this.container.clientWidth * 1.5);
        this.containerY = this.container.clientHeight - (this.container.clientHeight * 1.5);


        //input from keyboard
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;

        this.behaviour = new Move(this);

        // keyboard listener
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));  

        // this.container.addEventListener("click", (e:MouseEvent) => this.onWindowClick(e));

    }

    public subscribe(o: Observer): void {
        this.observers.push(o);
    }

    public unsubscribe(): void {

    }

    private onShrink(): void {
        for (let o of this.observers) {
            o.notify();

        }
        this.behaviour.onShrink();
    }

    private onMove(): void {
        this.behaviour.onMove();
    }

    public onGrow(grow: number) {
        this.behaviour.onGrow();
    }

        // de beweegrichting aanpassen aan waar in het window is geklikt
    private onWindowClick(e:MouseEvent):void {
        // console.log(e.clientX);
        // console.log(this.containerY);
        let a = e.clientX + e.clientX;
        // console.log(a);
        Utils.setSpeed(this, e.clientX - this.posX, e.clientY - this.posY);
    }

        // keyboard input changes speed
        private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
        if(this.posY > 0){
            this.upSpeed = 5;
            this.onMove();
        }
            break;
        case this.downkey:
        if(this.posY < this.container.clientHeight - this.height){
            this.downSpeed = 5;
            this.onMove();
        }
            break;
        case this.leftkey:
        if (this.posX > 0){
            this.leftSpeed = 5;
            this.onMove();
        }        
            break;
        case this.rightkey:
        if (this.posX < this.container.clientWidth - this.width){
            this.rightSpeed = 5;
            this.onMove();
        }            
            break;
        case this.spaceKey:
            this.onShrink();
            break;
        }
        
    }

        // speed to 0 when keyboard input is down
    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
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
    }

    public move():void {

        this.behaviour.update();

        this.posX += this.xspeed;
        this.posY += this.yspeed;

        // this.direction = (this.xspeed < 0) ? 1 : -1;
        // this.div.style.transform = "translate("+this.posX+"px, "+this.posY+"px) scale("+this.direction+",1)";
        // console.log(this.posX);

        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;

        this.containerX = this.containerX + this.leftSpeed - this.rightSpeed;
        this.containerY = this.containerY + this.upSpeed - this.downSpeed;

        //check right
        if(this.posX >= this.container.clientWidth - this.width){
            this.rightSpeed = 0;
        }
        //check left
        if(this.posX < 0){
            this.leftSpeed = 0;
        }
        //check down
        if(this.posY >= this.container.clientHeight - this.height){
            this.downSpeed = 0;
        }
        //check up
        if(this.posY < 0){
            this.upSpeed = 0;
        }

        this.container.style.transform ="translate("+this.containerX+"px," +this.containerY + "px)";

        this.div.style.transform ="translate(" +this.posX + "px," + this.posY + "px)";
    }


}