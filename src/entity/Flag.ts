///<reference path="Entity.ts" />

class Flag extends Entity {

    public constructor(
        xCoor: number,
        yCoor: number,
    ) {
        super(xCoor, yCoor);
        this.imageSrc = "./assets/images/flags/Nederland.png";
        this.width = 55;
        this.height = 80;
    }
}