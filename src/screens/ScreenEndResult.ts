abstract class ScreenEndResult extends ScreenBase {

    protected screenQuiz: ScreenQuiz;
    protected screenHighScore: ScreenHighScore = ScreenHighScore.Instance();
    protected correct: boolean;

    constructor(correct: boolean) {
        super();
        this.correct = correct;
    }

    public draw(): void {
        if(this.correct) this.drawCorrectScreen();
        else this.drawWrongScreen();
    }

    public drawCorrectScreen = (): void =>{
        let time = this.timer.getTime();
        this.canvasHelper.writeTextToCanvas(`Level ${this.screenQuiz.getCurrentQuestion()} voltooid!` , 50, this.canvasHelper.GetCenter().X, 100);


        this.canvasHelper.writeTextToCanvas('Tijd:', 30, this.canvasHelper.GetCenter().X, 250);
        if(time.Seconds < 10) this.canvasHelper.writeTextToCanvas(` ${time.Minutes}:0${time.Seconds}`, 30, this.canvasHelper.GetCenter().X, 350, 'black');
        else this.canvasHelper.writeTextToCanvas(` ${time.Minutes}:${time.Seconds}`, 30, this.canvasHelper.GetCenter().X, 350, 'black');
        if(this.screenQuiz.getCurrentQuestion() > this.screenQuiz.getMaxQuestion() - 1) this.canvasHelper.writeButtonToCanvas('Highscores', 'continue', this.drawScreenHighScore, undefined, undefined);
        else this.canvasHelper.writeButtonToCanvas('Volgend level', 'continue', this.drawNextLevelScreen, undefined, undefined);
    }

    public drawWrongScreen = (): void =>{
        this.canvasHelper.writeTextToCanvas('Helaas,', 50, this.canvasHelper.GetCenter().X, this.canvasHelper.GetHeight() * 0.3, 'red');
        this.canvasHelper.writeTextToCanvas('Dat antwoord was fout!', 40, this.canvasHelper.GetCenter().X, this.canvasHelper.GetCenter().Y - 50, 'red');
        this.canvasHelper.writeButtonToCanvas('Probeer opnieuw', 'drawScreenLevel', this.drawScreenLevel);
    }

    //drawScrenLevel and drawNextlevelScreen functions are the same. Both are kept for clarity right now
    public abstract drawScreenLevel(): void;

    public abstract drawNextLevelScreen(): void;

    public abstract drawScreenHighScore(): void;
}