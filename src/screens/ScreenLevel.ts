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
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 180);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 200)); // starting position for player
        this.platforms.push(new Platform(250, this.canvasHelper.GetCenter().Y + 190)); // platform 2
        this.platforms.push(new Platform(180, this.canvasHelper.GetCenter().Y + 240)); // platform with spike
        this.spikes.push(new Spike(180, this.canvasHelper.GetCenter().Y + 225));
        this.platforms.push(new Platform(380, this.canvasHelper.GetCenter().Y + 260)); // platform 3
        this.platforms.push(new Platform(470, this.canvasHelper.GetCenter().Y + 320)); // platform with spike 2
        this.spikes.push(new Spike(470, this.canvasHelper.GetCenter().Y + 305));
        this.platforms.push(new Platform(600, this.canvasHelper.GetCenter().Y + 360)); // platform 4
        this.platforms.push(new Platform(760, this.canvasHelper.GetCenter().Y + 380)); // platform 5
        this.platforms.push(new Platform(860, this.canvasHelper.GetCenter().Y + 340)); // platform 6
        this.platforms.push(new Platform(960, this.canvasHelper.GetCenter().Y + 300)); // platform 7
        this.platforms.push(new Platform(1060, this.canvasHelper.GetCenter().Y + 260)); // platform 8
        this.platforms.push(new Platform(1200, this.canvasHelper.GetCenter().Y + 400)); // platform with spike 3
        this.spikes.push(new Spike(1200, this.canvasHelper.GetCenter().Y + 385));
        this.platforms.push(new Platform(1300, this.canvasHelper.GetCenter().Y + 340)); // platform with flag
        this.countryFlag = new Flag(1340, this.canvasHelper.GetCenter().Y + 265); // Y -75
    }

    public draw() {
        console.log("This is ScreenLevel speaking.");
        this.timer.startTimer();
        this.drawScreenLevel();
    }

    public controlsInstructions() {
        this.canvasHelper.writeTextToCanvas("Links: A", 20, 30, 50, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Rechts: D", 20, 30, 80, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Springen: Spatiebalk (ingedrukt houden)", 20, 30, 110, undefined, "left");
        this.canvasHelper.drawBorder(0, 0, 400, 120);
    }

    public drawScreenLevel = () => {
        let time = this.timer.getTime();

        this.canvasHelper.BeginUpdate();

        this.canvasHelper.Clear();
        if(time.Seconds < 10) this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:0${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, 50, 'black');
        else this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, 50, 'black');

        this.controlsInstructions();

        this.spikes.forEach((element: Entity): void => {
            element.draw();
            if(this.player.entityCollision(element)) this.player.resetPosition();
        });
        this.platforms.forEach((element: Entity): void => {
            element.draw();
            if(this.player.platformCollision(element)) this.player.stopFalling();
        })

        this.player.draw();
        this.player.move();

        this.countryFlag.draw();

        this.canvasHelper.EndUpdate();

        if(!this.player.entityCollision(this.countryFlag)) {
            requestAnimationFrame(this.drawScreenLevel);
        } 
        else {
            this.drawScreenQuiz();
        }

    }


    public drawScreenQuiz(): void {
        this.canvasHelper.Clear();
        this.canvasHelper.ChangeScreen(ScreenQuiz.Instance());
    }
}