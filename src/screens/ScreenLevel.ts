class ScreenLevel extends ScreenBase {

    // private screenQuiz: ScreenQuiz = new ScreenQuiz();
    private spikes: Array<Spike> = new Array<Spike>();
    private platforms: Array<Platform> = new Array<Platform>();
    private player: Player;
    private imageMap: string;
    private countryFlag: Flag;
    private background: string;
    private screenQuiz: ScreenQuiz = ScreenQuiz.Instance();
    private currentLevel = this.screenQuiz.getCurrentQuestion() + 1;


    //TODO: change spike width and height to match the platform
    constructor() {
        super();
    }

    public draw() {
        console.log("This is ScreenLevel speaking.");
        console.log(`This is level: ${this.currentLevel}`);
        if (this.currentLevel == 1) this.drawLevelOne();
        if (this.currentLevel == 2) this.drawLevelTwo();
        if (this.currentLevel == 3) this.drawLevelThree();
        this.timer.startTimer();
        this.drawScreenLevel();
    }

    public drawLevelOne(): void {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 180);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 200)); // starting position for player
        this.platforms.push(new Platform(250, this.canvasHelper.GetCenter().Y + 190)); // platform 2
        this.platforms.push(new Platform(180, this.canvasHelper.GetCenter().Y + 240)); // platform with spike 1
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

    public drawLevelTwo(): void {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 20)); // starting position for player
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 50)); // platform 2
        this.platforms.push(new Platform(330, this.canvasHelper.GetCenter().Y + 120)); // platform with spike 1
        this.spikes.push(new Spike(330, this.canvasHelper.GetCenter().Y + 105));
        this.platforms.push(new Platform(430, this.canvasHelper.GetCenter().Y + 200)); // platform 3
        this.platforms.push(new Platform(550, this.canvasHelper.GetCenter().Y + 190)); // platform 4
        this.platforms.push(new Platform(630, this.canvasHelper.GetCenter().Y + 225)); // platform with spike 2
        this.spikes.push(new Spike(630, this.canvasHelper.GetCenter().Y + 210));
        this.platforms.push(new Platform(710, this.canvasHelper.GetCenter().Y + 250)); // platform 5
        this.platforms.push(new Platform(950, this.canvasHelper.GetCenter().Y + 360)); // platform 6
        this.platforms.push(new Platform(1100, this.canvasHelper.GetCenter().Y + 350)); // platform 7
        this.platforms.push(new Platform(1250, this.canvasHelper.GetCenter().Y + 340)); // platform with flag
        this.countryFlag = new Flag(1290, this.canvasHelper.GetCenter().Y + 265); // Y -75
    }

    public drawLevelThree(): void {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 400); // x = 100, y = C + 400
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 420)); // starting position for player
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 380)); // platform 2
        this.platforms.push(new Platform(310, this.canvasHelper.GetCenter().Y + 335)); // platform 3
        this.platforms.push(new Platform(400, this.canvasHelper.GetCenter().Y + 290)); // platform 4
        this.platforms.push(new Platform(500, this.canvasHelper.GetCenter().Y + 270)); // platform with spike 1
        this.spikes.push(new Spike(500, this.canvasHelper.GetCenter().Y + 255));
        this.platforms.push(new Platform(510, this.canvasHelper.GetCenter().Y + 400)); // platform 5
        this.platforms.push(new Platform(660, this.canvasHelper.GetCenter().Y + 400)); // platform 6 - start of stairway to heaven
        this.platforms.push(new Platform(740, this.canvasHelper.GetCenter().Y + 360)); // platform 7
        this.platforms.push(new Platform(650, this.canvasHelper.GetCenter().Y + 320)); // platform 8
        this.platforms.push(new Platform(750, this.canvasHelper.GetCenter().Y + 280)); // platform 9
        this.platforms.push(new Platform(640, this.canvasHelper.GetCenter().Y + 240)); // platform 10
        this.platforms.push(new Platform(770, this.canvasHelper.GetCenter().Y + 200)); // platform 11
        this.platforms.push(new Platform(935, this.canvasHelper.GetCenter().Y + 170)); // platform 12 - difficult jump. grants a faster way to the finish
        this.platforms.push(new Platform(875, this.canvasHelper.GetCenter().Y + 280)); // platform with spike 2
        this.spikes.push(new Spike(875, this.canvasHelper.GetCenter().Y + 265));
        this.platforms.push(new Platform(955, this.canvasHelper.GetCenter().Y + 300)); // platform with spike 3
        this.spikes.push(new Spike(955, this.canvasHelper.GetCenter().Y + 285));
        this.platforms.push(new Platform(620, this.canvasHelper.GetCenter().Y + 170)); // platform 13 - is the easier jump, but takes longer to get to the finish
        this.platforms.push(new Platform(730, this.canvasHelper.GetCenter().Y + 130)); // platform 14 - highest platform, jump to 12 from here - easier route
        this.platforms.push(new Platform(1040, this.canvasHelper.GetCenter().Y + 220)); // platform 15
        this.platforms.push(new Platform(1190, this.canvasHelper.GetCenter().Y + 270)); // platofrm 16
        this.platforms.push(new Platform(1350, this.canvasHelper.GetCenter().Y + 340)); // platform with flag
        this.countryFlag = new Flag(1390, this.canvasHelper.GetCenter().Y + 265); // Y -75
    }

    public controlsInstructions() {
        this.canvasHelper.writeTextToCanvas("Links: A", 20, 30, 25, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Rechts: D", 20, 30, 55, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Springen: Spatiebalk (ingedrukt houden)", 20, 30, 85, undefined, "left");
        this.canvasHelper.drawBorder(0, 0, 400, 95);
    }

    public drawScreenLevel = () => {
        let time = this.timer.getTime();

        this.canvasHelper.BeginUpdate();

        this.canvasHelper.Clear();
        if(time.Seconds < 10) this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:0${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, 50, 'black');
        else this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, 50, 'black');

        this.controlsInstructions();

        this.canvasHelper.writeTextToCanvas(`Level ${this.currentLevel}`, 20, this.canvasHelper.GetWidth() - 20, 30, undefined, "right");

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