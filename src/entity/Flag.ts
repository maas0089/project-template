///<reference path="Entity.ts" />

class Flag extends Entity {

    private CanvasHelper: CanvasHelper = CanvasHelper.Instance();

    private FlagEuropeArray: Array<string> = [
            "België",
            "Denemarken",
            "Duitsland",
            "Finland",
            "Frankrijk",
            "Italië",
            "Nederland",
            "Noorwegen",
            "Oekraïne",
            "Oostenrijk",
            "Polen",
            "Roemenië",
            "Zweden",
            "Zwitserland"
    ];

    private MathHelper: number = this.CanvasHelper.randomNumber(0, 13);

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

        img.src = `./assets/images/flags/${this.FlagEuropeArray[this.MathHelper]}.png`;
        console.log(this.MathHelper);
    }
}