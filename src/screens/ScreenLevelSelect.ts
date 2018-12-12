class ScreenLevelSelect extends ScreenBase {

    private continents: Array<string>;
    // private screenLevel: ScreenLevel = new ScreenLevel;

    public constructor(){
        super();
    }

    public draw(): void {
        this.canvasHelper.writeTextToCanvas('UNtRAVEL', 50, this.canvasHelper.GetCenter().X, 0);
        this.canvasHelper.writeImageFromFileToCanvas('./assets/images/buttonBlue.png', this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y + 20);

    }

    public drawScreenLevel(): void {
        this.canvasHelper.Clear();
        // this.screenLevel.draw();
    }

}

// function init(): void {
//     const Untravel = new ScreenLevelSelect();
//     Untravel.draw();
// }
// window.addEventListener('load', init);
