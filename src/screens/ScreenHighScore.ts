class ScreenHighScore extends ScreenBase {

    // private screenLevelSelect: ScreenLevelSelect = new ScreenLevelSelect();
    private highscores: Array<any>; // this array will contain objects

    constructor() {
        super();
    }

    public draw(): void {

    }

    public drawScreenLevelSelect(): void {
        this.canvasHelper.Clear();
        // this.screenLevelSelect.draw();
    }
}