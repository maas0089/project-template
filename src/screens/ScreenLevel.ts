class ScreenLevel extends ScreenBase {

    private screenQuiz: ScreenQuiz;
    private spikes: Array<Spike>;
    private platforms: Array<Platform>;
    private player: Player;
    private imageMap: string;
    private countryFlag: string;

    constructor(
        canvas: HTMLCanvasElement,
        // spikes: Array<Spike>,
        // platforms: Array<Platform>,
        // player: Player,
        // imageMap: string,
        // countryFlag: string
    ) {
        super(canvas);
        this.screenQuiz = new ScreenQuiz(canvas);

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
        this.screenQuiz.draw();
    }
}