class Entity {
    constructor(canvas, imageSource, xCoor, yCoor, width, height) {
        this.canvas = CanvasHelper.Instance(canvas);
        this.imageSrc = imageSource;
        this.xPos = xCoor;
        this.yPos = yCoor;
        this.width = width;
        this.height = height;
    }
    draw() {
        this.canvas.writeImageFromFileToCanvas(this.imageSrc, this.xPos, this.yPos);
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
    constructor(canvas, imageSource, xCoor, yCoor, width, height) {
        super(canvas, imageSource, xCoor, yCoor, width, height);
    }
}
class Player extends Entity {
    constructor(canvas, imageSource, xCoor, yCoor, width, height) {
        super(canvas, imageSource, xCoor, yCoor, width, height);
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
    constructor(canvas, imageSource, xCoor, yCoor, width, height) {
        super(canvas, imageSource, xCoor, yCoor, width, height);
    }
}
class CanvasHelper {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');
    }
    static Instance(canvas) {
        if (this.instance == null) {
            this.instance = new CanvasHelper(canvas);
        }
        return this.instance;
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
    writeTextToCanvas(text, fontSize, xpos, ypos, color = "white", alignment = "center") {
        this.context.font = `${fontSize}px Arial`;
        this.context.fillStyle = color;
        this.context.textAlign = alignment;
        this.context.fillText(text, xpos, ypos);
    }
    writeImageFromFileToCanvas(src, xpos, ypos) {
        let image = new Image();
        image.addEventListener('load', () => {
            this.context.drawImage(image, xpos, ypos);
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
        });
    }
}
CanvasHelper.instance = null;
class KeyboardHelper {
    constructor() {
        this.keyDownHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = true;
            }
            if (event.keyCode == 38) {
                this.upPressed = true;
            }
            if (event.keyCode == 39) {
                this.rightPressed = true;
            }
            if (event.keyCode == 40) {
                this.downPressed = true;
            }
        };
        this.keyUpHandler = (event) => {
            if (event.keyCode == 37) {
                this.leftPressed = false;
            }
            if (event.keyCode == 38) {
                this.upPressed = false;
            }
            if (event.keyCode == 39) {
                this.rightPressed = false;
            }
            if (event.keyCode == 40) {
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
    constructor(canvas) {
        this.canvasHelper = CanvasHelper.Instance(canvas);
        this.timer = TimeHelper.Instance();
    }
}
class ScreenEndResult extends ScreenBase {
    constructor(canvas) {
        super(canvas);
        this.screenHighScore = new ScreenHighScore(canvas);
    }
    draw() {
    }
    drawScreenHighScore() {
        this.canvasHelper.Clear();
        this.screenHighScore.draw();
    }
}
class ScreenHighScore extends ScreenBase {
    constructor(canvas) {
        super(canvas);
        this.screenLevelSelect = new ScreenLevelSelect(canvas);
    }
    draw() {
    }
    drawScreenLevelSelect() {
        this.canvasHelper.Clear();
        this.screenLevelSelect.draw();
    }
}
class ScreenLevel extends ScreenBase {
    constructor(canvas) {
        super(canvas);
        this.screenQuiz = new ScreenQuiz(canvas);
    }
    draw() {
    }
    drawScreenQuiz() {
        this.canvasHelper.Clear();
        this.screenQuiz.draw();
    }
}
function testInit() {
    const Untravel = new ScreenLevel(document.getElementById('canvas'));
    Untravel.draw();
}
window.addEventListener('load', testInit);
class ScreenLevelSelect extends ScreenBase {
    constructor(canvas) {
        super(canvas);
        this.screenLevel = new ScreenLevel(canvas);
    }
    draw() {
        this.canvasHelper.writeTextToCanvas('UNtRAVEL', 50, this.canvasHelper.GetCenter().X, 0);
        this.canvasHelper.writeImageFromFileToCanvas('./assets/images/buttonBlue.png', this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y + 20);
    }
    drawScreenLevel() {
        this.canvasHelper.Clear();
        this.screenLevel.draw();
    }
}
function init() {
    const Untravel = new ScreenLevelSelect(document.getElementById('canvas'));
    Untravel.draw();
}
window.addEventListener('load', init);
class ScreenQuiz extends ScreenBase {
    constructor(canvas) {
        super(canvas);
        this.screenEndresult = new ScreenEndResult(canvas);
    }
    draw() {
    }
    checkAnswer() {
    }
    drawScreenLevel() {
        this.canvasHelper.Clear();
        this.screenEndresult.draw();
    }
}
//# sourceMappingURL=app.js.map