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
        
    }

    public drawScreenQuiz(): void {
        this.canvasHelper.Clear();
        // this.screenQuiz.draw();
    }
}

// function testInit(): void {
//     const Untravel = new ScreenLevel(<HTMLCanvasElement>document.getElementById('canvas'));
//     Untravel.draw();
// }
// window.addEventListener('load', testInit);