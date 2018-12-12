class ScreenLevelSelect extends ScreenBase {

    private continents: Array<string>;
    // private screenLevel: ScreenLevel = new ScreenLevel;

    public constructor(){
        super();
    }

    public draw(): void {
        this.canvasHelper.writeTextToCanvas('UNtRAVEL', 50, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y / 3);
        this.canvasHelper.writeImageFromFileToCanvas('./assets/images/maps/Europa-kaart.png', this.canvasHelper.GetCenter().X - 65, this.canvasHelper.GetCenter().Y - 65, 130, 130)
        this.canvasHelper.writeButtonToCanvas("Play", 'StartGameCommand', this.drawScreenLevel, undefined, this.canvasHelper.GetCenter().Y + 200);

    }

    public drawScreenLevel = (): void => {
        console.log('click');
        this.canvasHelper.UnregisterClickListener('StartGameCommand');
        this.canvasHelper.Clear();
        // this.screenLevel.draw();
    }

}

function init(): void {
    const Untravel = new ScreenLevelSelect();
    Untravel.draw();
}
window.addEventListener('load', init);
