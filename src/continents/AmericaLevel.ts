/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenLevel.ts"/>


class AmericaLevel extends ScreenLevel {

    constructor() {
        super();
        console.log("Make AmericaLevel great again!");
        this.screenQuiz = AmericaQuiz.Instance();
        this.currentLevel = this.screenQuiz.getCurrentQuestion() + 1;
    }

    public drawLevelOne(): void {
        this.player = new Player(0, this.canvasHelper.GetCenter().Y + 66);
        this.platforms.push(new Platform(0, this.canvasHelper.GetCenter().Y + 100)); // starting position for player
        this.platforms.push(new Platform(160, this.canvasHelper.GetCenter().Y + 130)); // platform 2
        this.platforms.push(new Platform(260, this.canvasHelper.GetCenter().Y + 350)); // platform 3
        this.platforms.push(new Platform(300, this.canvasHelper.GetCenter().Y + 240)); // platform with spike 1
        this.spikes.push(new Spike(300, this.canvasHelper.GetCenter().Y + 225));
        this.platforms.push(new Platform(380, this.canvasHelper.GetCenter().Y + 220)); // platform with spike 2
        this.spikes.push(new Spike(380, this.canvasHelper.GetCenter().Y + 205));
        this.platforms.push(new Platform(150, this.canvasHelper.GetCenter().Y + 240)); // platform with spike 3
        this.spikes.push(new Spike(150, this.canvasHelper.GetCenter().Y + 225));
        this.platforms.push(new Platform(400, this.canvasHelper.GetCenter().Y + 370)); // platform 4
        this.platforms.push(new Platform(490, this.canvasHelper.GetCenter().Y + 330)); // platform 5
        this.checkpoint = new Checkpoint(520, this.canvasHelper.GetCenter().Y + 255); // checkpoint on 5
        this.platforms.push(new Platform(610, this.canvasHelper.GetCenter().Y + 290)); // platform 6
        this.platforms.push(new Platform(710, this.canvasHelper.GetCenter().Y + 250)); // platform 7
        this.platforms.push(new Platform(720, this.canvasHelper.GetCenter().Y + 210)); // platform 8
        this.platforms.push(new Platform(730, this.canvasHelper.GetCenter().Y + 170)); // platform 9
        this.platforms.push(new Platform(740, this.canvasHelper.GetCenter().Y + 130)); // platform 10
        this.platforms.push(new Platform(750, this.canvasHelper.GetCenter().Y + 90)); // platform 11
        this.platforms.push(new Platform(760, this.canvasHelper.GetCenter().Y + 50)); // platform 12
        this.platforms.push(new Platform(880, this.canvasHelper.GetCenter().Y + 40)); // platform 13
        this.platforms.push(new Platform(1000, this.canvasHelper.GetCenter().Y + 70)); // platform 14
        this.platforms.push(new Platform(1100, this.canvasHelper.GetCenter().Y + 120)); // platform 15
        this.platforms.push(new Platform(1250, this.canvasHelper.GetCenter().Y + 220)); // platform 16
        this.platforms.push(new Platform(1340, this.canvasHelper.GetCenter().Y + 241)); // platform with spike 4
        this.spikes.push(new Spike(1340, this.canvasHelper.GetCenter().Y + 226));
        this.platforms.push(new Platform(1430, this.canvasHelper.GetCenter().Y + 250)); // platform with flag
        this.countryFlag = new Flag(1470, this.canvasHelper.GetCenter().Y + 175);
    }

    public drawLevelTwo(): void { // a bending travel course, with lots of spikey stuff in the centre
        this.player = new Player(100, this.canvasHelper.GetCenter().Y);
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
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 400); // x = 100, y = C + 400
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 420)); // starting position for player
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 380)); // platform 2
        this.platforms.push(new Platform(310, this.canvasHelper.GetCenter().Y + 335)); // platform 3
        this.platforms.push(new Platform(400, this.canvasHelper.GetCenter().Y + 290)); // platform 4
        this.platforms.push(new Platform(500, this.canvasHelper.GetCenter().Y + 270)); // platform with spike 1
        this.spikes.push(new Spike(500, this.canvasHelper.GetCenter().Y + 255));
        this.platforms.push(new Platform(510, this.canvasHelper.GetCenter().Y + 400)); // platform 5
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
        this.canvasHelper.ChangeScreen(AmericaQuiz.Instance());
    }
}