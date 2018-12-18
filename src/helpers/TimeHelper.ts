class TimeHelper {
    private minutes: number;
    private seconds: number;
    private score: number;
    private static instance: TimeHelper = null;
    private interval: any;

    public static Instance(): TimeHelper {
        if (this.instance == null) {
            this.instance = new TimeHelper();
        }
        return this.instance;

    }

    public constructor() {
        this.minutes = 0;
        this.seconds = 0;
        this.score = 0;
    }

    public startTimer(): void {
            this.interval = setInterval( () => {
                if(this.seconds < 59){
                    this.seconds++
                    this.score++
                }
                else{
                    this.seconds = 0;
                    this.minutes++;
                    this.score++;
                }            
            }, 1000)
    }

    public pauseTimer(): void {
        clearInterval(this.interval);
    }

    public stopTimer(): void {

    }

    public resetTimer(): void {
        clearInterval(this.interval);
        this.minutes = 0;
        this.seconds = 0;
        this.score = 0;
    }

    public getTime(): {Minutes: number, Seconds: number} {
        return {Minutes: this.minutes, Seconds: this.seconds}
    }

    public getScore(): number {
        return this.score;
    }
}