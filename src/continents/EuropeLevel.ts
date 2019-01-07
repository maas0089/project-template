/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenLevel.ts"/>


class EuropeLevel extends ScreenLevel {

    constructor() {
        super();
        console.log('this is EuropeLevel');
        this.screenQuiz = EuropeQuiz.Instance()
        this.currentLevel = this.screenQuiz.getCurrentQuestion() + 1;
    }

    public drawLevelOne(): void {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 166);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 200)); // starting position for player
        this.platforms.push(new Platform(250, this.canvasHelper.GetCenter().Y + 190)); // platform 2
        this.platforms.push(new Platform(180, this.canvasHelper.GetCenter().Y + 240)); // platform with spike 1
        this.spikes.push(new Spike(180, this.canvasHelper.GetCenter().Y + 225));
        this.platforms.push(new Platform(380, this.canvasHelper.GetCenter().Y + 260)); // platform 3
        this.platforms.push(new Platform(470, this.canvasHelper.GetCenter().Y + 320)); // platform with spike 2
        this.spikes.push(new Spike(470, this.canvasHelper.GetCenter().Y + 305));
        this.platforms.push(new Platform(600, this.canvasHelper.GetCenter().Y + 360)); // platform 4
        this.platforms.push(new Platform(760, this.canvasHelper.GetCenter().Y + 380)); // platform 5

        //test checkpoint
        this.checkpoint = new Checkpoint(800, this.canvasHelper.GetCenter().Y + 305); // checkpoint on platform 5

        this.platforms.push(new Platform(860, this.canvasHelper.GetCenter().Y + 340)); // platform 6
        this.platforms.push(new Platform(960, this.canvasHelper.GetCenter().Y + 300)); // platform 7
        this.platforms.push(new Platform(1060, this.canvasHelper.GetCenter().Y + 260)); // platform 8
        this.platforms.push(new Platform(1200, this.canvasHelper.GetCenter().Y + 400)); // platform with spike 3
        this.spikes.push(new Spike(1200, this.canvasHelper.GetCenter().Y + 385));
        this.platforms.push(new Platform(1300, this.canvasHelper.GetCenter().Y + 340)); // platform with flag
        this.countryFlag = new Flag(1340, this.canvasHelper.GetCenter().Y + 265); // Y -75
    }

    public drawLevelTwo(): void {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y - 14);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 20)); // starting position for player
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 50)); // platform 2
        this.platforms.push(new Platform(330, this.canvasHelper.GetCenter().Y + 120)); // platform with spike 1
        this.spikes.push(new Spike(330, this.canvasHelper.GetCenter().Y + 105));
        this.platforms.push(new Platform(430, this.canvasHelper.GetCenter().Y + 200)); // platform 3
        this.platforms.push(new Platform(550, this.canvasHelper.GetCenter().Y + 190)); // platform 4
        this.platforms.push(new Platform(630, this.canvasHelper.GetCenter().Y + 225)); // platform with spike 2
        this.spikes.push(new Spike(630, this.canvasHelper.GetCenter().Y + 210));
        this.platforms.push(new Platform(710, this.canvasHelper.GetCenter().Y + 250)); // platform 5
        this.platforms.push(new Platform(820, this.canvasHelper.GetCenter().Y + 210)); // platform 6
        this.platforms.push(new Platform(920, this.canvasHelper.GetCenter().Y + 175)); // platform 7
        this.platforms.push(new Platform(990, this.canvasHelper.GetCenter().Y + 210)); // platform with spike 3
        this.spikes.push(new Spike(990, this.canvasHelper.GetCenter().Y + 195));
        this.platforms.push(new Platform(1050, this.canvasHelper.GetCenter().Y + 250)); // platform 8
        this.platforms.push(new Platform(1130, this.canvasHelper.GetCenter().Y + 275)); // platform with spike 4
        this.spikes.push(new Spike(1130, this.canvasHelper.GetCenter().Y + 260));
        this.platforms.push(new Platform(1210, this.canvasHelper.GetCenter().Y + 250)); // platform 9
        this.platforms.push(new Platform(1320, this.canvasHelper.GetCenter().Y + 220)); // platform 10
        this.platforms.push(new Platform(1480, this.canvasHelper.GetCenter().Y + 210)); // platform 11
        this.platforms.push(new Platform(1630, this.canvasHelper.GetCenter().Y + 200)); // platform with flag
        this.countryFlag = new Flag(1670, this.canvasHelper.GetCenter().Y + 125); // X + 40, Y -75
    }
    
    public drawLevelThree(): void {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 388); // x = 100, y = C + 400
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 420)); // starting position for player
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 380)); // platform 2
        this.platforms.push(new Platform(310, this.canvasHelper.GetCenter().Y + 335)); // platform 3
        this.platforms.push(new Platform(400, this.canvasHelper.GetCenter().Y + 290)); // platform 4
        this.platforms.push(new Platform(530, this.canvasHelper.GetCenter().Y + 270)); // platform with spike 1
        this.spikes.push(new Spike(530, this.canvasHelper.GetCenter().Y + 255));
        this.platforms.push(new Platform(530, this.canvasHelper.GetCenter().Y + 420)); // platform 5
        this.platforms.push(new Platform(660, this.canvasHelper.GetCenter().Y + 400)); // platform 6 - start of stairway to heaven
        this.platforms.push(new Platform(740, this.canvasHelper.GetCenter().Y + 360)); // platform 7
        this.platforms.push(new Platform(650, this.canvasHelper.GetCenter().Y + 320)); // platform 8
        this.platforms.push(new Platform(750, this.canvasHelper.GetCenter().Y + 280)); // platform 9
        this.platforms.push(new Platform(640, this.canvasHelper.GetCenter().Y + 240)); // platform 10
        this.platforms.push(new Platform(770, this.canvasHelper.GetCenter().Y + 200)); // platform 11
        this.platforms.push(new Platform(935, this.canvasHelper.GetCenter().Y + 170)); // platform 12 - difficult jump. grants a faster way to the finish
        this.platforms.push(new Platform(875, this.canvasHelper.GetCenter().Y + 280)); // platform with spike 2
        this.spikes.push(new Spike(875, this.canvasHelper.GetCenter().Y + 265));
        this.platforms.push(new Platform(955, this.canvasHelper.GetCenter().Y + 300)); // platform with spike 3
        this.spikes.push(new Spike(955, this.canvasHelper.GetCenter().Y + 285));
        this.platforms.push(new Platform(620, this.canvasHelper.GetCenter().Y + 170)); // platform 13 - is the easier jump, but takes longer to get to the finish
        this.platforms.push(new Platform(730, this.canvasHelper.GetCenter().Y + 130)); // platform 14 - highest platform, jump to 12 from here - easier route
        this.platforms.push(new Platform(1040, this.canvasHelper.GetCenter().Y + 220)); // platform 15
        this.platforms.push(new Platform(1200, this.canvasHelper.GetCenter().Y + 270)); // platofrm 16
        this.platforms.push(new Platform(1350, this.canvasHelper.GetCenter().Y + 340)); // platform with flag
        this.countryFlag = new Flag(1390, this.canvasHelper.GetCenter().Y + 265); // Y -75
    }

    public drawScreenQuiz(): void {
        this.canvasHelper.Clear();
        this.canvasHelper.ChangeScreen(EuropeQuiz.Instance());
    }
}