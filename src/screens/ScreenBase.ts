abstract class ScreenBase {

    protected readonly canvasHelper: CanvasHelper;
    protected timer: TimeHelper;

    protected constructor(canvas: HTMLCanvasElement) {
        this.canvasHelper = CanvasHelper.Instance(canvas);
        this.timer = TimeHelper.Instance();

    }

    public abstract draw(): void;
}