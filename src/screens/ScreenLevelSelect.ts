class ScreenLevelSelect extends ScreenBase {

    private continents: Array<any> = [{
        netherlands: './assets/images/maps/Nederland-kaart-transparant.png',
        europe: './assets/images/maps/Europa-transparant.png',
        northAmerica: './assets/images/maps/Noord-Amerika-transparant.png'
    }] ;

    private unTravelLogo: string = "./assets/images/logo.png";

    public constructor(){
        super();
        this.canvasHelper.ChangeScreen()
    }

    public draw(): void {

        //draw main text
        // this.canvasHelper.writeTextToCanvas('UNtRAVEL', 50, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y / 3);
        this.canvasHelper.writeImageFromFileToCanvas(this.unTravelLogo, this.canvasHelper.GetCenter().X - 150, 20, 300, 300);
        this.canvasHelper.writeTextToCanvas('Selecteer een level', 25, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y / 3 + 200);

        //draw The Netherlands
        this.canvasHelper.writeImageFromFileToCanvas(this.continents[0].netherlands, this.canvasHelper.GetWidth() * 0.12, this.canvasHelper.GetCenter().Y - 80, 295, 350)
        this.canvasHelper.writeButtonToCanvas("Nederland", 'StartNetherlands', this.drawNetherlandsLevel, this.canvasHelper.GetWidth() * 0.12, this.canvasHelper.GetCenter().Y + 300);

        //draw Europe
        this.canvasHelper.writeImageFromFileToCanvas(this.continents[0].europe, this.canvasHelper.GetWidth() * 0.4 - 50, this.canvasHelper.GetCenter().Y - 50, 380, 300);
        this.canvasHelper.writeButtonToCanvas("Europa", 'StartEurope', this.drawEuropeLevel, this.canvasHelper.GetWidth() * 0.4 + 60, this.canvasHelper.GetCenter().Y + 300);

        //draw North America
        this.canvasHelper.writeImageFromFileToCanvas(this.continents[0].northAmerica, this.canvasHelper.GetWidth() * 0.7 - 100, this.canvasHelper.GetCenter().Y - 80, 355, 350);
        this.canvasHelper.writeButtonToCanvas("Noord-Amerika", 'StartAmerica', this.drawAmericaLevel, this.canvasHelper.GetWidth() * 0.7, this.canvasHelper.GetCenter().Y + 300);

        // draw controls instructions
        this.canvasHelper.writeTextToCanvas("Besturing", 30, 30, 40, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Links: A / pijltjestoets links", 20, 30, 70, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Rechts: D / pijltjestoets rechts", 20, 30, 100, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Springen: Spatiebalk (ingedrukt houden)", 20, 30, 130, undefined, "left");
        this.canvasHelper.drawBorder(0, 10, 400, 130);
    }

    public drawNetherlandsLevel = (): void => {
        console.log('Netherlands selected.');
        this.removeButtons();
        this.canvasHelper.ChangeScreen(new NetherlandsLevel);
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
        this.canvasHelper.UnregisterClickListener('StartNetherlands');
        this.canvasHelper.UnregisterClickListener('StartEurope');
        this.canvasHelper.UnregisterClickListener('StartAmerica');
    }

}