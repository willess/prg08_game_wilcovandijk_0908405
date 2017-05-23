/// <reference path="gameObject.ts" />


class Player extends GameObject {

    public behaviour: Behaviour;

    public posX: number;
    public posY: number;

    //walk keys player
    public downkey : number;
    public upkey : number;
    public leftkey : number;
    public rightkey : number;

    private spaceKey :number = 32;
    
    //remember last key 
    private lastkey: number = 0; 
    
    //speed player, start all at 0
    private leftSpeed : number = 0;
    private rightSpeed : number = 0;
    private downSpeed : number = 0;
    private upSpeed : number = 0;


    constructor(container: HTMLElement, left:number, right:number, up:number, down:number) {
        super("player", container, 1000, 1000, 50, 50);

        // position on screen
        this.posX = window.innerWidth/2 - 50;
        this.posY = window.innerHeight/2 - 50;

        //input from keyboard
        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;

        this.behaviour = new Move(this);

        // keyboard listener
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));  
    }

        private onShrink(): void {
            //clicked spacekey
        this.behaviour.onShrink();
    }

    private onMove(): void {
        this.behaviour.onMove();
        
    }

    public shrinkPlayer(s: number) {
        this.width -= s;
        this.height -= s;
        this.div.style.width = this.width + "px";
        this.div.style.height = this.height + "px";

        console.log(this);
    }

        // keyboard input changes speed
        private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
        if(this.posY > 0){
            this.upSpeed = 7;
            this.onMove();
        }
            this.lastkey = 0;
            break;
        case this.downkey:
        if(this.posY < window.innerHeight - this.height){
            this.downSpeed = 7;
            this.onMove();
        }
            break;
        case this.leftkey:
        if (this.posX > 0){
            this.leftSpeed = 7;
            this.onMove();
        }        
            this.lastkey = 1;
            break;
        case this.rightkey:
        if (this.posX < window.innerWidth - this.width){
            this.rightSpeed = 7;
            this.onMove();
        }            
            this.lastkey = 2;
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

        this.posX = this.posX - this.leftSpeed + this.rightSpeed;
        this.posY = this.posY - this.upSpeed + this.downSpeed;

                //check right
        if(this.posX >= window.innerWidth - this.width){
            this.rightSpeed = 0;
        }
        //check left
        if(this.posX < 0){
            this.leftSpeed = 0;
        }
        //check down
        if(this.posY >= window.innerHeight - this.height){
            this.downSpeed = 0;
        }
        //check up
        if(this.posY < 0){
            this.upSpeed = 0;
        }

        this.div.style.transform ="translate(" +this.posX + "px," + this.posY + "px)";
    }


}