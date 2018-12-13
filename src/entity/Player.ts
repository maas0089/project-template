///<reference path="Entity.ts" />

class Player extends Entity {

    private keyboardListener: KeyboardHelper;

    public constructor(
        xCoor: number,
        yCoor: number,
    ) {
        super(xCoor, yCoor);
        this.imageSrc = '.assets/images/..';
        this.width = 12;
        this.height = 20;

        this.keyboardListener = new KeyboardHelper();
    }

    public move() {
        if (this.keyboardListener.getLeftPressed()) {
            this.xPos -= 4;
        }
        if (this.keyboardListener.getUpPressed()) {
            this.yPos -= 4;
        }
        if (this.keyboardListener.getRightPressed()) {
            this.xPos += 4;
        }
        if (this.keyboardListener.getdownPressed()) {
            this.yPos += 4;
        }
    }

    public collisionDetection(enemy: Entity): boolean {
        if (
            //check if player.x is within borders of entity.x
            this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() > enemy.getX() &&
            //check if player.y is within borders of entity.y
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()
        ) {
            return true;
        }
        return false;
    }
}