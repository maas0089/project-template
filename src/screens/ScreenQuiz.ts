abstract class ScreenQuiz extends ScreenBase{

    // protected static instance: ScreenQuiz = null;

    protected question: number = 0;
    protected currentQuestion: number;
    protected usedQuestions: Array<number> = new Array<number>();

    protected firstAnswer: number = 0;
    protected secondAnswer: number = 0;
    protected thirdAnswer: number = 0;

    protected positionOne: Array<number>;
    protected positionTwo: Array<number>;
    protected positionThree: Array<number>;

    protected imageLocations: Array<string>;
    protected totalquestion: number;

    protected qAndA: Array<any>;
    // protected qLetters: Array<string>;

    public constructor(){
        super();
    }

    public QuizExplanation() {
        this.canvasHelper.writeTextToCanvas("Legenda", 30, this.canvasHelper.GetWidth() - 300, 130, undefined, "left");
        this.canvasHelper.writeTextToCanvas("A, B, C: Stad / Zee / Oceaan", 20, this.canvasHelper.GetWidth() - 300, 160, undefined, "left");
        this.canvasHelper.writeTextToCanvas("a, b, c: Rivier / Provincie", 20, this.canvasHelper.GetWidth() - 300, 190, undefined, "left");
        this.canvasHelper.writeTextToCanvas("I, II, III: Land", 20, this.canvasHelper.GetWidth() - 300, 220, undefined, "left");
        this.canvasHelper.drawBorder(this.canvasHelper.GetWidth() - 320, 100, 320, 130);
    }

    public draw(): void {
        this.drawScreenQuiz();
    }

    public shuffle(array: any) {
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
      
    public drawScreenQuiz(): void {
        if (this.firstAnswer == 0 && this.secondAnswer == 0 && this.thirdAnswer == 0){
            this.generateRandomQuestion();
            this.positionOne = this.shuffle([100, 150, 200]);
            this.positionTwo = this.shuffle([300, 350, 400]);
            this.positionThree = this.shuffle([500, 550, 600]);    
        }


        let questionArray = this.qAndA[this.currentQuestion];
        this.timer.pauseTimer();

        this.QuizExplanation();

        this.drawMap();

        this.canvasHelper.writeTextToCanvas('Wat ligt hier?', 50, this.canvasHelper.GetCenter().X, 50);

        //question 1

        this.canvasHelper.writeTextToCanvas(questionArray.letter1, 20, this.canvasHelper.GetWidth() * 0.59, 125, "red");

        if (questionArray.a1[1]) this.canvasHelper.writeButtonToCanvas(`${questionArray.a1[0]}`, 'startGame1', this.checkAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[0], this.firstAnswer);
        else this.canvasHelper.writeButtonToCanvas(`${questionArray.a1[0]}`, 'startGame1', this.wrongAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[0]);

        if (questionArray.b1[1]) this.canvasHelper.writeButtonToCanvas(`${questionArray.b1[0]}`, 'startGame2', this.checkAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[1], this.firstAnswer);
        else this.canvasHelper.writeButtonToCanvas(`${questionArray.b1[0]}`, 'startGame2', this.wrongAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[1]); 

        if (questionArray.c1[1]) this.canvasHelper.writeButtonToCanvas(`${questionArray.c1[0]}`, 'startGame3', this.checkAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[2], this.firstAnswer);
        else this.canvasHelper.writeButtonToCanvas(`${questionArray.c1[0]}`, 'startGame3', this.wrongAnswerOne, this.canvasHelper.GetWidth() * 0.6, this.positionOne[2]); 

        //question 2
        this.canvasHelper.writeTextToCanvas(questionArray.letter2, 20, this.canvasHelper.GetWidth() * 0.59, 325, "red");

        if (questionArray.a2[1]) this.canvasHelper.writeButtonToCanvas(`${questionArray.a2[0]}`, 'startGame4', this.checkAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[0], this.secondAnswer);
        else this.canvasHelper.writeButtonToCanvas(`${questionArray.a2[0]}`, 'startGame4', this.wrongAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[0]); 

        if (questionArray.b2[1]) this.canvasHelper.writeButtonToCanvas(`${questionArray.b2[0]}`, 'startGame5', this.checkAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[1], this.secondAnswer);
        else this.canvasHelper.writeButtonToCanvas(`${questionArray.b2[0]}`, 'startGame5', this.wrongAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[1]); 

        if (questionArray.c2[1]) this.canvasHelper.writeButtonToCanvas(`${questionArray.c2[0]}`, 'startGame6', this.checkAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[2], this.secondAnswer);
        else this.canvasHelper.writeButtonToCanvas(`${questionArray.c2[0]}`, 'startGame6', this.wrongAnswerTwo, this.canvasHelper.GetWidth() * 0.6, this.positionTwo[2]); 

        //question 3
        this.canvasHelper.writeTextToCanvas(questionArray.letter3, 20, this.canvasHelper.GetWidth() * 0.59, 525, "red");

        if (questionArray.a3[1]) this.canvasHelper.writeButtonToCanvas(`${questionArray.a3[0]}`, 'startGame7', this.checkAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[0], this.thirdAnswer);
        else this.canvasHelper.writeButtonToCanvas(`${questionArray.a3[0]}`, 'startGame7', this.wrongAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[0]); 

        if (questionArray.b3[1]) this.canvasHelper.writeButtonToCanvas(`${questionArray.b3[0]}`, 'startGame8', this.checkAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[1], this.thirdAnswer);
        else this.canvasHelper.writeButtonToCanvas(`${questionArray.b3[0]}`, 'startGame8', this.wrongAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[1]); 

        if (questionArray.c3[1]) this.canvasHelper.writeButtonToCanvas(`${questionArray.c3[0]}`, 'startGame9', this.checkAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[2], this.thirdAnswer);
        else this.canvasHelper.writeButtonToCanvas(`${questionArray.c3[0]}`, 'startGame9', this.wrongAnswerThree, this.canvasHelper.GetWidth() * 0.6, this.positionThree[2]); 
    }

    public wrongAnswerOne = (): void => {
        if (this.firstAnswer != 1) this.drawScreenLevel();
    }

    public wrongAnswerTwo = (): void => {
        if (this.secondAnswer != 1) this.drawScreenLevel();
    }
    
    public wrongAnswerThree = (): void => {
        if (this.thirdAnswer != 1) this.drawScreenLevel();
    }

    
    public checkAnswerOne = (): void => {
        console.log('Correct!');
        this.firstAnswer = 1;
        this.removeButtons();
        if(this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1) this.drawNextScreen();
        else this.drawScreenQuiz();
    }

    public checkAnswerTwo = (): void => {
        console.log('Correct!');
        this.secondAnswer = 1;
        this.removeButtons();
        if(this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1) this.drawNextScreen();
        else this.drawScreenQuiz();
    }

    public checkAnswerThree = (): void => {
        console.log('Correct!');
        this.thirdAnswer = 1;
        this.removeButtons();
        if(this.firstAnswer == 1 && this.secondAnswer == 1 && this.thirdAnswer == 1) this.drawNextScreen();
        else this.drawScreenQuiz();

    }

    public drawNextScreen = (): void => {
        this.canvasHelper.Clear();
        this.removeButtons();

        this.question++;
        this.firstAnswer = 0;
        this.secondAnswer = 0;
        this.thirdAnswer = 0;

        this.drawScreenEndResult();
    }

    public generateRandomQuestion = (): void => {
        console.log('generating question...');
        do this.currentQuestion = this.canvasHelper.randomNumber(0, this.totalquestion - 1);
        while (this.usedQuestions.indexOf(this.currentQuestion) != -1);
        console.log(`current question: ${this.currentQuestion + 1}`);
        // console.log(this.usedQuestions);
        this.usedQuestions.push(this.currentQuestion);
        // this.question = currentQuestion;
    }

    public abstract drawMap(): void;

    public abstract drawScreenLevel(): void;

    public abstract drawScreenEndResult(): void;    

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

    public resetQuestion(): void {
        this.question = 0;
    }

    public getCurrentQuestion(): number {
        return this.question;
    }

    public getMaxQuestion(): number {
        return this.totalquestion;
    }

}