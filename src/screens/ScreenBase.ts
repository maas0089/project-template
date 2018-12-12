abstract class ScreenBase {

    protected readonly canvasHelper: CanvasHelper;
    protected timer: TimeHelper;

    protected constructor() {
        this.canvasHelper = CanvasHelper.Instance();
        this.timer = TimeHelper.Instance();

    }

    public abstract draw(): void;
}