class Grow implements Behaviour {

    player: Player;

    constructor(p: Player) {
        this.player = p;
        // console.log('move!!');
    }

    update() {
        // console.log('move');
        this.player.width += 1;
        this.player.height += 1;
        this.player.div.style.width = this.player.width + "px";
        this.player.div.style.height = this.player.height + "px";
        this.onMove();
    }

    onShrink() {
        // console.log('shrink!');
        this.player.behaviour = new Shrink(this.player);
    }

    onMove() {
        this.player.behaviour = new Move(this.player);
    }

    onGrow() {
        this.player.behaviour = new Grow(this.player);
    }
}