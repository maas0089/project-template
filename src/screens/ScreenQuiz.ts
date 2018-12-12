class ScreenQuiz extends ScreenBase{

    private imageLocations: Array<string>;
    private qAndA: Array<string>;
    private screenEndresult: ScreenEndResult;

    public constructor(canvas: HTMLCanvasElement){
        super(canvas);
        this.screenEndresult = new ScreenEndResult(canvas);
    }

    public draw(): void {

    }
    
    public checkAnswer(): void {

    }

    public drawScreenLevel(): void {
        this.canvasHelper.Clear();
        this.screenEndresult.draw();
    }

}