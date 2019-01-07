///<reference path="Entity.ts" />

class Checkpoint extends Entity {

    public constructor(
        xCoor: number,
        yCoor: number,
    ) {
        super(xCoor, yCoor);
        this.width = 55;
        this.height = 80;

        let img = new Image();
        img.addEventListener('load', () => {
            this.image = img;
        });

        img.src = './assets/images/flags/Nederland.png';

    }
}