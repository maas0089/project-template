class ScreenHighScore extends ScreenBase {

    private screenLevelSelect: ScreenLevelSelect;
    private highscores: Array<any>; // this array will contain objects

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.screenLevelSelect = new ScreenLevelSelect(canvas);
    }

    public draw(): void {

    }

    public drawScreenLevelSelect(): void {
        this.canvasHelper.Clear();
        this.screenLevelSelect.draw();
    }
}