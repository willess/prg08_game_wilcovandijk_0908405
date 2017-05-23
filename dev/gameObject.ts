class GameObject {

    public div:HTMLElement;
    public x:number;
    public y:number;
    
    public width:number;
    public height:number;

    constructor(str:string, container: HTMLElement, x:number, y:number, width:number, height:number) {

        //get x and y
        this.x = x;
        this.y = y;

        //get width and height
        this.width = width;
        this.height = height;

        this.div = document.createElement(str);
        container.appendChild(this.div);

        //draw image on screen
        this.draw();
    }

    public draw():void {
        this.div.style.transform ="translate(" +this.x + "px," + this.y + "px)";
    }

    public deleteDiv() {
        this.div.remove();
    }
}