///<reference path="Entity.ts" />

class Platform extends Entity {

    public constructor(
        xCoor: number,
        yCoor: number,
    ) {
        super(xCoor, yCoor);
        this.imageSrc = './assets/images/MovingPlatform_Long.png';
        this.width = 80;
        this.height = 25;
    }
}