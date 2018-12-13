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
        this.canvas.writeImageFromFileToCanvas(this.imageSrc, this.xPos, this.yPos, this.width, this.height);
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
class Platform extends Entity {
    constructor(xCoor, yCoor) {
        super(xCoor, yCoor);
        this.imageSrc = './assets/images/MovingPlatform_Long.png';
        this.width = 60;
        this.height = 25;
    }
}
class Player extends Entity {
    constructor(xCoor, yCoor) {
        super(xCoor, yCoor);
        this.imageSrc = './assets/images/character/stand.png';
        this.width = 12;
        this.height = 20;
        this.keyboardListener = new KeyboardHelper();
    }
    move() {
        if (this.keyboardListener.getLeftPressed()) {
            this.xPos -= 4;
        }
        if (this.keyboardListener.getUpPressed()) {
            this.yPos -= 4;
        }
        if (this.keyboardListener.getRightPressed()) {
            this.xPos += 4;
        }
        if (this.keyboardListener.getdownPressed()) {
            this.yPos += 4;
        }
    }
    collisionDetection(enemy) {
        if (this.getX() < enemy.getX() + enemy.getWidth() &&
            this.getX() + this.getWidth() > enemy.getX() &&
            this.getY() < enemy.getY() + enemy.getHeight() &&
            this.getY() + this.getHeight() > enemy.getY()) {
            return true;
        }
        return false;
    }
}
class Spike extends Entity {
    constructor(xCoor, yCoor) {
        super(xCoor, yCoor);
        this.imageSrc = './assets/images/spikes/Spike_Group.png';
        this.width = 20;
        this.height = 30;
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
    writeImageToCanvas(image, xpos, ypos) {
        this.context.drawImage(image, xpos, ypos);
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
}
CanvasHelper.instance = null;
class KeyboardHelper {
    constructor() {
        this.keyDownHandler = (event) => {
            if (event.keyCode == 65) {
                this.leftPressed = true;
            }
            if (event.keyCode == 87) {
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
            if (event.keyCode == 87) {
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
            if (this.seconds < 60) {
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
    }
    draw() {
    }
    drawScreenHighScore() {
        this.canvasHelper.Clear();
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
        this.drawPlayer = () => {
            console.log("This is ScreenLevel speaking.");
            this.player.draw();
            this.player.move();
            this.spikes.forEach((element) => {
                element.draw();
            });
            this.platforms.forEach((element) => {
                element.draw();
            });
            this.canvasHelper.Clear();
        };
        this.player = new Player(400, 400);
        this.spikes.push(new Spike(this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y));
        this.platforms.push(new Platform(this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y));
    }
    draw() {
        window.setInterval(this.drawPlayer, 1000 / 30);
    }
    drawScreenQuiz() {
        this.canvasHelper.Clear();
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
    }
    draw() {
    }
    checkAnswer() {
    }
    drawScreenLevel() {
        this.canvasHelper.Clear();
    }
}
//# sourceMappingURL=app.js.map