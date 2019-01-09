/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenEndResult.ts"/>


class NetherlandsEndResult extends ScreenEndResult {

    constructor(correct: boolean) {
        super(correct);
        console.log('this is NetherlandsEndResult');
        this.screenQuiz = NetherlandsQuiz.Instance();
    }

    public drawScreenLevel = (): void =>{
        this.canvasHelper.Clear();
        this.canvasHelper.UnregisterClickListener('drawScreenLevel');
        this.canvasHelper.ChangeScreen(new NetherlandsLevel);
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