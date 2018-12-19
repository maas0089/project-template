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
class Flag extends Entity {
    constructor(xCoor, yCoor) {
        super(xCoor, yCoor);
        this.width = 55;
        this.height = 80;
        let img = new Image();
        img.addEventListener('load', () => {
            this.image = img;
        });
        img.src = './assets/images/flags/Nederland.png';
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
        this.width = 12;
        this.height = 20;
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
    resetPosition() {
        this.xPos = this.startX;
        this.yPos = this.startY;
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
    writeButtonToCanvas(caption, fnName, fn, xpos = -1, ypos = -1, button = 0) {
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
            this.writeTextToCanvas(caption, 20, fontX, fontY, '#000');
            if (fn != null) {
                this.clickCommands.set(fnName, new ButtonAction(dx, dy, buttonImage.height, buttonImage.width, fn));
            }
        });
    }
    drawBorder(xCoor, yCoor, width, height) {
        this.context.strokeRect(xCoor, yCoor, width, height);
    }
}
CanvasHelper.instance = null;
class KeyboardHelper {
    constructor() {
        this.keyDownHandler = (event) => {
            if (event.keyCode == 65) {
                this.leftPressed = true;
            }
            if (event.keyCode == 32) {
                this.upPressed = true;
            }
            if (event.keyCode == 68) {
                this.rightPressed = true;
            }
            if (event.keyCode == 83) {
                this.downPressed = true;
            }
        };
        this.keyUpHandler = (event) => {
            if (event.keyCode == 65) {
                this.leftPressed = false;
            }
            if (event.keyCode == 32) {
                this.upPressed = false;
            }
            if (event.keyCode == 68) {
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
class ScreenBase {
    constructor() {
        this.canvasHelper = CanvasHelper.Instance();
        this.timer = TimeHelper.Instance();
    }
}
class ScreenEndResult extends ScreenBase {
    constructor() {
        super();
        this.screenQuiz = ScreenQuiz.Instance();
        this.drawNextLevelScreen = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('continue');
            this.canvasHelper.ChangeScreen(new ScreenLevel);
        };
        this.drawScreenHighScore = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('continue');
            this.canvasHelper.ChangeScreen(ScreenHighScore.Instance());
        };
    }
    draw() {
        let time = this.timer.getTime();
        this.canvasHelper.writeTextToCanvas('Level voltooid!', 50, this.canvasHelper.GetCenter().X, 100);
        this.canvasHelper.writeTextToCanvas('Tijd:', 30, this.canvasHelper.GetCenter().X, 250);
        if (time.Seconds < 10)
            this.canvasHelper.writeTextToCanvas(` ${time.Minutes}:0${time.Seconds}`, 30, this.canvasHelper.GetCenter().X, 350, 'black');
        else
            this.canvasHelper.writeTextToCanvas(` ${time.Minutes}:${time.Seconds}`, 30, this.canvasHelper.GetCenter().X, 350, 'black');
        if (this.screenQuiz.getCurrentQuestion() > this.screenQuiz.getMaxQuestion())
            this.canvasHelper.writeButtonToCanvas('Highscores', 'continue', this.drawScreenHighScore, undefined, undefined);
        else
            this.canvasHelper.writeButtonToCanvas('Volgend level', 'continue', this.drawNextLevelScreen, undefined, undefined);
    }
}
class ScreenHighScore extends ScreenBase {
    constructor() {
        super();
        this.screenQuiz = ScreenQuiz.Instance();
        this.highscores = [
            600,
            600,
            600
        ];
        this.highscoreText = [
            '10:00',
            '10:00',
            '10:00'
        ];
        this.drawScreenLevelSelect = () => {
            this.canvasHelper.Clear();
            this.timer.resetTimer();
            this.screenQuiz.resetQuestion();
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
    draw() {
        this.minutes = this.timer.getTime().Minutes;
        if (this.timer.getTime().Seconds < 10)
            this.seconds = `0${this.timer.getTime().Seconds}`;
        else
            this.seconds = `${this.timer.getTime().Seconds}`;
        if (this.timer.getTime().Seconds < 10) {
            let seconds = `0${this.timer.getTime().Seconds}`;
        }
        let score = this.timer.getScore();
        let center = this.canvasHelper.GetCenter();
        this.canvasHelper.writeTextToCanvas('Highscores', 50, this.canvasHelper.GetCenter().X, 100);
        if (this.highscores[0] > score) {
            this.highscores[2] = this.highscores[1];
            this.highscoreText[2] = this.highscoreText[1];
            this.highscores[1] = this.highscores[0];
            this.highscoreText[1] = this.highscoreText[0];
            this.highscores[0] = score;
            this.highscoreText[0] = `${this.minutes}:${this.seconds}`;
        }
        else if (this.highscores[1] > score) {
            this.highscores[2] = this.highscores[1];
            this.highscoreText[2] = this.highscoreText[1];
            this.highscores[1] = score;
            this.highscoreText[1] = `${this.minutes}:${this.seconds}`;
        }
        else if (this.highscores[2] > score) {
            this.highscores[2] = score;
            this.highscoreText[2] = `${this.minutes}:${this.seconds}`;
        }
        this.highscoreText.forEach((element, index) => {
            center.Y += 80;
            this.canvasHelper.writeTextToCanvas(`${index + 1}: ${element}`, 40, center.X, center.Y - 100);
        });
        this.canvasHelper.writeButtonToCanvas('Speel opnieuw', 'replay', this.drawScreenLevelSelect, undefined, this.canvasHelper.GetHeight() * 0.9);
    }
}
ScreenHighScore.instance = null;
class ScreenLevel extends ScreenBase {
    constructor() {
        super();
        this.spikes = new Array();
        this.platforms = new Array();
        this.screenQuiz = ScreenQuiz.Instance();
        this.currentLevel = this.screenQuiz.getCurrentQuestion() + 1;
        this.drawScreenLevel = () => {
            let time = this.timer.getTime();
            this.canvasHelper.BeginUpdate();
            this.canvasHelper.Clear();
            if (time.Seconds < 10)
                this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:0${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, 50, 'black');
            else
                this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, 50, 'black');
            this.controlsInstructions();
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
    drawLevelOne() {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 180);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(250, this.canvasHelper.GetCenter().Y + 190));
        this.platforms.push(new Platform(180, this.canvasHelper.GetCenter().Y + 240));
        this.spikes.push(new Spike(180, this.canvasHelper.GetCenter().Y + 225));
        this.platforms.push(new Platform(380, this.canvasHelper.GetCenter().Y + 260));
        this.platforms.push(new Platform(470, this.canvasHelper.GetCenter().Y + 320));
        this.spikes.push(new Spike(470, this.canvasHelper.GetCenter().Y + 305));
        this.platforms.push(new Platform(600, this.canvasHelper.GetCenter().Y + 360));
        this.platforms.push(new Platform(760, this.canvasHelper.GetCenter().Y + 380));
        this.platforms.push(new Platform(860, this.canvasHelper.GetCenter().Y + 340));
        this.platforms.push(new Platform(960, this.canvasHelper.GetCenter().Y + 300));
        this.platforms.push(new Platform(1060, this.canvasHelper.GetCenter().Y + 260));
        this.platforms.push(new Platform(1200, this.canvasHelper.GetCenter().Y + 400));
        this.spikes.push(new Spike(1200, this.canvasHelper.GetCenter().Y + 385));
        this.platforms.push(new Platform(1300, this.canvasHelper.GetCenter().Y + 340));
        this.countryFlag = new Flag(1340, this.canvasHelper.GetCenter().Y + 265);
    }
    drawLevelTwo() {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 20));
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 50));
        this.platforms.push(new Platform(330, this.canvasHelper.GetCenter().Y + 120));
        this.spikes.push(new Spike(330, this.canvasHelper.GetCenter().Y + 105));
        this.platforms.push(new Platform(430, this.canvasHelper.GetCenter().Y + 200));
        this.platforms.push(new Platform(550, this.canvasHelper.GetCenter().Y + 190));
        this.platforms.push(new Platform(630, this.canvasHelper.GetCenter().Y + 225));
        this.spikes.push(new Spike(630, this.canvasHelper.GetCenter().Y + 210));
        this.platforms.push(new Platform(710, this.canvasHelper.GetCenter().Y + 250));
        this.platforms.push(new Platform(950, this.canvasHelper.GetCenter().Y + 360));
        this.platforms.push(new Platform(1100, this.canvasHelper.GetCenter().Y + 350));
        this.platforms.push(new Platform(1250, this.canvasHelper.GetCenter().Y + 340));
        this.countryFlag = new Flag(1290, this.canvasHelper.GetCenter().Y + 265);
    }
    drawLevelThree() {
        this.player = new Player(100, this.canvasHelper.GetCenter().Y + 400);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y + 420));
        this.platforms.push(new Platform(200, this.canvasHelper.GetCenter().Y + 380));
        this.platforms.push(new Platform(310, this.canvasHelper.GetCenter().Y + 335));
        this.platforms.push(new Platform(400, this.canvasHelper.GetCenter().Y + 290));
        this.platforms.push(new Platform(500, this.canvasHelper.GetCenter().Y + 270));
        this.spikes.push(new Spike(500, this.canvasHelper.GetCenter().Y + 255));
        this.platforms.push(new Platform(510, this.canvasHelper.GetCenter().Y + 400));
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
        this.platforms.push(new Platform(1190, this.canvasHelper.GetCenter().Y + 270));
        this.platforms.push(new Platform(1350, this.canvasHelper.GetCenter().Y + 340));
        this.countryFlag = new Flag(1390, this.canvasHelper.GetCenter().Y + 265);
    }
    controlsInstructions() {
        this.canvasHelper.writeTextToCanvas("Links: A", 20, 30, 25, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Rechts: D", 20, 30, 55, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Springen: Spatiebalk (ingedrukt houden)", 20, 30, 85, undefined, "left");
        this.canvasHelper.drawBorder(0, 0, 400, 95);
    }
    drawScreenQuiz() {
        this.canvasHelper.Clear();
        this.canvasHelper.ChangeScreen(ScreenQuiz.Instance());
    }
}
class ScreenLevelSelect extends ScreenBase {
    constructor() {
        super();
        this.drawScreenLevel = () => {
            console.log('click');
            this.canvasHelper.UnregisterClickListener('StartGameCommand');
            this.canvasHelper.Clear();
            this.canvasHelper.ChangeScreen(new ScreenLevel());
        };
        this.canvasHelper.ChangeScreen();
    }
    draw() {
        this.canvasHelper.writeTextToCanvas('UNtRAVEL', 50, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y / 3);
        this.canvasHelper.writeImageFromFileToCanvas('./assets/images/maps/Europa-kaart.png', this.canvasHelper.GetCenter().X - 65, this.canvasHelper.GetCenter().Y - 65, 130, 130);
        this.canvasHelper.writeButtonToCanvas("Start", 'StartGameCommand', this.drawScreenLevel, undefined, this.canvasHelper.GetCenter().Y + 200);
    }
}
class ScreenQuiz extends ScreenBase {
    constructor() {
        super();
        this.question = 0;
        this.firstAnswer = 0;
        this.secondAnswer = 0;
        this.thirdAnswer = 0;
        this.imageLocations = [
            "./assets/questions/Netherlands1.png",
            './assets/questions/Netherlands2.png',
            './assets/questions/Netherlands3.png'
        ];
        this.totalquestion = this.imageLocations.length - 1;
        this.qAndA = [
            {
                a1: 'Arnhem',
                b1: 'Amersfoort',
                c1: 'Nijmegen',
                a2: 'Gelderland',
                b2: 'Drenthe',
                c2: 'Overijssel',
                a3: 'Amsterdam',
                b3: 'Leiden',
                c3: 'Haarlem'
            },
            {
                a1: 'Leeuwarden',
                b1: 'Groningen',
                c1: 'Assen',
                a2: 'Rotterdam',
                b2: 'Den Haag',
                c2: 'Middelburg',
                a3: 'Limburg',
                b3: 'Gelderland',
                c3: 'Noord-Brabant'
            },
            {
                a1: 'Lelystad',
                b1: 'Amsterdam',
                c1: 'Zwolle',
                a2: 'Noord-Holland',
                b2: 'Zeeland',
                c2: 'Zuid-Holland',
                a3: 'Eindhoven',
                b3: 'Venlo',
                c3: 'Maastricht'
            }
        ];
        this.checkAnswerOne = () => {
            console.log('Correct!');
            this.firstAnswer = 1;
            this.removeButtons();
            if (this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1)
                this.drawScreenEndResult();
            else
                this.drawScreenQuiz();
        };
        this.checkAnswerTwo = () => {
            console.log('Correct!');
            this.secondAnswer = 1;
            this.removeButtons();
            if (this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1)
                this.drawScreenEndResult();
            else
                this.drawScreenQuiz();
        };
        this.checkAnswerThree = () => {
            console.log('Correct!');
            this.thirdAnswer = 1;
            this.removeButtons();
            if (this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1)
                this.drawScreenEndResult();
            else
                this.drawScreenQuiz();
        };
        this.drawScreenLevel = () => {
            this.canvasHelper.Clear();
            this.removeButtons();
            this.canvasHelper.ChangeScreen(new ScreenLevel);
        };
        this.drawScreenEndResult = () => {
            this.canvasHelper.Clear();
            this.removeButtons();
            this.question++;
            this.firstAnswer = 0;
            this.secondAnswer = 0;
            this.thirdAnswer = 0;
            this.canvasHelper.ChangeScreen(new ScreenEndResult);
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
    static Instance() {
        if (this.instance == null) {
            this.instance = new ScreenQuiz();
        }
        return this.instance;
    }
    draw() {
        this.drawScreenQuiz();
    }
    drawScreenQuiz() {
        this.timer.pauseTimer();
        this.canvasHelper.writeTextToCanvas('Wat ligt hier?', 50, this.canvasHelper.GetCenter().X, 50);
        this.canvasHelper.writeImageFromFileToCanvas(`${this.imageLocations[this.question]}`, 350, 100, 504, 597);
        this.canvasHelper.writeTextToCanvas("A", 20, this.canvasHelper.GetWidth() * 0.59, 125, "red");
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].a1}`, 'startGame1', this.checkAnswerOne, this.canvasHelper.GetWidth() * 0.6, 100, this.firstAnswer);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].b1}`, 'startGame2', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 150);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].c1}`, 'startGame3', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 200);
        this.canvasHelper.writeTextToCanvas("B", 20, this.canvasHelper.GetWidth() * 0.59, 325, "red");
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].a2}`, 'startGame4', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 300);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].b2}`, 'startGame5', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 350);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].c2}`, 'startGame6', this.checkAnswerTwo, this.canvasHelper.GetWidth() * 0.6, 400, this.secondAnswer);
        this.canvasHelper.writeTextToCanvas("C", 20, this.canvasHelper.GetWidth() * 0.59, 525, "red");
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].a3}`, 'startGame7', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 500);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].b3}`, 'startGame8', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 550);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].c3}`, 'startGame9', this.checkAnswerThree, this.canvasHelper.GetWidth() * 0.6, 600, this.thirdAnswer);
    }
    resetQuestion() {
        this.question = 0;
    }
    getCurrentQuestion() {
        return this.question;
    }
    getMaxQuestion() {
        return this.totalquestion;
    }
}
ScreenQuiz.instance = null;
//# sourceMappingURL=app.js.map