/// <reference path="gameObject.ts" />


class Coin extends GameObject {

    constructor(container: HTMLElement, posX: number, posY: number, coinWidth: number, coinHeight: number, g:Game) {
        super("coin", container, posX, posY, coinWidth, coinHeight, g);

    }

}