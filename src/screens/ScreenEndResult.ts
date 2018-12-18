class ScreenEndResult extends ScreenBase {

    private screenQuiz: ScreenQuiz = ScreenQuiz.Instance();

    constructor() {
        super();
    }

    public draw(): void {
        let time = this.timer.getTime();
        this.canvasHelper.writeTextToCanvas('Level voltooid!', 50, this.canvasHelper.GetCenter().X, 100);


        this.canvasHelper.writeTextToCanvas('Tijd:', 30, this.canvasHelper.GetCenter().X, 250);
        if(time.Seconds < 10) this.canvasHelper.writeTextToCanvas(` ${time.Minutes}:0${time.Seconds}`, 30, this.canvasHelper.GetCenter().X, 350, 'black');
        else this.canvasHelper.writeTextToCanvas(` ${time.Minutes}:${time.Seconds}`, 30, this.canvasHelper.GetCenter().X, 350, 'black');
        if(this.screenQuiz.getCurrentQuestion() == this.screenQuiz.getMaxQuestion()) this.canvasHelper.writeButtonToCanvas('Speel opnieuw', 'continue', this.drawScreenLevelSelect, undefined, undefined);
        else this.canvasHelper.writeButtonToCanvas('Volgend level', 'continue', this.drawNextLevelScreen, undefined, undefined);
    }

    public drawNextLevelScreen = (): void => {
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('continue');
        this.canvasHelper.ChangeScreen(new ScreenLevel);

    }

    public drawScreenLevelSelect = (): void => {
        this.canvasHelper.Clear();
        this.timer.resetTimer();
        this.canvasHelper.UnregisterClickListener('continue');
        this.canvasHelper.ChangeScreen(new ScreenLevelSelect);
    }
}