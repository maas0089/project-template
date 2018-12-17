class ScreenQuiz extends ScreenBase{

    private imageLocations: Array<string> = [
        'source',
        'source', 
        'source'
    ];
    private qAndA: Array<any> = [
        {
            a: 'answer',
            b: 'answer',
            c: 'answer' 
        },
        {
            a: 'answer',
            b: 'answer',
            c: 'answer'
        },
        {
            a: 'answer',
            b: 'answer',
            c: 'answer'
        }
    ];
    private correct: number = 0;

    public constructor(){
        super();
    }

    public draw(): void {
        this.timer.pauseTimer();
        this.canvasHelper.writeTextToCanvas('Wat ligt hier?', 50, this.canvasHelper.GetCenter().X, 50);

        //question 2 (answer B)
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[0].a}`, 'startGame1', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 100);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[0].b}`, 'startGame2', this.checkAnswer, this.canvasHelper.GetWidth() * 0.6, 150);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[0].c}`, 'startGame3', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 200);

        //question 1 (answer C)
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[1].a}`, 'startGame4', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 300);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[1].b}`, 'startGame5', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 350);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[1].c}`, 'startGame6', this.checkAnswer, this.canvasHelper.GetWidth() * 0.6, 400);

        //question 3(answer B)
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[2].a}`, 'startGame7', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 500);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[2].b}`, 'startGame8', this.checkAnswer, this.canvasHelper.GetWidth() * 0.6, 550);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[2].c}`, 'startGame9', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 600);
    }
    
    public checkAnswer = (): void => {
        console.log('Correct!');
        this.correct ++;
        if(this.correct == 3) this.drawScreenEndResult();
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