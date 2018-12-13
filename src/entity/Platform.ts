///<reference path="Entity.ts" />

class Platform extends Entity {

    public constructor(
        xCoor: number,
        yCoor: number,
    ) {
        super(xCoor, yCoor);
        this.imageSrc = './assets/images/...';
        this.width = 25;
        this.height = 30;
    }
}