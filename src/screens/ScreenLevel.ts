class ScreenLevel extends ScreenBase {

    // private screenQuiz: ScreenQuiz = new ScreenQuiz();
    private spikes: Array<Spike> = new Array<Spike>();
    private platforms: Array<Platform> = new Array<Platform>();
    private player: Player;
    private imageMap: string;
    private countryFlag: Flag;
    private background: string;

    //TODO: change spike width and height to match the platform
    constructor() {
        super();
        this.player = new Player(100, this.canvasHelper.GetCenter().Y - 20);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y)); // starting position for player
        this.platforms.push(new Platform(250, this.canvasHelper.GetCenter().Y - 10)); // platform 2
        this.platforms.push(new Platform(180, this.canvasHelper.GetCenter().Y + 40)); // platform with spike
        this.spikes.push(new Spike(180, this.canvasHelper.GetCenter().Y + 25));
        this.platforms.push(new Platform(380, this.canvasHelper.GetCenter().Y + 60)); // platform 3
        this.platforms.push(new Platform(470, this.canvasHelper.GetCenter().Y + 120)); // platform with spike 2
        this.spikes.push(new Spike(470, this.canvasHelper.GetCenter().Y + 105));
        this.platforms.push(new Platform(600, this.canvasHelper.GetCenter().Y + 160)); // platform 4
        this.platforms.push(new Platform(760, this.canvasHelper.GetCenter().Y + 180)); // platform 5
        this.platforms.push(new Platform(860, this.canvasHelper.GetCenter().Y + 140)); // platform 6
        this.platforms.push(new Platform(960, this.canvasHelper.GetCenter().Y + 100)); // platform 7
        this.platforms.push(new Platform(1060, this.canvasHelper.GetCenter().Y + 60)); // platform 8
        this.platforms.push(new Platform(1200, this.canvasHelper.GetCenter().Y + 200)); // platform with spike 3
        this.spikes.push(new Spike(1200, this.canvasHelper.GetCenter().Y + 185));
        this.platforms.push(new Platform(1300, this.canvasHelper.GetCenter().Y + 140)); // platform with flag
        this.countryFlag = new Flag(1340, this.canvasHelper.GetCenter().Y + 65); // Y -75 
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
        this.countryFlag.draw();

        this.canvasHelper.Clear();
    }


    public drawScreenQuiz(): void {
        this.canvasHelper.Clear();
        // this.screenQuiz.draw();
    }
}