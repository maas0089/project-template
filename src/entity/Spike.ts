///<reference path="Entity.ts" />

class Spike extends Entity {

    public constructor(
        xCoor: number,
        yCoor: number,
    ) {
        super(xCoor, yCoor);
        // this.imageSrc = './assets/images/spikes/Spike_Group.png';
        this.width = 80;
        this.height = 20;

        let img = new Image();
        img.addEventListener('load', () => {
            this.image = img;
        });

        img.src = './assets/images/spikes/Spike_Group.png';

    }
}