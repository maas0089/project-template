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
        this.countryFlag = new Flag(1470, this.canvasHelper.GetCenter().Y + 175, 2);
    }

    public drawLevelTwo(): void {
        this.player = new Player(0, this.canvasHelper.GetCenter().Y - 334);
        this.platforms.push(new Platform(0, this.canvasHelper.GetCenter().Y - 300)); // starting position for player
        this.platforms.push(new Platform(140, this.canvasHelper.GetCenter().Y - 280)); // platform 2
        this.platforms.push(new Platform(280, this.canvasHelper.GetCenter().Y - 270)); // platform 3
        this.platforms.push(new Platform(400, this.canvasHelper.GetCenter().Y - 250)); // platform 4
        this.platforms.push(new Platform(530, this.canvasHelper.GetCenter().Y - 240)); // platform 5
        this.platforms.push(new Platform(660, this.canvasHelper.GetCenter().Y - 220)); // platform 6

        this.platforms.push(new Platform(280, this.canvasHelper.GetCenter().Y)); //a long line of spikey stuff
        this.spikes.push(new Spike(280, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(360, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(360, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(440, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(440, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(520, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(520, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(600, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(600, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(680, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(680, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(795, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(795, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(875, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(875, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(955, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(955, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(1035, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(1035, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(1115, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(1115, this.canvasHelper.GetCenter().Y - 15));
        this.platforms.push(new Platform(1195, this.canvasHelper.GetCenter().Y));
        this.spikes.push(new Spike(1195, this.canvasHelper.GetCenter().Y - 15));

        this.platforms.push(new Platform(770, this.canvasHelper.GetCenter().Y - 200)); // platform 7 with checkpoint
        this.checkpoint = new Checkpoint(800, this.canvasHelper.GetCenter().Y - 275);
        this.platforms.push(new Platform(800, this.canvasHelper.GetCenter().Y + 250)); // platform 8
        this.platforms.push(new Platform(960, this.canvasHelper.GetCenter().Y + 260)); // platform 9
        this.platforms.push(new Platform(1120, this.canvasHelper.GetCenter().Y + 260)); // platform 10
        this.platforms.push(new Platform(1280, this.canvasHelper.GetCenter().Y + 250)); // platform 11
        this.platforms.push(new Platform(1420, this.canvasHelper.GetCenter().Y + 230)); // platform 12
        this.platforms.push(new Platform(1600, this.canvasHelper.GetCenter().Y + 275)); // platform with flag
        this.countryFlag = new Flag(1650, this.canvasHelper.GetCenter().Y + 200, 2); // X + 40, Y -75
    }

    public drawLevelThree(): void {
        this.player = new Player(0, this.canvasHelper.GetCenter().Y + 166);
        this.platforms.push(new Platform(0, this.canvasHelper.GetCenter().Y + 200)); // platform 2
        this.platforms.push(new Platform(150, this.canvasHelper.GetCenter().Y + 230)); // platform 3
        this.platforms.push(new Platform(250, this.canvasHelper.GetCenter().Y + 270)); // platform 4
        this.platforms.push(new Platform(360, this.canvasHelper.GetCenter().Y + 300)); // platform 5
        this.platforms.push(new Platform(440, this.canvasHelper.GetCenter().Y + 335)); // platform with spike 1
        this.spikes.push(new Spike(440, this.canvasHelper.GetCenter().Y + 320));
        this.platforms.push(new Platform(520, this.canvasHelper.GetCenter().Y + 300)); // platform 6
        this.platforms.push(new Platform(590, this.canvasHelper.GetCenter().Y + 335)); // platform 7 with checkpoint
        this.checkpoint = new Checkpoint(620, this.canvasHelper.GetCenter().Y + 260);
        this.platforms.push(new Platform(660, this.canvasHelper.GetCenter().Y + 300)); // platform 8
        this.platforms.push(new Platform(760, this.canvasHelper.GetCenter().Y + 260)); // platform 9
        this.platforms.push(new Platform(660, this.canvasHelper.GetCenter().Y + 220)); // platform 10
        this.platforms.push(new Platform(770, this.canvasHelper.GetCenter().Y + 180)); // platform 11
        this.platforms.push(new Platform(880, this.canvasHelper.GetCenter().Y + 140)); // platform 12
        this.platforms.push(new Platform(1050, this.canvasHelper.GetCenter().Y + 220)); // platform 13
        this.platforms.push(new Platform(1270, this.canvasHelper.GetCenter().Y + 300)); // platform 14
        this.countryFlag = new Flag(1300, this.canvasHelper.GetCenter().Y + 225, 2); // Y -75
    }

    public drawScreenQuiz(): void {
        this.canvasHelper.Clear();
        this.canvasHelper.ChangeScreen(AmericaQuiz.Instance());
    }
}