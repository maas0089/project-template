class ScreenQuiz extends ScreenBase{

    private imageLocations: Array<string> = [
        "./assets/questions/Netherlands1.png",
        'source', 
        'source'
    ];
    private qAndA: Array<any> = [
        {
            a: 'Arnhem', // correct
            b: 'Amersfoort',
            c: 'Nijmegen' 
        },
        {
            a: 'Gelderland',
            b: 'Drenthe',
            c: 'Overijssel' // correct
        },
        {
            a: 'Amsterdam',
            b: 'Leiden',
            c: 'Haarlem' // correct
        }
    ];
    private firstAnswer: number = 0;
    private secondAnswer: number = 0;
    private thirdAnswer: number = 0;

    public constructor(){
        super();
    }

    public draw(): void {
        this.drawScreenQuiz(0,0,0)
    }

    public drawScreenQuiz(first: number, second: number, third: number): void {
        this.timer.pauseTimer();
        this.canvasHelper.writeTextToCanvas('Wat ligt hier?', 50, this.canvasHelper.GetCenter().X, 50);

        this.canvasHelper.writeImageFromFileToCanvas(`${this.imageLocations[0]}`, 350, 100, 504, 597);

        //question 2 (answer A)
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[0].a}`, 'startGame1', this.checkAnswerOne, this.canvasHelper.GetWidth() * 0.6, 100, first);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[0].b}`, 'startGame2', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 150);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[0].c}`, 'startGame3', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 200);

        //question 1 (answer C)
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[1].a}`, 'startGame4', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 300);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[1].b}`, 'startGame5', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 350);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[1].c}`, 'startGame6', this.checkAnswerTwo, this.canvasHelper.GetWidth() * 0.6, 400, second);

        //question 3(answer C)
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[2].a}`, 'startGame7', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 500);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[2].b}`, 'startGame8', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 550);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[2].c}`, 'startGame9', this.checkAnswerThree, this.canvasHelper.GetWidth() * 0.6, 600, third);
    }
    
    public checkAnswerOne = (): void => {
        console.log('Correct!');
        this.firstAnswer = 1;
        this.removeButtons();
        if(this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1) this.drawScreenEndResult();
        else this.drawScreenQuiz(this.firstAnswer, this.secondAnswer, this.thirdAnswer);
    }

    public checkAnswerTwo = (): void => {
        console.log('Correct!');
        this.secondAnswer = 1;
        this.removeButtons();
        if(this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1) this.drawScreenEndResult();
        else this.drawScreenQuiz(this.firstAnswer, this.secondAnswer, this.thirdAnswer);
    }

    public checkAnswerThree = (): void => {
        console.log('Correct!');
        this.thirdAnswer = 1;
        this.removeButtons();
        if(this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1) this.drawScreenEndResult();
        else this.drawScreenQuiz(this.firstAnswer, this.secondAnswer, this.thirdAnswer);

    }

    public drawScreenLevel = (): void => {
        this.canvasHelper.Clear();
        this.removeButtons();
        this.canvasHelper.ChangeScreen(new ScreenLevel);
    }

    public drawScreenEndResult = (): void => {
        this.canvasHelper.Clear();
        this.removeButtons();
        this.canvasHelper.ChangeScreen(new ScreenEndResult);
    }

    public removeButtons = (): void => {
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
    }

}