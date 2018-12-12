class ScreenQuiz extends ScreenBase{

    private imageLocations: Array<string>;
    private qAndA: Array<string>;
    // private screenEndresult: ScreenEndResult = new ScreenEndResult;

    public constructor(){
        super();
    }

    public draw(): void {

    }
    
    public checkAnswer(): void {

    }

    public drawScreenLevel(): void {
        this.canvasHelper.Clear();
        // this.screenEndresult.draw();
    }

}