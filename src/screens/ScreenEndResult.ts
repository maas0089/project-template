class ScreenEndResult extends ScreenBase {

    constructor() {
        super();
    }

    public draw(): void {
        let time = this.timer.getTime();
        this.canvasHelper.writeTextToCanvas('END SCREEN', 50, this.canvasHelper.GetCenter().X, 50);
        if(time.Seconds < 10) this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:0${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y, 'black');
        else this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y, 'black');
        this.canvasHelper.writeButtonToCanvas('Back', 'back', this.drawScreenHighScore, undefined, undefined);
    }

    public drawScreenHighScore = (): void => {
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('back');
        this.timer.resetTimer();
        this.canvasHelper.ChangeScreen(new ScreenLevel);

    }
}