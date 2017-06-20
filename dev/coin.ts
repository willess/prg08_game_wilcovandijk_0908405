/// <reference path="gameObject.ts" />


class Coin extends GameObject {

    constructor(container: HTMLElement, posX: number, posY: number, coinWidth: number, coinHeight: number, g:Game) {
        super("coin", container, posX, posY, coinWidth, coinHeight, g);

        //Je zou je volgens mij niet persee de parameters door hoeven te geven, maar kan ook gewoon
        //hier gedefineerd worden

    }

}