class Entity {
    protected xPos: number;
    protected yPos: number;
    protected readonly height: number;
    protected readonly width: number;
    private readonly imageSrc: string;
    private readonly canvas: CanvasHelper;

    public constructor(
        canvas: HTMLCanvasElement,
        imageSource: string,
        xCoor: number,
        yCoor: number,
        width: number,
        height: number
        ) {
        this.canvas = CanvasHelper.Instance();
        this.imageSrc = imageSource;
        this.xPos = xCoor;
        this.yPos = yCoor;
        this.width = width;
        this.height = height;
    }

    public draw() {
        this.canvas.writeImageFromFileToCanvas(this.imageSrc, this.xPos, this.yPos, this.width, this.height);
    }

    public getX(): number
    {
        return this.xPos;
    }

    public getY(): number
    {
        return this.yPos;
    }

    public getWidth(): number
    {
        return this.width;
    }

    public getHeight(): number
    {
        return this.height;
    }
}