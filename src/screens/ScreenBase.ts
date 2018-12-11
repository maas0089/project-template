abstract class ScreenBase {

    protected readonly canvasHelper: CanvasHelper;
    protected timer: TimeHelper;

    protected constructor(canvas: HTMLCanvasElement, timer: TimeHelper) {
        this.canvasHelper = CanvasHelper.Instance(canvas);
        this.timer = TimeHelper.Instance();

    }

    public abstract draw(): void;
}