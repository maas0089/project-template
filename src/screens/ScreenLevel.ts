class ScreenLevel extends ScreenBase {

    // private screenQuiz: ScreenQuiz = new ScreenQuiz();
    private spikes: Array<Spike>;
    private platforms: Array<Platform>;
    private player: Player;
    private imageMap: string;
    private countryFlag: string;
    private background: string;

    constructor(
        // spikes: Array<Spike>,
        // platforms: Array<Platform>,
        // player: Player,
        // imageMap: string,
        // countryFlag: string
    ) {
        super();

        // this.spikes = spikes;
        // this.platforms = platforms;
        // this.player = player;
        // this.imageMap = imageMap;
        // this.countryFlag = countryFlag;
    }

    public draw() {
        console.log("This is ScreenLevel speaking.");

        this.canvasHelper.writeImageToCanvas(
            "/assets/images/MovingPlatform_Long.png",
            this.canvasHelper.GetCenter().X,
            this.canvasHelper.GetCenter().Y
        );
    }

    public drawScreenQuiz(): void {
        this.canvasHelper.Clear();
        // this.screenQuiz.draw();
    }
}

function init(): void {
    const Untravel = new ScreenLevel();
    Untravel.draw();
}
window.addEventListener('load', init);