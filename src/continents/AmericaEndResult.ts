/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenEndResult.ts"/>


class AmericaEndResult extends ScreenEndResult {

    constructor() {
        super();
        console.log('this is AmericaEndResult');
        this.screenQuiz = AmericaQuiz.Instance();
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
        this.canvasHelper.ChangeScreen(ScreenHighScore.Instance());
    }

}