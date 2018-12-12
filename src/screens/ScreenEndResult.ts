class ScreenEndResult extends ScreenBase {

    private screenHighScore: ScreenHighScore;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.screenHighScore = new ScreenHighScore(canvas);
    }

    public draw(): void {

    }

    public drawScreenHighScore(): void {
        this.canvasHelper.Clear();
        this.screenHighScore.draw();
    }
}