class TimeHelper {
    private minutes: number;
    private seconds: number;
    private static instance: TimeHelper = null;

    public static Instance(): TimeHelper {
        if (this.instance == null) {
            this.instance = new TimeHelper();
        }
        return this.instance;

    }

    public constructor() {
        this.minutes = 0;
        this.seconds = 0;
    }

    public startTimer(): void {
        let interval = setInterval( () => {
            if(this.seconds < 60){
                this.seconds++
            }
            else{
                this.seconds = 0;
                this.minutes++;
            }            
        }, 1000)
    }

    public pauseTimer(): void {

    }

    public stopTimer(): void {

    }

    public resetTimer(): void {
        this.minutes = 0;
        this.seconds = 0;
    }

    getTime(): {Minutes: number, Seconds: number} {
        return {Minutes: this.minutes, Seconds: this.seconds}
    }
}