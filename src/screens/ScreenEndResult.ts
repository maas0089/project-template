class ScreenEndResult extends ScreenBase {

    // private screenHighScore: ScreenHighScore = new ScreenHighScore();

    constructor() {
        super();
    }

    public draw(): void {
        this.canvasHelper.writeTextToCanvas('END SCREEN', 50, this.canvasHelper.GetCenter().X, 50);
        this.canvasHelper.writeButtonToCanvas('Back', 'back', this.drawScreenHighScore, undefined, undefined);
    }

    public drawScreenHighScore = (): void => {
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('back');
        this.canvasHelper.ChangeScreen(new ScreenQuiz);

    }
}