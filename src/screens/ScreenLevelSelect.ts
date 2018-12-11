class ScreenLevelSelect extends ScreenBase{

    private continents: Array<string>;
    private screenLevel: ScreenLevel;

    public constructor(canvas: HTMLCanvasElement){
        super(canvas);
        this.screenLevel = new ScreenLevel();
    }

    public draw(): void {

    }

    public drawScreenLevel(): void {
        this.canvasHelper.Clear();
        this.screenLevel.draw();
    }

}