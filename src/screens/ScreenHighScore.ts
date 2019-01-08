class ScreenHighScore extends ScreenBase {

    private europeHighscores: Array<number> = [
        600,
        600,
        600
    ]; 

    private europeHighscoreText: Array<string> = [
        '10:00',
        '10:00',
        '10:00'
    ]

    private americaHighscores: Array<number> = [
        600,
        600,
        600
    ];

    private americaHighscoreText: Array<string> = [
        '10:00',
        '10:00',
        '10:00'
    ]

    private netherlandsHighscores: Array<number> = [
        600,
        600,
        600
    ];

    private netherlandsHighscoreText: Array<string> = [
        '10:00',
        '10:00',
        '10:00'
    ]

    private minutes: number;
    private seconds: string;
    private category: number = 0;

    private static instance: ScreenHighScore = null;

    constructor() {
        super();
    }

    public static Instance(): ScreenHighScore {
        if (this.instance == null) {
            this.instance = new ScreenHighScore();
        }
        return this.instance;
    }

    public setCategory(category: number){
        this.category = category;
    }


    public draw(): void {
        this.minutes = this.timer.getTime().Minutes;
        let score = this.timer.getScore();

        if(this.timer.getTime().Seconds < 10) this.seconds = `0${this.timer.getTime().Seconds}`;
        else this.seconds = `${this.timer.getTime().Seconds}`;

        this.canvasHelper.writeTextToCanvas('Highscores', 50, this.canvasHelper.GetCenter().X, 100);
        
        if(this.category == 0){
            var continent = 'Nederland';
            var highscores = this.netherlandsHighscores;
            var highscoreText = this.netherlandsHighscoreText;
        } 
        else if(this.category == 1){
            var continent = 'Noord-Amerika';
            var highscores = this.americaHighscores;
            var highscoreText = this.americaHighscoreText;
        }
        else if(this.category == 2){
            var continent = 'Europa';
            var highscores = this.europeHighscores;
            var highscoreText = this.europeHighscoreText;
        }


        this.canvasHelper.writeTextToCanvas(`Jij hebt ${continent} voltooid in:`, 35, this.canvasHelper.GetCenter().X, 200);
        this.canvasHelper.writeTextToCanvas(`${this.minutes}:${this.seconds}`, 30, this.canvasHelper.GetCenter().X, 250);
        this.canvasHelper.writeTextToCanvas('De best behaalde tijden zijn:', 35, this.canvasHelper.GetCenter().X, 350);

        console.log(this.category, highscores);

        if(highscores[0] > score){
            highscores[2] = highscores[1];
            highscoreText[2] = highscoreText[1]

            highscores[1] = highscores[0];
            highscoreText[1] = highscoreText[0]


            highscores[0] = score;
            highscoreText[0] = `${this.minutes}:${this.seconds}`

        } else if(highscores[1] > score){
            highscores[2] = highscores[1];
            highscoreText[2] = highscoreText[1]

            highscores[1] = score;
            highscoreText[1] = `${this.minutes}:${this.seconds}`

        } else if(highscores[2] > score){
            highscores[2] = score;
            highscoreText[2] = `${this.minutes}:${this.seconds}`

        }

        this.drawNetherlandsHighscores();
        this.drawEuropeHighscores();
        this.drawAmericaHighscores();

        this.canvasHelper.writeButtonToCanvas('Speel opnieuw', 'replay', this.drawScreenLevelSelect, undefined, this.canvasHelper.GetHeight() * 0.9);

    }

    public drawNetherlandsHighscores(){
        let center = this.canvasHelper.GetCenter();

        this.canvasHelper.writeTextToCanvas('Nederland', 40, this.canvasHelper.GetWidth() * 0.25, center.Y);

        this.netherlandsHighscoreText.forEach((element, index) => {

            center.Y += 80;
            this.canvasHelper.writeTextToCanvas(
                `${index + 1}: ${element}`,
                30,
                this.canvasHelper.GetWidth() * 0.25,
                center.Y
            );
        });
    }

    public drawEuropeHighscores(){
        let center = this.canvasHelper.GetCenter();

        this.canvasHelper.writeTextToCanvas('Europa', 40, center.X, center.Y,);

        this.europeHighscoreText.forEach((element, index) => {

            center.Y += 80;
            this.canvasHelper.writeTextToCanvas(
                `${index + 1}: ${element}`,
                30,
                center.X,
                center.Y,
            );
        });
    }

    public drawAmericaHighscores(){
        let center = this.canvasHelper.GetCenter();

        this.canvasHelper.writeTextToCanvas('Noord-Amerika', 40, this.canvasHelper.GetWidth() * 0.75, center.Y);

        this.americaHighscoreText.forEach((element, index) => {

            center.Y += 80;
            this.canvasHelper.writeTextToCanvas(
                `${index + 1}: ${element}`,
                30,
                this.canvasHelper.GetWidth() * 0.75,
                center.Y
            );
        });
    }

    public drawScreenLevelSelect = (): void => {
        this.canvasHelper.Clear();
        this.timer.resetTimer();
        // this.screenQuiz.resetQuestion();
        this.canvasHelper.UnregisterClickListener('replay');
        this.canvasHelper.ChangeScreen(new ScreenLevelSelect);
    }
}