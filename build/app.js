class App {
    constructor() {
        this.canvasHelper = CanvasHelper.Instance();
        this.canvasHelper.ChangeScreen(new ScreenLevelSelect());
    }
}
let init = function () {
    const myGame = new App();
};
window.addEventListener('load', init);
class ScreenBase {
    constructor() {
        this.canvasHelper = CanvasHelper.Instance();
        this.timer = TimeHelper.Instance();
    }
}
class ScreenEndResult extends ScreenBase {
    constructor(correct) {
        super();
        this.screenHighScore = ScreenHighScore.Instance();
        this.drawCorrectScreen = () => {
            let time = this.timer.getTime();
            this.canvasHelper.writeTextToCanvas(`Level ${this.screenQuiz.getCurrentQuestion()} voltooid!`, 50, this.canvasHelper.GetCenter().X, 100);
            this.canvasHelper.writeTextToCanvas('Tijd:', 30, this.canvasHelper.GetCenter().X, 250);
            if (time.Seconds < 10)
                this.canvasHelper.writeTextToCanvas(` ${time.Minutes}:0${time.Seconds}`, 30, this.canvasHelper.GetCenter().X, 350, 'black');
            else
                this.canvasHelper.writeTextToCanvas(` ${time.Minutes}:${time.Seconds}`, 30, this.canvasHelper.GetCenter().X, 350, 'black');
            if (this.screenQuiz.getCurrentQuestion() > this.screenQuiz.getMaxQuestion() - 1)
                this.canvasHelper.writeButtonToCanvas('Highscores', 'continue', this.drawScreenHighScore, undefined, undefined);
            else
                this.canvasHelper.writeButtonToCanvas('Volgend level', 'continue', this.drawNextLevelScreen, undefined, undefined);
        };
        this.drawWrongScreen = () => {
            this.canvasHelper.writeTextToCanvas('Helaas,', 50, this.canvasHelper.GetCenter().X, this.canvasHelper.GetHeight() * 0.3, 'red');
            this.canvasHelper.writeTextToCanvas('Dat antwoord was fout!', 40, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y - 50, 'red');
            this.canvasHelper.writeButtonToCanvas('Probeer opnieuw', 'drawScreenLevel', this.drawScreenLevel);
        };
        this.correct = correct;
    }
    draw() {
        if (this.correct)
            this.drawCorrectScreen();
        else
            this.drawWrongScreen();
    }
}
class AmericaEndResult extends ScreenEndResult {
    constructor(correct) {
        super(correct);
        this.drawScreenLevel = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('drawScreenLevel');
            this.canvasHelper.ChangeScreen(new AmericaLevel);
        };
        this.drawNextLevelScreen = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('continue');
            this.canvasHelper.ChangeScreen(new AmericaLevel);
        };
        this.drawScreenHighScore = () => {
            this.canvasHelper.Clear();
            this.screenQuiz.resetQuestion();
            this.canvasHelper.UnregisterClickListener('continue');
            this.screenHighScore.setCategory(1);
            this.canvasHelper.ChangeScreen(ScreenHighScore.Instance());
        };
        console.log('this is AmericaEndResult');
        this.screenQuiz = AmericaQuiz.Instance();
    }
}
class ScreenLevel extends ScreenBase {
    constructor() {
        super();
        this.spikes = new Array();
        this.platforms = new Array();
        this.checkpoint = null;
        this.drawScreenLevel = () => {
            let time = this.timer.getTime();
            this.canvasHelper.BeginUpdate();
            this.canvasHelper.Clear();
            if (time.Seconds < 10)
                this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:0${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, 50, 'black');
            else
                this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, 50, 'black');
            this.controlsInstructions();
            this.checkpointFeedback();
            this.canvasHelper.writeTextToCanvas(`Level ${this.currentLevel}`, 20, this.canvasHelper.GetWidth() - 20, 30, undefined, "right");
            this.spikes.forEach((element) => {
                element.draw();
                if (this.player.entityCollision(element))
                    this.player.resetPosition();
            });
            this.platforms.forEach((element) => {
                element.draw();
                if (this.player.platformCollision(element))
                    this.player.stopFalling();
            });
            if (this.checkpoint != null) {
                this.checkpoint.draw();
                if (this.player.entityCollision(this.checkpoint)) {
                    this.player.updateStartPosition(this.checkpoint.getX(), this.checkpoint.getY());
                    this.checkpointReached = true;
                }
                ;
            }
            this.player.draw();
            this.player.move();
            this.countryFlag.draw();
            this.canvasHelper.EndUpdate();
            if (!this.player.entityCollision(this.countryFlag)) {
                requestAnimationFrame(this.drawScreenLevel);
            }
            else {
                this.drawScreenQuiz();
            }
        };
    }
    draw() {
        console.log("This is ScreenLevel speaking.");
        console.log(`This is level: ${this.currentLevel}`);
        if (this.currentLevel == 1)
            this.drawLevelOne();
        if (this.currentLevel == 2)
            this.drawLevelTwo();
        if (this.currentLevel == 3)
            this.drawLevelThree();
        this.timer.startTimer();
        this.drawScreenLevel();
    }
    controlsInstructions() {
        this.canvasHelper.writeTextToCanvas("Links: A / pijltjestoets links", 20, 30, 25, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Rechts: D / pijltjestoets rechts", 20, 30, 55, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Springen: Spatiebalk (ingedrukt houden)", 20, 30, 85, undefined, "left");
        this.canvasHelper.drawBorder(0, 0, 400, 95);
    }
    checkpointFeedback() {
        if (this.checkpointReached == true) {
            this.canvasHelper.writeTextToCanvas("Checkpoint: Gehaald!", 20, 30, 120, "green", "left");
        }
        else {
            this.canvasHelper.writeTextToCanvas("Checkpoint: Nog niet gehaald", 20, 30, 120, "red", "left");
        }
    }
}
class AmericaLevel extends ScreenLevel {
    constructor() {
        super();
        console.log("Make AmericaLevel great again!");
        this.screenQuiz = AmericaQuiz.Instance();
        this.currentLevel = this.screenQuiz.getCurrentQuestion() + 1;
    }
    drawLevelOne() {
        this.player = new Player(0, this.canvasHelper.GetCenter().Y + 66);
        this.platforms.push(new Platform(0, this.canvasHelper.GetCenter().Y + 100));
        this.platforms.push(new Platform(160, this.canvasHelper.GetCenter().Y + 130));
        this.platforms.push(new Platform(260, this.canvasHelper.GetCenter().Y + 350));
        this.platforms.push(new Platform(300, this.canvasHelper.GetCenter().Y + 240));
        this.spikes.push(new Spike(300, this.canvasHelper.GetCenter().Y + 225));
        this.platforms.push(new Platform(380, this.canvasHelper.GetCenter().Y + 220));
        this.spikes.push(new Spike(380, this.canvasHelper.GetCenter().Y + 205));
        this.platforms.push(new Platform(150, this.canvasHelper.GetCenter().Y + 240));
        this.spikes.push(new Spike(150, this.canvasHelper.GetCenter().Y + 225));
        this.platforms.push(new Platform(400, this.canvasHelper.GetCenter().Y + 370));
        this.platforms.push(new Platform(490, this.canvasHelper.GetCenter().Y + 330));
        this.checkpoint = new Checkpoint(520, this.canvasHelper.GetCenter().Y + 255);
        this.platforms.push(new Platform(610, this.canvasHelper.GetCenter().Y + 290));
        this.platforms.push(new Platform(710, this.canvasHelper.GetCenter().Y + 250));
        this.platforms.push(new Platform(720, this.canvasHelper.GetCenter().Y + 210));
        this.platforms.push(new Platform(730, this.canvasHelper.GetCenter().Y + 170));
        this.platforms.push(new Platform(740, this.canvasHelper.GetCenter().Y + 130));
        this.platforms.push(new Platform(750, this.canvasHelper.GetCenter().Y + 90));
        this.platforms.push(new Platform(760, this.canvasHelper.GetCenter().Y + 50));
        this.platforms.push(new Platform(880, this.canvasHelper.GetCenter().Y + 40));
        this.platforms.push(new Platform(1000, this.canvasHelper.GetCenter().Y + 70));
        this.platforms.push(new Platform(1100, this.canvasHelper.GetCenter().Y + 120));
        this.platforms.push(new Platform(1250, this.canvasHelper.GetCenter().Y + 220));
        this.platforms.push(new Platform(1340, this.canvasHelper.GetCenter().Y + 241));
        this.spikes.push(new Spike(1340, this.canvasHelper.GetCenter().Y + 226));
        this.platforms.push(new Platform(1430, this.canvasHelper.GetCenter().Y + 250));
        this.countryFlag = new Flag(1470, this.canvasHelper.GetCenter().Y + 175, 2);
    }
    drawLevelTwo() {
        this.player = new Player(0, this.canvasHelper.GetCenter().Y - 334);
        this.platforms.push(new Platform(0, this.canvasHelper.GetCenter().Y - 300));
        this.platforms.push(new Platform(140, this.canvasHelper.GetCenter().Y - 280));
        this.platforms.push(new Platform(280, this.canvasHelper.GetCenter().Y - 270));
        this.platforms.push(new Platform(400, this.canvasHelper.GetCenter().Y - 250));
        this.platforms.push(new Platform(530, this.canvasHelper.GetCenter().Y - 240));
        this.platforms.push(new Platform(660, this.canvasHelper.GetCenter().Y - 220));
        this.platforms.push(new Platform(280, this.canvasHelper.GetCenter().Y));
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
        this.platforms.push(new Platform(770, this.canvasHelper.GetCenter().Y - 200));
        this.checkpoint = new Checkpoint(800, this.canvasHelper.GetCenter().Y - 275);
        this.platforms.push(new Platform(800, this.canvasHelper.GetCenter().Y + 250));
        this.platforms.push(new Platform(960, this.canvasHelper.GetCenter().Y + 260));
        this.platforms.push(new Platform(1120, this.canvasHelper.GetCenter().Y + 260));
        this.platforms.push(new Platform(1280, this.canvasHelper.GetCenter().Y + 250));
        this.platforms.push(new Platform(1420, this.canvasHelper.GetCenter().Y + 230));
        this.platforms.push(new Platform(1600, this.canvasHelper.GetCenter().Y + 275));
        this.countryFlag = new Flag(1650, this.canvasHelper.GetCenter().Y + 200, 2);
    }
    drawLevelThree() {
        this.player = new Player(0, this.canvasHelper.GetCenter().Y + 166);
        this.platforms.push(new Platform(0, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(150, this.canvasHelper.GetCenter().Y + 230));
        this.platforms.push(new Platform(250, this.canvasHelper.GetCenter().Y + 270));
        this.platforms.push(new Platform(360, this.canvasHelper.GetCenter().Y + 300));
        this.platforms.push(new Platform(440, this.canvasHelper.GetCenter().Y + 335));
        this.spikes.push(new Spike(440, this.canvasHelper.GetCenter().Y + 320));
        this.platforms.push(new Platform(520, this.canvasHelper.GetCenter().Y + 300));
        this.platforms.push(new Platform(590, this.canvasHelper.GetCenter().Y + 335));
        this.checkpoint = new Checkpoint(620, this.canvasHelper.GetCenter().Y + 260);
        this.platforms.push(new Platform(660, this.canvasHelper.GetCenter().Y + 300));
        this.platforms.push(new Platform(760, this.canvasHelper.GetCenter().Y + 260));
        this.platforms.push(new Platform(660, this.canvasHelper.GetCenter().Y + 220));
        this.platforms.push(new Platform(770, this.canvasHelper.GetCenter().Y + 180));
        this.platforms.push(new Platform(880, this.canvasHelper.GetCenter().Y + 140));
        this.platforms.push(new Platform(1050, this.canvasHelper.GetCenter().Y + 220));
        this.platforms.push(new Platform(1270, this.canvasHelper.GetCenter().Y + 300));
        this.countryFlag = new Flag(1300, this.canvasHelper.GetCenter().Y + 225, 2);
    }
    drawScreenQuiz() {
        this.canvasHelper.Clear();
        this.canvasHelper.ChangeScreen(AmericaQuiz.Instance());
    }
}
class ScreenQuiz extends ScreenBase {
    constructor() {
        super();
        this.question = 0;
        this.usedQuestions = new Array();
        this.firstAnswer = 0;
        this.secondAnswer = 0;
        this.thirdAnswer = 0;
        this.retry = false;
        this.wrongAnswerOne = () => {
            if (this.firstAnswer != 1) {
                this.drawWrongScreen();
                this.retry = true;
            }
        };
        this.wrongAnswerTwo = () => {
            if (this.secondAnswer != 1) {
                this.drawWrongScreen();
                this.retry = true;
            }
        };
        this.wrongAnswerThree = () => {
            if (this.thirdAnswer != 1) {
                this.drawWrongScreen();
                this.retry = true;
            }
        };
        this.checkAnswerOne = () => {
            console.log('Correct!');
            this.firstAnswer = 1;
            this.removeButtons();
            if (this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1)
                this.drawNextScreen();
            else
                this.drawScreenQuiz();
        };
        this.checkAnswerTwo = () => {
            console.log('Correct!');
            this.secondAnswer = 1;
            this.removeButtons();
            if (this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1)
                this.drawNextScreen();
            else
                this.drawScreenQuiz();
        };
        this.checkAnswerThree = () => {
            console.log('Correct!');
            this.thirdAnswer = 1;
            this.removeButtons();
            if (this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1)
                this.drawNextScreen();
            else
                this.drawScreenQuiz();
        };
        this.drawNextScreen = () => {
            this.canvasHelper.Clear();
            this.removeButtons();
            this.question++;
            this.firstAnswer = 0;
            this.secondAnswer = 0;
            this.thirdAnswer = 0;
            this.retry = false;
            this.drawCorrectScreen();
        };
        this.generateRandomQuestion = () => {
            console.log('generating question...');
            do
                this.currentQuestion = this.canvasHelper.randomNumber(0, this.totalquestion - 1);
            while (this.usedQuestions.indexOf(this.currentQuestion) != -1);
            console.log(`current question: ${this.currentQuestion + 1}`);
            this.usedQuestions.push(this.currentQuestion);
        };
        this.removeButtons = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('startGame1');
            this.canvasHelper.UnregisterClickListener('startGame2');
            this.canvasHelper.UnregisterClickListener('startGame3');
            this.canvasHelper.UnregisterClickListener('startGame4');
            this.canvasHelper.UnregisterClickListener('startGame5');
            this.canvasHelper.UnregisterClickListener('startGame6');
            this.canvasHelper.UnregisterClickListener('startGame7');
            this.canvasHelper.UnregisterClickListener('startGame8');
            this.canvasHelper.UnregisterClickListener('startGame9');
        };
    }
    QuizExplanation() {
        this.canvasHelper.writeTextToCanvas("Legenda", 30, this.canvasHelper.GetWidth() - 300, 130, undefined, "left");
        this.canvasHelper.writeTextToCanvas("A, B, C: Stad / Zee / Oceaan", 20, this.canvasHelper.GetWidth() - 300, 160, undefined, "left");
        this.canvasHelper.writeTextToCanvas("a, b, c: Rivier / Provincie", 20, this.canvasHelper.GetWidth() - 300, 190, undefined, "left");
        this.canvasHelper.writeTextToCanvas("I, II, III: Land", 20, this.canvasHelper.GetWidth() - 300, 220, undefined, "left");
        this.canvasHelper.drawBorder(this.canvasHelper.GetWidth() - 320, 100, 320, 130);
    }
    draw() {
        this.drawScreenQuiz();
    }
    shuffle(array) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }
    drawScreenQuiz() {
        if (this.firstAnswer == 0 && this.secondAnswer == 0 && this.thirdAnswer == 0 && this.retry == false) {
            this.generateRandomQuestion();
            this.positionOne = this.shuffle([100, 150, 200]);
            this.positionTwo = this.shuffle([300, 350, 400]);
            this.positionThree = this.shuffle([500, 550, 600]);
        }
        else if (this.retry == true) {
            this.positionOne = this.shuffle([100, 150, 200]);
            this.positionTwo = this.shuffle([300, 350, 400]);
            this.positionThree = this.shuffle([500, 550, 600]);
            this.retry = false;
        }
        let questionArray = this.qAndA[this.currentQuestion];
        this.timer.pauseTimer();
        this.QuizExplanation();
        this.drawMap();
        this.canvasHelper.writeTextToCanvas('Wat ligt hier?', 50, this.canvasHelper.GetCenter().X, 50);
        this.canvasHelper.writeTextToCanvas(questionArray.letter1, 20, this.canvasHelper.GetWidth() * 0.59, 125, "red");
        if (questionArray.a1[1])
            this.canvasHelper.writeButtonToCanvas(`${questionArray.a1[0]}`, 'startGame1', this.checkAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[0], this.firstAnswer);
        else
            this.canvasHelper.writeButtonToCanvas(`${questionArray.a1[0]}`, 'startGame1', this.wrongAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[0]);
        if (questionArray.b1[1])
            this.canvasHelper.writeButtonToCanvas(`${questionArray.b1[0]}`, 'startGame2', this.checkAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[1], this.firstAnswer);
        else
            this.canvasHelper.writeButtonToCanvas(`${questionArray.b1[0]}`, 'startGame2', this.wrongAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[1]);
        if (questionArray.c1[1])
            this.canvasHelper.writeButtonToCanvas(`${questionArray.c1[0]}`, 'startGame3', this.checkAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[2], this.firstAnswer);
        else
            this.canvasHelper.writeButtonToCanvas(`${questionArray.c1[0]}`, 'startGame3', this.wrongAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[2]);
        this.canvasHelper.writeTextToCanvas(questionArray.letter2, 20, this.canvasHelper.GetWidth() * 0.59, 325, "red");
        if (questionArray.a2[1])
            this.canvasHelper.writeButtonToCanvas(`${questionArray.a2[0]}`, 'startGame4', this.checkAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[0], this.secondAnswer);
        else
            this.canvasHelper.writeButtonToCanvas(`${questionArray.a2[0]}`, 'startGame4', this.wrongAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[0]);
        if (questionArray.b2[1])
            this.canvasHelper.writeButtonToCanvas(`${questionArray.b2[0]}`, 'startGame5', this.checkAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[1], this.secondAnswer);
        else
            this.canvasHelper.writeButtonToCanvas(`${questionArray.b2[0]}`, 'startGame5', this.wrongAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[1]);
        if (questionArray.c2[1])
            this.canvasHelper.writeButtonToCanvas(`${questionArray.c2[0]}`, 'startGame6', this.checkAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[2], this.secondAnswer);
        else
            this.canvasHelper.writeButtonToCanvas(`${questionArray.c2[0]}`, 'startGame6', this.wrongAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[2]);
        this.canvasHelper.writeTextToCanvas(questionArray.letter3, 20, this.canvasHelper.GetWidth() * 0.59, 525, "red");
        if (questionArray.a3[1])
            this.canvasHelper.writeButtonToCanvas(`${questionArray.a3[0]}`, 'startGame7', this.checkAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[0], this.thirdAnswer);
        else
            this.canvasHelper.writeButtonToCanvas(`${questionArray.a3[0]}`, 'startGame7', this.wrongAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[0]);
        if (questionArray.b3[1])
            this.canvasHelper.writeButtonToCanvas(`${questionArray.b3[0]}`, 'startGame8', this.checkAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[1], this.thirdAnswer);
        else
            this.canvasHelper.writeButtonToCanvas(`${questionArray.b3[0]}`, 'startGame8', this.wrongAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[1]);
        if (questionArray.c3[1])
            this.canvasHelper.writeButtonToCanvas(`${questionArray.c3[0]}`, 'startGame9', this.checkAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[2], this.thirdAnswer);
        else
            this.canvasHelper.writeButtonToCanvas(`${questionArray.c3[0]}`, 'startGame9', this.wrongAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[2]);
    }
    resetQuestion() {
        this.question = 0;
        this.usedQuestions.length = 0;
    }
    getCurrentQuestion() {
        return this.question;
    }
    getMaxQuestion() {
        return this.totalquestion;
    }
}
class AmericaQuiz extends ScreenQuiz {
    constructor() {
        super();
        this.drawWrongScreen = () => {
            this.canvasHelper.Clear();
            this.removeButtons();
            this.canvasHelper.ChangeScreen(new AmericaEndResult(false));
        };
        this.drawCorrectScreen = () => {
            this.canvasHelper.ChangeScreen(new AmericaEndResult(true));
        };
        console.log('this is AmericaQuiz');
        this.totalquestion = 3;
        this.imageLocations = [
            "./assets/questions/NorthAmerica1.png",
            './assets/questions/NorthAmerica2.png',
            './assets/questions/NorthAmerica3.png'
        ];
        this.qAndA = [
            {
                letter1: 'a',
                a1: ['Californië ', true],
                b1: ['Los Angeles', false],
                c1: ['Alaska', false],
                letter2: 'B',
                a2: ['Chicago', true],
                b2: ['Washington', false],
                c2: ['Mississipi', false],
                letter3: 'C',
                a3: ['New York', true],
                b3: ['Washington', false],
                c3: ['Montreal ', false]
            },
            {
                letter1: 'A',
                a1: ['Montreal ', true],
                b1: ['Los Angeles', false],
                c1: ['New York', false],
                letter2: 'II',
                a2: ['Groenland ', true],
                b2: ['Alaska', false],
                c2: ['Canada', false],
                letter3: 'C',
                a3: ['Atlantische Oceaan ', true],
                b3: ['Caribische Zee', false],
                c3: ['Noordelijke IJszee', false]
            },
            {
                letter1: 'A',
                a1: ['Mexico-Stad', true],
                b1: ['Los Angeles', false],
                c1: ['Rocky Mountains', false],
                letter2: 'b',
                a2: ['Mississipi', true],
                b2: ['Rocky Mountains', false],
                c2: ['Chicago', false],
                letter3: 'III',
                a3: ['Verenigde Staten', true],
                b3: ['Hawaii', false],
                c3: ['Canada', false]
            }
        ];
    }
    static Instance() {
        if (this.instance == null) {
            this.instance = new AmericaQuiz();
        }
        return this.instance;
    }
    drawMap() {
        this.canvasHelper.writeImageFromFileToCanvas(`${this.imageLocations[this.currentQuestion]}`, 100, 100, 711, 700);
    }
}
AmericaQuiz.instance = null;
class EuropeEndResult extends ScreenEndResult {
    constructor(correct) {
        super(correct);
        this.drawScreenLevel = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('drawScreenLevel');
            this.canvasHelper.ChangeScreen(new EuropeLevel);
        };
        this.drawNextLevelScreen = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('continue');
            this.canvasHelper.ChangeScreen(new EuropeLevel);
        };
        this.drawScreenHighScore = () => {
            this.canvasHelper.Clear();
            this.screenQuiz.resetQuestion();
            this.canvasHelper.UnregisterClickListener('continue');
            this.screenHighScore.setCategory(2);
            this.canvasHelper.ChangeScreen(ScreenHighScore.Instance());
        };
        console.log('this is EuropeEndResult');
        this.screenQuiz = EuropeQuiz.Instance();
    }
}
class EuropeLevel extends ScreenLevel {
    constructor() {
        super();
        console.log('this is EuropeLevel');
        this.screenQuiz = EuropeQuiz.Instance();
        this.currentLevel = this.screenQuiz.getCurrentQuestion() + 1;
    }
    drawLevelOne() {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 166);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(250, this.canvasHelper.GetCenter().Y + 190));
        this.platforms.push(new Platform(180, this.canvasHelper.GetCenter().Y + 240));
        this.spikes.push(new Spike(180, this.canvasHelper.GetCenter().Y + 225));
        this.platforms.push(new Platform(380, this.canvasHelper.GetCenter().Y + 260));
        this.platforms.push(new Platform(470, this.canvasHelper.GetCenter().Y + 320));
        this.spikes.push(new Spike(470, this.canvasHelper.GetCenter().Y + 305));
        this.platforms.push(new Platform(600, this.canvasHelper.GetCenter().Y + 360));
        this.platforms.push(new Platform(760, this.canvasHelper.GetCenter().Y + 380));
        this.checkpoint = new Checkpoint(800, this.canvasHelper.GetCenter().Y + 305);
        this.platforms.push(new Platform(860, this.canvasHelper.GetCenter().Y + 340));
        this.platforms.push(new Platform(960, this.canvasHelper.GetCenter().Y + 300));
        this.platforms.push(new Platform(1060, this.canvasHelper.GetCenter().Y + 260));
        this.platforms.push(new Platform(1200, this.canvasHelper.GetCenter().Y + 400));
        this.spikes.push(new Spike(1200, this.canvasHelper.GetCenter().Y + 385));
        this.platforms.push(new Platform(1300, this.canvasHelper.GetCenter().Y + 340));
        this.countryFlag = new Flag(1340, this.canvasHelper.GetCenter().Y + 265);
    }
    drawLevelTwo() {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y - 14);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 20));
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 50));
        this.platforms.push(new Platform(330, this.canvasHelper.GetCenter().Y + 120));
        this.spikes.push(new Spike(330, this.canvasHelper.GetCenter().Y + 105));
        this.platforms.push(new Platform(430, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(550, this.canvasHelper.GetCenter().Y + 190));
        this.platforms.push(new Platform(630, this.canvasHelper.GetCenter().Y + 225));
        this.spikes.push(new Spike(630, this.canvasHelper.GetCenter().Y + 210));
        this.platforms.push(new Platform(710, this.canvasHelper.GetCenter().Y + 250));
        this.platforms.push(new Platform(820, this.canvasHelper.GetCenter().Y + 210));
        this.platforms.push(new Platform(920, this.canvasHelper.GetCenter().Y + 175));
        this.checkpoint = new Checkpoint(950, this.canvasHelper.GetCenter().Y + 100);
        this.platforms.push(new Platform(990, this.canvasHelper.GetCenter().Y + 210));
        this.spikes.push(new Spike(990, this.canvasHelper.GetCenter().Y + 195));
        this.platforms.push(new Platform(1050, this.canvasHelper.GetCenter().Y + 250));
        this.platforms.push(new Platform(1130, this.canvasHelper.GetCenter().Y + 275));
        this.spikes.push(new Spike(1130, this.canvasHelper.GetCenter().Y + 260));
        this.platforms.push(new Platform(1210, this.canvasHelper.GetCenter().Y + 250));
        this.platforms.push(new Platform(1320, this.canvasHelper.GetCenter().Y + 220));
        this.platforms.push(new Platform(1480, this.canvasHelper.GetCenter().Y + 210));
        this.platforms.push(new Platform(1630, this.canvasHelper.GetCenter().Y + 200));
        this.countryFlag = new Flag(1670, this.canvasHelper.GetCenter().Y + 125);
    }
    drawLevelThree() {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 388);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 420));
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 380));
        this.platforms.push(new Platform(310, this.canvasHelper.GetCenter().Y + 335));
        this.platforms.push(new Platform(400, this.canvasHelper.GetCenter().Y + 290));
        this.platforms.push(new Platform(530, this.canvasHelper.GetCenter().Y + 270));
        this.spikes.push(new Spike(530, this.canvasHelper.GetCenter().Y + 255));
        this.platforms.push(new Platform(530, this.canvasHelper.GetCenter().Y + 420));
        this.checkpoint = new Checkpoint(560, this.canvasHelper.GetCenter().Y + 345);
        this.platforms.push(new Platform(660, this.canvasHelper.GetCenter().Y + 400));
        this.platforms.push(new Platform(740, this.canvasHelper.GetCenter().Y + 360));
        this.platforms.push(new Platform(650, this.canvasHelper.GetCenter().Y + 320));
        this.platforms.push(new Platform(750, this.canvasHelper.GetCenter().Y + 280));
        this.platforms.push(new Platform(640, this.canvasHelper.GetCenter().Y + 240));
        this.platforms.push(new Platform(770, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(935, this.canvasHelper.GetCenter().Y + 170));
        this.platforms.push(new Platform(875, this.canvasHelper.GetCenter().Y + 280));
        this.spikes.push(new Spike(875, this.canvasHelper.GetCenter().Y + 265));
        this.platforms.push(new Platform(955, this.canvasHelper.GetCenter().Y + 300));
        this.spikes.push(new Spike(955, this.canvasHelper.GetCenter().Y + 285));
        this.platforms.push(new Platform(620, this.canvasHelper.GetCenter().Y + 170));
        this.platforms.push(new Platform(730, this.canvasHelper.GetCenter().Y + 130));
        this.platforms.push(new Platform(1040, this.canvasHelper.GetCenter().Y + 220));
        this.platforms.push(new Platform(1200, this.canvasHelper.GetCenter().Y + 270));
        this.platforms.push(new Platform(1350, this.canvasHelper.GetCenter().Y + 340));
        this.countryFlag = new Flag(1390, this.canvasHelper.GetCenter().Y + 265);
    }
    drawScreenQuiz() {
        this.canvasHelper.Clear();
        this.canvasHelper.ChangeScreen(EuropeQuiz.Instance());
    }
}
class EuropeQuiz extends ScreenQuiz {
    constructor() {
        super();
        this.drawWrongScreen = () => {
            this.canvasHelper.Clear();
            this.removeButtons();
            this.canvasHelper.ChangeScreen(new EuropeEndResult(false));
        };
        this.drawCorrectScreen = () => {
            this.canvasHelper.ChangeScreen(new EuropeEndResult(true));
        };
        console.log('this is EuropeQuiz');
        this.totalquestion = 3;
        this.imageLocations = [
            "./assets/questions/Europe1.png",
            './assets/questions/Europe2.png',
            './assets/questions/Europe3.png'
        ];
        this.qAndA = [
            {
                letter1: 'A',
                a1: ['Helsinki ', true],
                b1: ['Warschau', false],
                c1: ['Kopenhagen', false],
                letter2: 'B',
                a2: ['Londen ', true],
                b2: ['Berlijn', false],
                c2: ['Parijs', false],
                letter3: 'III',
                a3: ['Tsjechië ', true],
                b3: ['Slowakije', false],
                c3: ['Polen', false]
            },
            {
                letter1: 'A',
                a1: ['Praag ', true],
                b1: ['Wenen', false],
                c1: ['Bratislava', false],
                letter2: 'B',
                a2: ['Athene ', true],
                b2: ['Budapest', false],
                c2: ['Rome', false],
                letter3: 'c',
                a3: ['Rijn', true],
                b3: ['Wolga', false],
                c3: ['Noordzee', false]
            },
            {
                letter1: 'A',
                a1: ['Zwarte Zee', true],
                b1: ['Middellandse Zee', false],
                c1: ['Het Kanaal', false],
                letter2: 'II',
                a2: ['Zwitserland', true],
                b2: ['Oostenrijk', false],
                c2: ['Frankrijk', false],
                letter3: 'C',
                a3: ['Madrid', true],
                b3: ['Parijs', false],
                c3: ['Rome', false]
            }
        ];
    }
    static Instance() {
        if (this.instance == null) {
            this.instance = new EuropeQuiz();
        }
        return this.instance;
    }
    drawMap() {
        this.canvasHelper.writeImageFromFileToCanvas(`${this.imageLocations[this.currentQuestion]}`, 50, 100, 1000, 790);
    }
}
EuropeQuiz.instance = null;
class NetherlandsEndResult extends ScreenEndResult {
    constructor(correct) {
        super(correct);
        this.drawScreenLevel = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('drawScreenLevel');
            this.canvasHelper.ChangeScreen(new NetherlandsLevel);
        };
        this.drawNextLevelScreen = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('continue');
            this.canvasHelper.ChangeScreen(new NetherlandsLevel);
        };
        this.drawScreenHighScore = () => {
            console.log('To highscores');
            this.canvasHelper.Clear();
            this.screenQuiz.resetQuestion();
            this.canvasHelper.UnregisterClickListener('continue');
            this.screenHighScore.setCategory(0);
            this.canvasHelper.ChangeScreen(ScreenHighScore.Instance());
        };
        console.log('this is NetherlandsEndResult');
        this.screenQuiz = NetherlandsQuiz.Instance();
    }
}
class NetherlandsLevel extends ScreenLevel {
    constructor() {
        super();
        console.log('this is NetherlandsLevel');
        this.screenQuiz = NetherlandsQuiz.Instance();
        this.currentLevel = this.screenQuiz.getCurrentQuestion() + 1;
    }
    drawLevelOne() {
        this.player = new Player(70, this.canvasHelper.GetCenter().Y + 166);
        this.platforms.push(new Platform(70, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(150, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(240, this.canvasHelper.GetCenter().Y + 230));
        this.spikes.push(new Spike(240, this.canvasHelper.GetCenter().Y + 215));
        this.platforms.push(new Platform(330, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(440, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(550, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(640, this.canvasHelper.GetCenter().Y + 230));
        this.spikes.push(new Spike(640, this.canvasHelper.GetCenter().Y + 215));
        this.platforms.push(new Platform(720, this.canvasHelper.GetCenter().Y + 260));
        this.checkpoint = new Checkpoint(760, this.canvasHelper.GetCenter().Y + 185);
        this.platforms.push(new Platform(810, this.canvasHelper.GetCenter().Y + 230));
        this.platforms.push(new Platform(900, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(980, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(1060, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(1160, this.canvasHelper.GetCenter().Y + 230));
        this.spikes.push(new Spike(1160, this.canvasHelper.GetCenter().Y + 215));
        this.platforms.push(new Platform(1260, this.canvasHelper.GetCenter().Y + 240));
        this.countryFlag = new Flag(1300, this.canvasHelper.GetCenter().Y + 165, 0);
    }
    drawLevelTwo() {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y - 14);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 20));
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 50));
        this.platforms.push(new Platform(330, this.canvasHelper.GetCenter().Y + 120));
        this.spikes.push(new Spike(330, this.canvasHelper.GetCenter().Y + 105));
        this.platforms.push(new Platform(430, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(550, this.canvasHelper.GetCenter().Y + 190));
        this.platforms.push(new Platform(630, this.canvasHelper.GetCenter().Y + 225));
        this.spikes.push(new Spike(630, this.canvasHelper.GetCenter().Y + 210));
        this.platforms.push(new Platform(710, this.canvasHelper.GetCenter().Y + 250));
        this.platforms.push(new Platform(820, this.canvasHelper.GetCenter().Y + 210));
        this.platforms.push(new Platform(920, this.canvasHelper.GetCenter().Y + 175));
        this.checkpoint = new Checkpoint(950, this.canvasHelper.GetCenter().Y + 100);
        this.platforms.push(new Platform(990, this.canvasHelper.GetCenter().Y + 210));
        this.spikes.push(new Spike(990, this.canvasHelper.GetCenter().Y + 195));
        this.platforms.push(new Platform(1050, this.canvasHelper.GetCenter().Y + 250));
        this.platforms.push(new Platform(1130, this.canvasHelper.GetCenter().Y + 275));
        this.spikes.push(new Spike(1130, this.canvasHelper.GetCenter().Y + 260));
        this.platforms.push(new Platform(1210, this.canvasHelper.GetCenter().Y + 250));
        this.platforms.push(new Platform(1320, this.canvasHelper.GetCenter().Y + 220));
        this.platforms.push(new Platform(1480, this.canvasHelper.GetCenter().Y + 210));
        this.platforms.push(new Platform(1630, this.canvasHelper.GetCenter().Y + 200));
        this.countryFlag = new Flag(1670, this.canvasHelper.GetCenter().Y + 125, 0);
    }
    drawLevelThree() {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 388);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 420));
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 380));
        this.platforms.push(new Platform(310, this.canvasHelper.GetCenter().Y + 335));
        this.platforms.push(new Platform(400, this.canvasHelper.GetCenter().Y + 290));
        this.platforms.push(new Platform(530, this.canvasHelper.GetCenter().Y + 270));
        this.spikes.push(new Spike(530, this.canvasHelper.GetCenter().Y + 255));
        this.platforms.push(new Platform(530, this.canvasHelper.GetCenter().Y + 420));
        this.checkpoint = new Checkpoint(560, this.canvasHelper.GetCenter().Y + 345);
        this.platforms.push(new Platform(660, this.canvasHelper.GetCenter().Y + 400));
        this.platforms.push(new Platform(740, this.canvasHelper.GetCenter().Y + 360));
        this.platforms.push(new Platform(650, this.canvasHelper.GetCenter().Y + 320));
        this.platforms.push(new Platform(750, this.canvasHelper.GetCenter().Y + 280));
        this.platforms.push(new Platform(640, this.canvasHelper.GetCenter().Y + 240));
        this.platforms.push(new Platform(770, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(935, this.canvasHelper.GetCenter().Y + 170));
        this.platforms.push(new Platform(875, this.canvasHelper.GetCenter().Y + 280));
        this.spikes.push(new Spike(875, this.canvasHelper.GetCenter().Y + 265));
        this.platforms.push(new Platform(955, this.canvasHelper.GetCenter().Y + 300));
        this.spikes.push(new Spike(955, this.canvasHelper.GetCenter().Y + 285));
        this.platforms.push(new Platform(620, this.canvasHelper.GetCenter().Y + 170));
        this.platforms.push(new Platform(730, this.canvasHelper.GetCenter().Y + 130));
        this.platforms.push(new Platform(1040, this.canvasHelper.GetCenter().Y + 220));
        this.platforms.push(new Platform(1200, this.canvasHelper.GetCenter().Y + 270));
        this.platforms.push(new Platform(1350, this.canvasHelper.GetCenter().Y + 340));
        this.countryFlag = new Flag(1390, this.canvasHelper.GetCenter().Y + 265, 0);
    }
    drawScreenQuiz() {
        this.canvasHelper.Clear();
        this.canvasHelper.ChangeScreen(NetherlandsQuiz.Instance());
    }
}
class NetherlandsQuiz extends ScreenQuiz {
    constructor() {
        super();
        this.drawWrongScreen = () => {
            this.canvasHelper.Clear();
            this.removeButtons();
            this.canvasHelper.ChangeScreen(new NetherlandsEndResult(false));
        };
        this.drawCorrectScreen = () => {
            this.canvasHelper.ChangeScreen(new NetherlandsEndResult(true));
        };
        console.log('this is NetherlandsQuiz');
        this.totalquestion = 3;
        this.imageLocations = [
            "./assets/questions/Netherlands1.png",
            './assets/questions/Netherlands2.png',
            './assets/questions/Netherlands3.png'
        ];
        this.qAndA = [
            {
                letter1: 'A',
                a1: ['Arnhem', true],
                b1: ['Amersfoort', false],
                c1: ['Nijmegen', false],
                letter2: 'b',
                a2: ['Overijssel', true],
                b2: ['Drenthe', false],
                c2: ['Gelderland', false],
                letter3: 'C',
                a3: ['Haarlem', true],
                b3: ['Leiden', false],
                c3: ['Amsterdam', false]
            },
            {
                letter1: 'A',
                a1: ['Leeuwarden', true],
                b1: ['Groningen', false],
                c1: ['Assen', false],
                letter2: 'B',
                a2: ['Middelburg', true],
                b2: ['Den Haag', false],
                c2: ['Rotterdam', false],
                letter3: 'c',
                a3: ['Noord-Brabant', true],
                b3: ['Gelderland', false],
                c3: ['Limburg', false]
            },
            {
                letter1: 'A',
                a1: ['Lelystad', true],
                b1: ['Amsterdam', false],
                c1: ['Zwolle', false],
                letter2: 'b',
                a2: ['Zuid-Holland', true],
                b2: ['Zeeland', false],
                c2: ['Noord-Holland', false],
                letter3: 'C',
                a3: ['Maastricht', true],
                b3: ['Venlo', false],
                c3: ['Eindhoven', false]
            }
        ];
    }
    static Instance() {
        if (this.instance == null) {
            this.instance = new NetherlandsQuiz();
        }
        return this.instance;
    }
    drawMap() {
        this.canvasHelper.writeImageFromFileToCanvas(`${this.imageLocations[this.currentQuestion]}`, this.canvasHelper.GetCenter().X * 0.4, 100, 504, 597);
    }
}
NetherlandsQuiz.instance = null;
class Entity {
    constructor(xCoor, yCoor) {
        this.canvas = CanvasHelper.Instance();
        this.xPos = xCoor;
        this.yPos = yCoor;
    }
    draw() {
        if (this.image != null)
            this.canvas.writeImageToCanvas(this.image, this.xPos, this.yPos, this.width, this.height);
    }
    getX() {
        return this.xPos;
    }
    getY() {
        return this.yPos;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}
class Checkpoint extends Entity {
    constructor(xCoor, yCoor) {
        super(xCoor, yCoor);
        this.width = 55;
        this.height = 80;
        let img = new Image();
        img.addEventListener('load', () => {
            this.image = img;
        });
        img.src = './assets/images/flags/Surrender.png';
    }
}
class Flag extends Entity {
    constructor(xCoor, yCoor, continent = 1) {
        super(xCoor, yCoor);
        this.CanvasHelper = CanvasHelper.Instance();
        this.FlagEuropeArray = [
            "België",
            "Denemarken",
            "Duitsland",
            "Finland",
            "Frankrijk",
            "Italië",
            "Nederland",
            "Noorwegen",
            "Oekraïne",
            "Oostenrijk",
            "Polen",
            "Roemenië",
            "Zweden",
            "Zwitserland"
        ];
        this.MathHelper = this.CanvasHelper.randomNumber(0, this.FlagEuropeArray.length - 1);
        this.width = 55;
        this.height = 80;
        let img = new Image();
        img.addEventListener('load', () => {
            this.image = img;
        });
        if (continent == 0)
            img.src = './assets/images/flags/Nederland.png';
        if (continent == 1)
            img.src = `./assets/images/flags/${this.FlagEuropeArray[this.MathHelper]}.png`;
        if (continent == 2)
            img.src = './assets/images/flags/VerenigdeStaten.png';
        console.log(this.MathHelper);
    }
}
class Platform extends Entity {
    constructor(xCoor, yCoor) {
        super(xCoor, yCoor);
        this.width = 80;
        this.height = 25;
        let img = new Image();
        img.addEventListener('load', () => {
            this.image = img;
        });
        img.src = './assets/images/MovingPlatform_Long.png';
    }
}
class Player extends Entity {
    constructor(xCoor, yCoor) {
        super(xCoor, yCoor);
        this.jumpStart = 0;
        this.currentJump = 0;
        this.jumpEnd = 22;
        this.width = 20;
        this.height = 34;
        this.gravity = 3;
        this.startX = xCoor;
        this.startY = yCoor;
        let img = new Image();
        img.addEventListener('load', () => {
            this.image = img;
        });
        img.src = './assets/images/character/stand.png';
        this.keyboardListener = new KeyboardHelper();
    }
    resetPosition(xPos = -1, yPos = -1) {
        this.xPos = this.startX;
        this.yPos = this.startY;
    }
    updateStartPosition(xPos, yPos) {
        this.startX = xPos;
        this.startY = yPos;
    }
    move() {
        if (this.keyboardListener.getLeftPressed()) {
            this.xPos -= 3;
        }
        if (this.keyboardListener.getUpPressed()) {
            if (this.currentJump < this.jumpEnd) {
                this.yPos -= 2;
                this.currentJump++;
            }
            else {
                this.fall();
            }
        }
        else
            this.fall();
        if (this.keyboardListener.getRightPressed()) {
            this.xPos += 3;
        }
        if (this.getY() > this.canvas.GetHeight())
            this.resetPosition();
    }
    fall() {
        this.yPos += this.gravity;
        this.currentJump = this.jumpEnd;
    }
    stopFalling() {
        this.yPos -= this.gravity;
        this.currentJump = this.jumpStart;
    }
    platformCollision(platform) {
        if (this.getX() < platform.getX() + platform.getWidth() &&
            this.getX() + this.getWidth() > platform.getX() &&
            this.getY() + this.getHeight() > platform.getY() &&
            this.getY() + this.getHeight() < platform.getY() + 4) {
            return true;
        }
        return false;
    }
    entityCollision(entity) {
        if (this.getX() < entity.getX() + entity.getWidth() &&
            this.getX() + this.getWidth() > entity.getX() &&
            this.getY() < entity.getY() + entity.getHeight() &&
            this.getY() + this.getHeight() > entity.getY()) {
            return true;
        }
        return false;
    }
}
class Spike extends Entity {
    constructor(xCoor, yCoor) {
        super(xCoor, yCoor);
        this.width = 80;
        this.height = 20;
        let img = new Image();
        img.addEventListener('load', () => {
            this.image = img;
        });
        img.src = './assets/images/spikes/Spike_Group.png';
    }
}
class ButtonAction {
    constructor(x, y, h, w, fn) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.fn = fn;
    }
    ExecuteIfInArea(x, y) {
        if (x > this.x && x < this.x + this.w &&
            y > this.y && y < this.y + this.h) {
            this.fn();
        }
    }
}
class CanvasHelper {
    constructor(canvas) {
        this.clickCommands = new Map();
        this.ChangeScreen = (newScreen = null) => {
            if (newScreen == null) {
                return;
            }
            this.currentScreen = newScreen;
            this.currentScreen.draw();
        };
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');
        document.addEventListener('click', (event) => {
            this.OnClick(event);
        });
    }
    static Instance() {
        if (this.instance == null) {
            this.instance = new CanvasHelper(document.getElementById('canvas'));
        }
        return this.instance;
    }
    OnClick(Event) {
        let X = Event.x;
        let Y = Event.y;
        this.clickCommands.forEach((value, key) => {
            value.ExecuteIfInArea(X, Y);
        });
    }
    UnregisterClickListener(fnName) {
        this.clickCommands.delete(fnName);
    }
    Clear() {
        this.context.clearRect(0, 0, this.GetWidth(), this.GetHeight());
    }
    BeginUpdate() {
        this.context.save();
    }
    EndUpdate() {
        this.context.clip();
        this.context.restore();
    }
    GetCanvas() {
        return this.canvas;
    }
    GetCenter() {
        return { X: this.GetWidth() / 2, Y: this.GetHeight() / 2 };
    }
    GetHeight() {
        return this.canvas.height;
    }
    GetWidth() {
        return this.canvas.width;
    }
    writeTextToCanvas(text, fontSize, xpos, ypos, color = "black", alignment = "center") {
        this.context.font = `${fontSize}px Arial`;
        this.context.fillStyle = color;
        this.context.textAlign = alignment;
        this.context.fillText(text, xpos, ypos);
    }
    writeImageFromFileToCanvas(src, xpos, ypos, width, height) {
        let image = new Image();
        image.addEventListener('load', () => {
            this.context.drawImage(image, xpos, ypos, width, height);
        });
        image.src = src;
    }
    writeImageToCanvas(image, xpos, ypos, width, height) {
        this.context.drawImage(image, xpos, ypos, width, height);
    }
    writeButtonToCanvas(caption, fnName, fn, xpos = -1, ypos = -1, button = 0, fontSize = 20) {
        let buttonSource = [
            "./assets/images/buttonBlue.png",
            "./assets/images/correctButtonBlue.png"
        ];
        let buttonImage = new Image();
        buttonImage.src = `${buttonSource[button]}`;
        buttonImage.addEventListener('load', () => {
            let dx = xpos;
            let dy = ypos;
            if (dx < 0)
                dx = (this.GetWidth() - buttonImage.width) / 2;
            if (dy < 0)
                dy = this.GetHeight() / 2 + buttonImage.height;
            let fontX = dx + ((buttonImage.width + caption.length - 18) / 2);
            let fontY = dy + (buttonImage.height - 12);
            this.context.drawImage(buttonImage, dx, dy);
            this.writeTextToCanvas(caption, fontSize, fontX, fontY, '#000');
            if (fn != null) {
                this.clickCommands.set(fnName, new ButtonAction(dx, dy, buttonImage.height, buttonImage.width, fn));
            }
        });
    }
    drawBorder(xCoor, yCoor, width, height) {
        this.context.strokeRect(xCoor, yCoor, width, height);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
CanvasHelper.instance = null;
class KeyboardHelper {
    constructor() {
        this.keyDownHandler = (event) => {
            if (event.keyCode == 65 || event.keyCode == 37) {
                this.leftPressed = true;
            }
            if (event.keyCode == 32) {
                this.upPressed = true;
            }
            if (event.keyCode == 68 || event.keyCode == 39) {
                this.rightPressed = true;
            }
            if (event.keyCode == 83) {
                this.downPressed = true;
            }
        };
        this.keyUpHandler = (event) => {
            if (event.keyCode == 65 || event.keyCode == 37) {
                this.leftPressed = false;
            }
            if (event.keyCode == 32) {
                this.upPressed = false;
            }
            if (event.keyCode == 68 || event.keyCode == 39) {
                this.rightPressed = false;
            }
            if (event.keyCode == 83) {
                this.downPressed = false;
            }
        };
        this.leftPressed = false;
        this.upPressed = false;
        this.rightPressed = false;
        this.downPressed = false;
        window.addEventListener("keydown", this.keyDownHandler);
        window.addEventListener("keyup", this.keyUpHandler);
    }
    getLeftPressed() {
        return this.leftPressed;
    }
    getUpPressed() {
        return this.upPressed;
    }
    getRightPressed() {
        return this.rightPressed;
    }
    getdownPressed() {
        return this.downPressed;
    }
}
class TimeHelper {
    constructor() {
        this.minutes = 0;
        this.seconds = 0;
        this.score = 0;
    }
    static Instance() {
        if (this.instance == null) {
            this.instance = new TimeHelper();
        }
        return this.instance;
    }
    startTimer() {
        this.interval = setInterval(() => {
            if (this.seconds < 59) {
                this.seconds++;
                this.score++;
            }
            else {
                this.seconds = 0;
                this.minutes++;
                this.score++;
            }
        }, 1000);
    }
    pauseTimer() {
        clearInterval(this.interval);
    }
    stopTimer() {
    }
    resetTimer() {
        clearInterval(this.interval);
        this.minutes = 0;
        this.seconds = 0;
        this.score = 0;
    }
    getTime() {
        return { Minutes: this.minutes, Seconds: this.seconds };
    }
    getScore() {
        return this.score;
    }
}
TimeHelper.instance = null;
class ScreenHighScore extends ScreenBase {
    constructor() {
        super();
        this.europeHighscores = [
            600,
            600,
            600
        ];
        this.europeHighscoreText = [
            '10:00',
            '10:00',
            '10:00'
        ];
        this.americaHighscores = [
            600,
            600,
            600
        ];
        this.americaHighscoreText = [
            '10:00',
            '10:00',
            '10:00'
        ];
        this.netherlandsHighscores = [
            600,
            600,
            600
        ];
        this.netherlandsHighscoreText = [
            '10:00',
            '10:00',
            '10:00'
        ];
        this.category = 0;
        this.drawScreenLevelSelect = () => {
            this.canvasHelper.Clear();
            this.timer.resetTimer();
            this.canvasHelper.UnregisterClickListener('replay');
            this.canvasHelper.ChangeScreen(new ScreenLevelSelect);
        };
    }
    static Instance() {
        if (this.instance == null) {
            this.instance = new ScreenHighScore();
        }
        return this.instance;
    }
    setCategory(category) {
        this.category = category;
    }
    draw() {
        this.minutes = this.timer.getTime().Minutes;
        let score = this.timer.getScore();
        if (this.timer.getTime().Seconds < 10)
            this.seconds = `0${this.timer.getTime().Seconds}`;
        else
            this.seconds = `${this.timer.getTime().Seconds}`;
        this.canvasHelper.writeTextToCanvas('Highscores', 50, this.canvasHelper.GetCenter().X, 100);
        if (this.category == 0) {
            var continent = 'Nederland';
            var highscores = this.netherlandsHighscores;
            var highscoreText = this.netherlandsHighscoreText;
        }
        else if (this.category == 1) {
            var continent = 'Noord-Amerika';
            var highscores = this.americaHighscores;
            var highscoreText = this.americaHighscoreText;
        }
        else if (this.category == 2) {
            var continent = 'Europa';
            var highscores = this.europeHighscores;
            var highscoreText = this.europeHighscoreText;
        }
        this.canvasHelper.writeTextToCanvas(`Jij hebt ${continent} voltooid in:`, 35, this.canvasHelper.GetCenter().X, 200);
        this.canvasHelper.writeTextToCanvas(`${this.minutes}:${this.seconds}`, 30, this.canvasHelper.GetCenter().X, 250);
        this.canvasHelper.writeTextToCanvas('De best behaalde tijden zijn:', 35, this.canvasHelper.GetCenter().X, 350);
        console.log(this.category, highscores);
        if (highscores[0] > score) {
            highscores[2] = highscores[1];
            highscoreText[2] = highscoreText[1];
            highscores[1] = highscores[0];
            highscoreText[1] = highscoreText[0];
            highscores[0] = score;
            highscoreText[0] = `${this.minutes}:${this.seconds}`;
        }
        else if (highscores[1] > score) {
            highscores[2] = highscores[1];
            highscoreText[2] = highscoreText[1];
            highscores[1] = score;
            highscoreText[1] = `${this.minutes}:${this.seconds}`;
        }
        else if (highscores[2] > score) {
            highscores[2] = score;
            highscoreText[2] = `${this.minutes}:${this.seconds}`;
        }
        this.drawNetherlandsHighscores();
        this.drawEuropeHighscores();
        this.drawAmericaHighscores();
        this.canvasHelper.writeButtonToCanvas('Speel opnieuw', 'replay', this.drawScreenLevelSelect, undefined, this.canvasHelper.GetHeight() * 0.9);
    }
    drawNetherlandsHighscores() {
        let center = this.canvasHelper.GetCenter();
        this.canvasHelper.writeTextToCanvas('Nederland', 40, this.canvasHelper.GetWidth() * 0.25, center.Y);
        this.netherlandsHighscoreText.forEach((element, index) => {
            center.Y += 80;
            this.canvasHelper.writeTextToCanvas(`${index + 1}\u1D49\ plaats: ${element}`, 30, this.canvasHelper.GetWidth() * 0.25, center.Y);
        });
    }
    drawEuropeHighscores() {
        let center = this.canvasHelper.GetCenter();
        this.canvasHelper.writeTextToCanvas('Europa', 40, center.X, center.Y);
        this.europeHighscoreText.forEach((element, index) => {
            center.Y += 80;
            this.canvasHelper.writeTextToCanvas(`${index + 1}\u1D49\ plaats: ${element}`, 30, center.X, center.Y);
        });
    }
    drawAmericaHighscores() {
        let center = this.canvasHelper.GetCenter();
        this.canvasHelper.writeTextToCanvas('Noord-Amerika', 40, this.canvasHelper.GetWidth() * 0.75, center.Y);
        this.americaHighscoreText.forEach((element, index) => {
            center.Y += 80;
            this.canvasHelper.writeTextToCanvas(`${index + 1}\u1D49\ plaats: ${element}`, 30, this.canvasHelper.GetWidth() * 0.75, center.Y);
        });
    }
}
ScreenHighScore.instance = null;
class ScreenLevelSelect extends ScreenBase {
    constructor() {
        super();
        this.continents = [{
                netherlands: './assets/images/maps/Nederland-kaart-transparant.png',
                europe: './assets/images/maps/Europa-transparant.png',
                northAmerica: './assets/images/maps/Noord-Amerika-Transparant.png'
            }];
        this.unTravelLogo = "./assets/images/logo.png";
        this.drawNetherlandsLevel = () => {
            console.log('Netherlands selected.');
            this.removeButtons();
            this.canvasHelper.ChangeScreen(new NetherlandsLevel);
        };
        this.drawEuropeLevel = () => {
            console.log('Europe selected.');
            this.removeButtons();
            this.canvasHelper.ChangeScreen(new EuropeLevel);
        };
        this.drawAmericaLevel = () => {
            console.log('North America selected');
            this.removeButtons();
            this.canvasHelper.ChangeScreen(new AmericaLevel);
        };
        this.removeButtons = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('StartNetherlands');
            this.canvasHelper.UnregisterClickListener('StartEurope');
            this.canvasHelper.UnregisterClickListener('StartAmerica');
        };
        this.canvasHelper.ChangeScreen();
    }
    draw() {
        this.canvasHelper.writeImageFromFileToCanvas(this.unTravelLogo, this.canvasHelper.GetCenter().X - 150, 20, 300, 300);
        this.canvasHelper.writeTextToCanvas('Selecteer een groep', 25, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y / 3 + 200);
        this.canvasHelper.writeImageFromFileToCanvas(this.continents[0].netherlands, this.canvasHelper.GetWidth() * 0.12, this.canvasHelper.GetCenter().Y - 80, 295, 350);
        this.canvasHelper.writeButtonToCanvas("Groep 6: Nederland", 'StartNetherlands', this.drawNetherlandsLevel, this.canvasHelper.GetWidth() * 0.12, this.canvasHelper.GetCenter().Y + 300, undefined, 19);
        this.canvasHelper.writeImageFromFileToCanvas(this.continents[0].europe, this.canvasHelper.GetWidth() * 0.4 - 50, this.canvasHelper.GetCenter().Y - 50, 380, 300);
        this.canvasHelper.writeButtonToCanvas("Groep 7: Europa", 'StartEurope', this.drawEuropeLevel, this.canvasHelper.GetWidth() * 0.4 + 60, this.canvasHelper.GetCenter().Y + 300, undefined, 19);
        this.canvasHelper.writeImageFromFileToCanvas(this.continents[0].northAmerica, this.canvasHelper.GetWidth() * 0.7 - 100, this.canvasHelper.GetCenter().Y - 80, 355, 350);
        this.canvasHelper.writeButtonToCanvas("Groep 8: Noord-Amerika", 'StartAmerica', this.drawAmericaLevel, this.canvasHelper.GetWidth() * 0.7, this.canvasHelper.GetCenter().Y + 300, undefined, 19);
        this.canvasHelper.writeTextToCanvas("Besturing", 30, 30, 40, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Links: A / pijltjestoets links", 20, 30, 70, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Rechts: D / pijltjestoets rechts", 20, 30, 100, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Springen: Spatiebalk (ingedrukt houden)", 20, 30, 130, undefined, "left");
        this.canvasHelper.drawBorder(0, 10, 400, 130);
    }
}
//# sourceMappingURL=app.js.map