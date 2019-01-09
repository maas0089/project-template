/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenEndResult.ts"/>


class AmericaEndResult extends ScreenEndResult {

    constructor(correct: boolean) {
        super(correct);
        console.log('this is AmericaEndResult');
        this.screenQuiz = AmericaQuiz.Instance();
    }

    public drawScreenLevel = (): void =>{
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('drawScreenLevel');
        this.canvasHelper.ChangeScreen(new AmericaLevel)
    }

    public drawNextLevelScreen = (): void => {
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('continue');
        this.canvasHelper.ChangeScreen(new AmericaLevel);

    }

    public drawScreenHighScore = (): void => {
        this.canvasHelper.Clear();
        this.screenQuiz.resetQuestion();
        this.canvasHelper.UnregisterClickListener('continue');
        this.screenHighScore.setCategory(1);
        this.canvasHelper.ChangeScreen(ScreenHighScore.Instance());
    }

}