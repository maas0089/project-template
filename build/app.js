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
        this.jumpEnd = 18;
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
    writeButtonToCanvas(caption, fnName, fn, xpos = -1, ypos = -1) {
        let buttonImage = new Image();
        buttonImage.src = "./assets/images//buttonBlue.png";
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
    }
    static Instance() {
        if (this.instance == null) {
            this.instance = new TimeHelper();
        }
        return this.instance;
    }
    startTimer() {
        let interval = setInterval(() => {
            if (this.seconds < 59) {
                this.seconds++;
            }
            else {
                this.seconds = 0;
                this.minutes++;
            }
        }, 1000);
    }
    pauseTimer() {
    }
    stopTimer() {
    }
    resetTimer() {
        this.minutes = 0;
        this.seconds = 0;
    }
    getTime() {
        return { Minutes: this.minutes, Seconds: this.seconds };
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
        this.drawScreenHighScore = () => {
            this.canvasHelper.Clear();
            this.canvasHelper.UnregisterClickListener('back');
            this.canvasHelper.ChangeScreen(new ScreenQuiz);
        };
    }
    draw() {
        this.canvasHelper.writeTextToCanvas('END SCREEN', 50, this.canvasHelper.GetCenter().X, 50);
        this.canvasHelper.writeButtonToCanvas('Back', 'back', this.drawScreenHighScore, undefined, undefined);
    }
}
class ScreenHighScore extends ScreenBase {
    constructor() {
        super();
    }
    draw() {
    }
    drawScreenLevelSelect() {
        this.canvasHelper.Clear();
    }
}
class ScreenLevel extends ScreenBase {
    constructor() {
        super();
        this.spikes = new Array();
        this.platforms = new Array();
        this.drawScreenLevel = () => {
            let time = this.timer.getTime();
            this.canvasHelper.BeginUpdate();
            this.canvasHelper.Clear();
            if (time.Seconds < 10)
                this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:0${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, 50, 'black');
            else
                this.canvasHelper.writeTextToCanvas(`Tijd ${time.Minutes}:${time.Seconds}`, 20, this.canvasHelper.GetCenter().X, 50, 'black');
            this.controlsInstructions();
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
        this.player = new Player(100, this.canvasHelper.GetCenter().Y - 20);
        this.platforms.push(new Platform(100, this.canvasHelper.GetCenter().Y));
        this.platforms.push(new Platform(250, this.canvasHelper.GetCenter().Y - 10));
        this.platforms.push(new Platform(180, this.canvasHelper.GetCenter().Y + 40));
        this.spikes.push(new Spike(180, this.canvasHelper.GetCenter().Y + 25));
        this.platforms.push(new Platform(380, this.canvasHelper.GetCenter().Y + 60));
        this.platforms.push(new Platform(470, this.canvasHelper.GetCenter().Y + 120));
        this.spikes.push(new Spike(470, this.canvasHelper.GetCenter().Y + 105));
        this.platforms.push(new Platform(600, this.canvasHelper.GetCenter().Y + 160));
        this.platforms.push(new Platform(760, this.canvasHelper.GetCenter().Y + 180));
        this.platforms.push(new Platform(860, this.canvasHelper.GetCenter().Y + 140));
        this.platforms.push(new Platform(960, this.canvasHelper.GetCenter().Y + 100));
        this.platforms.push(new Platform(1060, this.canvasHelper.GetCenter().Y + 60));
        this.platforms.push(new Platform(1200, this.canvasHelper.GetCenter().Y + 200));
        this.spikes.push(new Spike(1200, this.canvasHelper.GetCenter().Y + 185));
        this.platforms.push(new Platform(1300, this.canvasHelper.GetCenter().Y + 140));
        this.countryFlag = new Flag(1340, this.canvasHelper.GetCenter().Y + 65);
    }
    draw() {
        console.log("This is ScreenLevel speaking.");
        this.timer.startTimer();
        this.drawScreenLevel();
    }
    controlsInstructions() {
        this.canvasHelper.writeTextToCanvas("Links: A", 20, 30, 50, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Rechts: D", 20, 30, 80, undefined, "left");
        this.canvasHelper.writeTextToCanvas("Springen: Spatiebalk (ingedrukt houden)", 20, 30, 110, undefined, "left");
        this.canvasHelper.drawBorder(0, 0, 400, 120);
    }
    drawScreenQuiz() {
        this.canvasHelper.Clear();
        this.canvasHelper.ChangeScreen(new ScreenQuiz());
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
        this.canvasHelper.writeButtonToCanvas("Play", 'StartGameCommand', this.drawScreenLevel, undefined, this.canvasHelper.GetCenter().Y + 200);
    }
}
class ScreenQuiz extends ScreenBase {
    constructor() {
        super();
        this.correct = 0;
        this.checkAnswer = () => {
            console.log('Correct!');
            this.correct++;
            if (this.correct == 3)
                this.drawScreenEndResult();
        };
        this.drawScreenLevel = () => {
            this.canvasHelper.Clear();
            this.removeButtons();
            this.canvasHelper.ChangeScreen(new ScreenLevel);
        };
        this.drawScreenEndResult = () => {
            this.canvasHelper.Clear();
            this.removeButtons();
            this.canvasHelper.ChangeScreen(new ScreenEndResult);
        };
        this.removeButtons = () => {
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
    draw() {
        this.canvasHelper.writeTextToCanvas('Wat ligt hier?', 50, this.canvasHelper.GetCenter().X, 50);
        this.canvasHelper.writeButtonToCanvas('1A', 'startGame1', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 100);
        this.canvasHelper.writeButtonToCanvas('1B', 'startGame2', this.checkAnswer, this.canvasHelper.GetWidth() * 0.6, 150);
        this.canvasHelper.writeButtonToCanvas('1C', 'startGame3', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 200);
        this.canvasHelper.writeButtonToCanvas('2A', 'startGame4', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 300);
        this.canvasHelper.writeButtonToCanvas('2B', 'startGame5', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 350);
        this.canvasHelper.writeButtonToCanvas('2C', 'startGame6', this.checkAnswer, this.canvasHelper.GetWidth() * 0.6, 400);
        this.canvasHelper.writeButtonToCanvas('3A', 'startGame7', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 500);
        this.canvasHelper.writeButtonToCanvas('3B', 'startGame8', this.checkAnswer, this.canvasHelper.GetWidth() * 0.6, 550);
        this.canvasHelper.writeButtonToCanvas('3C', 'startGame9', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 600);
    }
}
//# sourceMappingURL=app.js.map