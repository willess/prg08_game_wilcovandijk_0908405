
class Utils {

    public static setSpeed(go:Player, xdist:number, ydist:number):void {
        let distance:number = Math.sqrt(xdist * xdist + ydist * ydist);
        go.xspeed = xdist/distance;
        go.yspeed = ydist/distance;

        go.xspeed *= go.speedmultiplier;
        go.yspeed *= go.speedmultiplier;
    }

    public static checkCollision(p:GameObject, c:GameObject): boolean
    {
        if(p.posX < c.posX + c.width && p.posX + p.width > c.posX && p.posY < c.posY + c.height + c.height && p.height + p.posY > c.posY)
        {
            //collision detected
            // console.log(c);
            return true;
        }
        return false;
    }

}