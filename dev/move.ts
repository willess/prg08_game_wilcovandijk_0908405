class Move implements Behaviour {

    player: Player;

    constructor(p: Player) {
        this.player = p;
        // console.log('move!!');
    }

    update() {
        // console.log('move');
    }

    onShrink() {
        // console.log('shrink!');
        this.player.behaviour = new Shrink(this.player);
    }

    onMove() {
        
    }

    onGrow() {
        this.player.behaviour = new Grow(this.player);
    }
}