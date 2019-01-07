/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenEndResult.ts"/>


class EuropeEndResult extends ScreenEndResult {

    constructor() {
        super();
        console.log('this is EuropeEndResult');
        this.screenQuiz = EuropeQuiz.Instance();
    }

    public drawNextLevelScreen = (): void => {
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('continue');
        this.canvasHelper.ChangeScreen(new EuropeLevel);

    }

    public drawScreenHighScore = (): void => {
        this.canvasHelper.Clear();
        this.screenQuiz.resetQuestion();
        this.canvasHelper.UnregisterClickListener('continue');
        this.screenHighScore.setCategory(0);
        this.canvasHelper.ChangeScreen(ScreenHighScore.Instance());
    }
}