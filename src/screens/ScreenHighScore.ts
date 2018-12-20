class ScreenHighScore extends ScreenBase {

    // private screenQuiz: ScreenQuiz = EuropeQuiz.Instance();
    private highscores: Array<number> = [
        600,
        600,
        600
    ]; // this array will contain objects

    private highscoreText: Array<string> = [
        '10:00',
        '10:00',
        '10:00'
    ]

    private minutes: number;
    private seconds: string;

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


    public draw(): void {
        this.minutes = this.timer.getTime().Minutes;
        if(this.timer.getTime().Seconds < 10) this.seconds = `0${this.timer.getTime().Seconds}`;
        else this.seconds = `${this.timer.getTime().Seconds}`;

        if(this.timer.getTime().Seconds < 10) {let seconds = `0${this.timer.getTime().Seconds}`;}
        let score = this.timer.getScore();
        let center = this.canvasHelper.GetCenter();
        this.canvasHelper.writeTextToCanvas('Highscores', 50, this.canvasHelper.GetCenter().X, 100);

        if(this.highscores[0] > score){
            this.highscores[2] = this.highscores[1];
            this.highscoreText[2] = this.highscoreText[1]

            this.highscores[1] = this.highscores[0];
            this.highscoreText[1] = this.highscoreText[0]


            this.highscores[0] = score;
            this.highscoreText[0] = `${this.minutes}:${this.seconds}`

        } else if(this.highscores[1] > score){
            this.highscores[2] = this.highscores[1];
            this.highscoreText[2] = this.highscoreText[1]

            this.highscores[1] = score;
            this.highscoreText[1] = `${this.minutes}:${this.seconds}`

        } else if(this.highscores[2] > score){
            this.highscores[2] = score;
            this.highscoreText[2] = `${this.minutes}:${this.seconds}`

        }


        this.highscoreText.forEach((element, index) => {

            center.Y += 80;
            this.canvasHelper.writeTextToCanvas(
                `${index + 1}: ${element}`,
                40,
                center.X,
                center.Y - 100
            );
        });


        this.canvasHelper.writeButtonToCanvas('Speel opnieuw', 'replay', this.drawScreenLevelSelect, undefined, this.canvasHelper.GetHeight() * 0.9);


    }

    public drawScreenLevelSelect = (): void => {
        this.canvasHelper.Clear();
        this.timer.resetTimer();
        // this.screenQuiz.resetQuestion();
        this.canvasHelper.UnregisterClickListener('replay');
        this.canvasHelper.ChangeScreen(new ScreenLevelSelect);
    }
}