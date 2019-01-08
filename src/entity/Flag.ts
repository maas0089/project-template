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

    private MathHelper: number = this.CanvasHelper.randomNumber(0, this.FlagEuropeArray.length - 1);

    public constructor(
        xCoor: number,
        yCoor: number,
        continent: number = 1 //to determine which flags should be used; 0 is Netherlands, 1 is Europe, 2 is America. Default is Europe.
    ) {
        super(xCoor, yCoor);
        this.width = 55;
        this.height = 80;

        let img = new Image();
        img.addEventListener('load', () => {
            this.image = img;
        });

        if (continent == 0) img.src = './assets/images/flags/Nederland.png';
        if (continent == 1) img.src = `./assets/images/flags/${this.FlagEuropeArray[this.MathHelper]}.png`;
        if (continent == 2) img.src = './assets/images/flags/VerenigdeStaten.png';
        console.log(this.MathHelper);
    }
}