/// <reference path="gameObject.ts" />


class Coin extends GameObject {

    constructor(container: HTMLElement, posX: number, posY: number, coinWidth: number, coinHeight: number) {
        super("coin", container, posX, posY, coinWidth, coinHeight);

    }

}