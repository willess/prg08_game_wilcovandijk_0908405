interface Behaviour {
    player: Player;
    update() : void;
    onShrink() : void;
    onMove() :void;
    onGrow() : void;

}