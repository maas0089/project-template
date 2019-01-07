abstract class ScreenLevel extends ScreenBase {

    // private screenQuiz: ScreenQuiz = new ScreenQuiz();
    protected spikes: Array<Spike> = new Array<Spike>();
    protected platforms: Array<Platform> = new Array<Platform>();
    protected player: Player// = new Player(100, this.canvasHelper.GetCenter().Y + 180);
    protected imageMap: string;
    protected countryFlag: Flag;// = new Flag(1340, this.canvasHelper.GetCenter().Y + 265); // Y -75
    protected checkpoint: Checkpoint = null;
    protected background: string;
    protected screenQuiz: ScreenQuiz //= EuropeQuiz.Instance();
    protected currentLevel: number //= this.screenQuiz.getCurrentQuestion() + 1;


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

    public abstract drawLevelOne(): void

    public abstract drawLevelTwo(): void

    public abstract drawLevelThree(): void 

    public controlsInstructions() {
        this.canvasHelper.writeTextToCanvas("Links: A / pijltjestoets links", 20, 30, 25, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Rechts: D / pijltjestoets rechts", 20, 30, 55, undefined, "left");
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

        if(this.checkpoint != null){
            this.checkpoint.draw();
            if (this.player.entityCollision(this.checkpoint)) this.player.updateStartPosition(this.checkpoint.getX(), this.checkpoint.getY());
        }

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


    public abstract drawScreenQuiz(): void
}