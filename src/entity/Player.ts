///<reference path="Entity.ts" />

class Player extends Entity {

    private keyboardListener: KeyboardHelper;
    private startX: number;
    private startY: number;
    private gravity: number;
    private jumpStart: number = 0;
    private currentJump: number = 0;
    private jumpEnd: number = 22;

    public constructor(
        xCoor: number,
        yCoor: number,
    ) {
        super(xCoor, yCoor);
        // this.imageSrc = './assets/images/character/stand.png';
        this.width = 12;
        this.height = 20;
        this.gravity = 3;
        this.startX = xCoor;
        this.startY = yCoor;

        let img = new Image();
        img.addEventListener('load', () => {
            this.image = img;
        });

        img.src = './assets/images/character/stand.png';


        this.keyboardListener = new KeyboardHelper();
    }

    public resetPosition(): void {
        this.xPos = this.startX;
        this.yPos = this.startY;
    }

    public move(): void {
        if (this.keyboardListener.getLeftPressed()) {
            this.xPos -= 3;
        }
        if (this.keyboardListener.getUpPressed()) {
            if (this.currentJump < this.jumpEnd){
                this.yPos -= 2;
                this.currentJump ++;
            } else {
                this.fall();
            }
        }
        else this.fall();
        if (this.keyboardListener.getRightPressed()) {
            this.xPos += 3;
        }
        if(this.getY() > this.canvas.GetHeight()) this.resetPosition();
    }

    public fall() {
        this.yPos += this.gravity;
        this.currentJump = this.jumpEnd;
    }

    public stopFalling() {
        this.yPos -= this.gravity;
        this.currentJump = this.jumpStart;
    }

    public platformCollision(platform: Entity): boolean {
        if (
            //check if player.x is within borders of entity.x
            this.getX() < platform.getX() + platform.getWidth() &&
            this.getX() + this.getWidth() > platform.getX() &&
            this.getY() + this.getHeight() > platform.getY() &&
            this.getY() + this.getHeight() < platform.getY() + 4
        ) {
            return true;
        }
        return false;
    }

    public entityCollision(entity: Entity): boolean {
        if (
            //check if player.x is within borders of entity.x
            this.getX() < entity.getX() + entity.getWidth() &&
            this.getX() + this.getWidth() > entity.getX() &&
            //check if player.y is within borders of entity.y
            this.getY() < entity.getY() + entity.getHeight() &&
            this.getY() + this.getHeight() > entity.getY()
        ) {
            return true;
        }
        return false;
    }
}