class ScreenLevelSelect extends ScreenBase {

    private continents: Array<any> = [{
        europe: './assets/images/maps/Europa-kaart.png',
        northAmerica: './assets/images/maps/Noord-Amerika-kaart.png'
    }] ;

    public constructor(){
        super();
        this.canvasHelper.ChangeScreen()
    }

    public draw(): void {

        //draw main text
        this.canvasHelper.writeTextToCanvas('UNtRAVEL', 50, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y / 3);
        this.canvasHelper.writeTextToCanvas('Selecteer een werelddeel', 25, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y / 3 + 60);

        //draw Europe
        this.canvasHelper.writeImageFromFileToCanvas(this.continents[0].europe, this.canvasHelper.GetWidth() * 0.3 - 40, this.canvasHelper.GetCenter().Y - 150, 300, 300);
        this.canvasHelper.writeButtonToCanvas("Europa", 'StartEurope', this.drawEuropeLevel, this.canvasHelper.GetWidth() * 0.3, this.canvasHelper.GetCenter().Y + 200);

        //draw North America
<<<<<<< HEAD
        this.canvasHelper.writeImageFromFileToCanvas(this.continents[0].northAmerica, this.canvasHelper.GetWidth() * 0.6 - 40, this.canvasHelper.GetCenter().Y - 150, 300, 300);
        this.canvasHelper.writeButtonToCanvas("Noord-Amerika", 'StartAmerica', this.drawAmericaLevel, this.canvasHelper.GetWidth() * 0.6, this.canvasHelper.GetCenter().Y + 200)

=======
        this.canvasHelper.writeImageFromFileToCanvas(this.continents[0].northAmerica, this.canvasHelper.GetWidth() * 0.3 - 40, this.canvasHelper.GetCenter().Y - 150, 300, 300);
        this.canvasHelper.writeButtonToCanvas("Noord-Amerika", 'StartAmerica', this.drawAmericaLevel, this.canvasHelper.GetWidth() * 0.3, this.canvasHelper.GetCenter().Y + 200);

        // draw controls instructions
        this.canvasHelper.writeTextToCanvas("Besturing", 30, 30, this.canvasHelper.GetCenter().Y + 30, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Links: A / pijltjestoets links", 20, 30, this.canvasHelper.GetCenter().Y + 60, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Rechts: D / pijltjestoets rechts", 20, 30, this.canvasHelper.GetCenter().Y + 90, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Springen: Spatiebalk (ingedrukt houden)", 20, 30, this.canvasHelper.GetCenter().Y + 120, undefined, "left");
        this.canvasHelper.drawBorder(0, this.canvasHelper.GetCenter().Y, 400, 130);
>>>>>>> b881fafe75b4a0033deb1b62b7ff8f9c0e3a30d0
    }

    public drawEuropeLevel = (): void => {
        console.log('Europe selected.');
        this.removeButtons();
        this.canvasHelper.ChangeScreen(new EuropeLevel);
    }

    public drawAmericaLevel = (): void => {
        console.log('North America selected');
        this.removeButtons();
        this.canvasHelper.ChangeScreen(new AmericaLevel);

    }

    public removeButtons = (): void => {
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('StartEurope');
        this.canvasHelper.UnregisterClickListener('StartAmerica');
    }

}