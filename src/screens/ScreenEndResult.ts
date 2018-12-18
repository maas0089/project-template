class ScreenEndResult extends ScreenBase {

    constructor() {
        super();
    }

    public draw(): void {
        let time = this.timer.getTime();
        this.canvasHelper.writeTextToCanvas('Level voltooid!', 50, this.canvasHelper.GetCenter().X, 100);


        this.canvasHelper.writeTextToCanvas('Tijd:', 30, this.canvasHelper.GetCenter().X, 250);
        if(time.Seconds < 10) this.canvasHelper.writeTextToCanvas(` ${time.Minutes}:0${time.Seconds}`, 30, this.canvasHelper.GetCenter().X, 350, 'black');
        else this.canvasHelper.writeTextToCanvas(` ${time.Minutes}:${time.Seconds}`, 30, this.canvasHelper.GetCenter().X, 350, 'black');
        this.canvasHelper.writeButtonToCanvas('Volgend level', 'replay', this.drawScreenHighScore, undefined, undefined);
    }

    public drawScreenHighScore = (): void => {
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('replay');
        this.canvasHelper.ChangeScreen(new ScreenLevel);

    }
}