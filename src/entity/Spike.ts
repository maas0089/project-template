///<reference path="Entity.ts" />

class Spike extends Entity {

    public constructor(
        xCoor: number,
        yCoor: number,
    ) {
        super(xCoor, yCoor);
        this.imageSrc = './assets/images/...'
        this.width = 20;
        this.height = 30;
    }
}