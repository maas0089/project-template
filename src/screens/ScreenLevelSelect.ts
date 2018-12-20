class ScreenLevelSelect extends ScreenBase {

    private continents: Array<string>;
    // private screenLevel: ScreenLevel = new ScreenLevel;

    public constructor(){
        super();
        this.canvasHelper.ChangeScreen()
    }

    public draw(): void {
        this.canvasHelper.writeTextToCanvas('UNtRAVEL', 50, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y / 3);
        this.canvasHelper.writeImageFromFileToCanvas('./assets/images/maps/Europa-kaart.png', this.canvasHelper.GetWidth() * 0.6 + 50, this.canvasHelper.GetCenter().Y - 65, 130, 130)
        this.canvasHelper.writeButtonToCanvas("Europa", 'StartEurope', this.drawEuropeLevel, this.canvasHelper.GetWidth() * 0.6, this.canvasHelper.GetCenter().Y + 200);
        this.canvasHelper.writeButtonToCanvas("America", 'StartAmerica', this.drawAmericaLevel, this.canvasHelper.GetWidth() * 0.3, this.canvasHelper.GetCenter().Y + 200)

    }

    public drawEuropeLevel = (): void => {
        console.log('Europe');
        this.removeButtons();
        this.canvasHelper.ChangeScreen(new EuropeLevel);
    }

    public drawAmericaLevel = (): void => {
        console.log('America');
        this.removeButtons();
        this.canvasHelper.ChangeScreen(new AmericaLevel);

    }

    public removeButtons = (): void => {
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('StartEurope');
        this.canvasHelper.UnregisterClickListener('StartAmerica');
    }

}