/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenEndResult.ts"/>


class NetherlandsEndResult extends ScreenEndResult {

    constructor() {
        super();
        console.log('this is NetherlandsEndResult');
        this.screenQuiz = NetherlandsQuiz.Instance();
    }

    public drawNextLevelScreen = (): void => {
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('continue');
        this.canvasHelper.ChangeScreen(new NetherlandsLevel);

    }

    public drawScreenHighScore = (): void => {
        this.canvasHelper.Clear();
        this.screenQuiz.resetQuestion();
        this.canvasHelper.UnregisterClickListener('continue');
        this.screenHighScore.setCategory(0);
        this.canvasHelper.ChangeScreen(ScreenHighScore.Instance());
    }
}