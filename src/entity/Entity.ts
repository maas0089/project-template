class Entity {
    protected xPos: number;
    protected yPos: number;
    protected height: number;
    protected width: number;
    protected imageSrc: string;
    private canvas: CanvasHelper;

    public constructor(
        xCoor: number,
        yCoor: number,
        ) {
        this.canvas = CanvasHelper.Instance();
        this.xPos = xCoor;
        this.yPos = yCoor;
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