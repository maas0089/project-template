class ScreenLevel extends ScreenBase {

    // private screenQuiz: ScreenQuiz = new ScreenQuiz();
    private spikes: Array<Spike> = new Array<Spike>();
    private platforms: Array<Platform> = new Array<Platform>();
    private player: Player;
    private imageMap: string;
    private countryFlag: string;
    private background: string;

    constructor() {
        super();
        this.player = new Player(this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y - 20);
        this.spikes.push(new Spike(this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y));
        this.platforms.push(new Platform(this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y));
        this.platforms.push(new Platform(this.canvasHelper.GetCenter().X + 160, this.canvasHelper.GetCenter().Y - 10));
        this.platforms.push(new Platform(this.canvasHelper.GetCenter().X + 320, this.canvasHelper.GetCenter().Y + 20));
        this.platforms.push(new Platform(this.canvasHelper.GetCenter().X + 480, this.canvasHelper.GetCenter().Y + 40));
        // this.spikes = spikes;
        // this.platforms = platforms;
        // this.player = player;
        // this.imageMap = imageMap;
        // this.countryFlag = countryFlag;
    }

    public draw(){
        window.setInterval(this.drawPlayer, 1000 / 30);
    }

    public drawPlayer = () => {
        console.log("This is ScreenLevel speaking.");

        this.player.draw();
        this.player.move();
        this.spikes.forEach((element: Entity): void => {
            element.draw();
        });
        this.platforms.forEach((element: Entity): void => {
            element.draw();
        })

        this.canvasHelper.Clear();
    }


    public drawScreenQuiz(): void {
        this.canvasHelper.Clear();
        // this.screenQuiz.draw();
    }
}