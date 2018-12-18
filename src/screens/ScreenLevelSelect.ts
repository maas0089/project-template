class ScreenLevelSelect extends ScreenBase {

    private continents: Array<string>;
    // private screenLevel: ScreenLevel = new ScreenLevel;

    public constructor(){
        super();
        this.canvasHelper.ChangeScreen()
    }

    public draw(): void {
        this.canvasHelper.writeTextToCanvas('UNtRAVEL', 50, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y / 3);
        this.canvasHelper.writeImageFromFileToCanvas('./assets/images/maps/Europa-kaart.png', this.canvasHelper.GetCenter().X - 65, this.canvasHelper.GetCenter().Y - 65, 130, 130)
        this.canvasHelper.writeButtonToCanvas("Start", 'StartGameCommand', this.drawScreenLevel, undefined, this.canvasHelper.GetCenter().Y + 200);

    }

    public drawScreenLevel = (): void => {
        console.log('click');
        this.canvasHelper.UnregisterClickListener('StartGameCommand');
        this.canvasHelper.Clear();
        this.canvasHelper.ChangeScreen(new ScreenLevel());
    }

}