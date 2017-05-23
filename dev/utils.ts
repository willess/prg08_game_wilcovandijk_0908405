
class Utils {

    public static checkCollision(p:Player, c:Coin): boolean
    {
        if(p.posX < c.x + c.width && p.posX + p.width > c.x && p.posY < c.y + c.height + c.height && p.height + p.posY > c.y)
        {
            //collision detected
            // console.log(c);
            return true;
        }
        return false;
    }

}