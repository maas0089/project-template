class ScreenQuiz extends ScreenBase{

    private static instance: ScreenQuiz = null;

    private question: number = 0;

    private firstAnswer: number = 0;
    private secondAnswer: number = 0;
    private thirdAnswer: number = 0;

    private imageLocations: Array<string> = [
        "./assets/questions/Netherlands1.png",
        './assets/questions/Netherlands2.png', 
        './assets/questions/Netherlands3.png'
    ];

    private totalquestion: number = this.imageLocations.length - 1

    private qAndA: Array<any> = [
        {
            a1: 'Arnhem', // correct
            b1: 'Amersfoort',
            c1: 'Nijmegen',

            a2: 'Gelderland',
            b2: 'Drenthe',
            c2: 'Overijssel', // correct

            a3: 'Amsterdam',
            b3: 'Leiden',
            c3: 'Haarlem' // correct 
        },

        {
            a1: 'Leeuwarden', // correct
            b1: 'Groningen',
            c1: 'Assen',

            a2: 'Rotterdam',
            b2: 'Den Haag',
            c2: 'Middelburg', // correct

            a3: 'Limburg',
            b3: 'Gelderland',
            c3: 'Noord-Brabant' // correct 
        },

        {
            a1: 'Lelystad', // correct
            b1: 'Amsterdam',
            c1: 'Zwolle',

            a2: 'Noord-Holland',
            b2: 'Zeeland',
            c2: 'Zuid-Holland', // correct

            a3: 'Eindhoven',
            b3: 'Venlo',
            c3: 'Maastricht' // correct 
        }
    ];

    public constructor(){
        super();
    }

    public static Instance(): ScreenQuiz {
        if (this.instance == null) {
            this.instance = new ScreenQuiz();
        }
        return this.instance;
    }

    public draw(): void {
        if(this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1) {
            this.question++;
            this.firstAnswer = 0;
            this.secondAnswer = 0;
            this.thirdAnswer = 0;
        }
        else {
            this.firstAnswer = 0;
            this.secondAnswer = 0;
            this.thirdAnswer = 0;
        }
        this.drawScreenQuiz()
    }

    public drawScreenQuiz(): void {
        this.timer.pauseTimer();
        this.canvasHelper.writeTextToCanvas('Wat ligt hier?', 50, this.canvasHelper.GetCenter().X, 50);

        this.canvasHelper.writeImageFromFileToCanvas(`${this.imageLocations[this.question]}`, 350, 100, 504, 597);

        //question 2 (answer A)
        this.canvasHelper.writeTextToCanvas("A", 20, this.canvasHelper.GetWidth() * 0.59, 125, "red");
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].a1}`, 'startGame1', this.checkAnswerOne, this.canvasHelper.GetWidth() * 0.6, 100, this.firstAnswer);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].b1}`, 'startGame2', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 150);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].c1}`, 'startGame3', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 200);

        //question 1 (answer C)
        this.canvasHelper.writeTextToCanvas("B", 20, this.canvasHelper.GetWidth() * 0.59, 325, "red");
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].a2}`, 'startGame4', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 300);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].b2}`, 'startGame5', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 350);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].c2}`, 'startGame6', this.checkAnswerTwo, this.canvasHelper.GetWidth() * 0.6, 400, this.secondAnswer);

        //question 3(answer C)
        this.canvasHelper.writeTextToCanvas("C", 20, this.canvasHelper.GetWidth() * 0.59, 525, "red");
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].a3}`, 'startGame7', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 500);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].b3}`, 'startGame8', this.drawScreenLevel, this.canvasHelper.GetWidth() * 0.6, 550);
        this.canvasHelper.writeButtonToCanvas(`${this.qAndA[this.question].c3}`, 'startGame9', this.checkAnswerThree, this.canvasHelper.GetWidth() * 0.6, 600, this.thirdAnswer);
    }
    
    public checkAnswerOne = (): void => {
        console.log('Correct!');
        this.firstAnswer = 1;
        this.removeButtons();
        if(this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1) this.drawScreenEndResult();
        else this.drawScreenQuiz();
    }

    public checkAnswerTwo = (): void => {
        console.log('Correct!');
        this.secondAnswer = 1;
        this.removeButtons();
        if(this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1) this.drawScreenEndResult();
        else this.drawScreenQuiz();
    }

    public checkAnswerThree = (): void => {
        console.log('Correct!');
        this.thirdAnswer = 1;
        this.removeButtons();
        if(this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1) this.drawScreenEndResult();
        else this.drawScreenQuiz();

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

    public getCurrentQuestion(): number {
        return this.question;
    }

    public getMaxQuestion(): number {
        return this.totalquestion;
    }

}