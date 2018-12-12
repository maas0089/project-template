    class CanvasHelper {

        private readonly canvas: HTMLCanvasElement;
        private readonly context: CanvasRenderingContext2D; 

        // !There is no class ButtonAction
        // private clickCommands: Map<string, ButtonAction> = new Map<string, ButtonAction>();

        // Singleton

        private static instance: CanvasHelper = null;

        public static Instance(): CanvasHelper {

            if (this.instance == null) {
                this.instance = new CanvasHelper(<HTMLCanvasElement>document.getElementById('canvas'));
            }
            return this.instance;
        }

        // End of singleton

        /**
         * constructor
         * @param {HTMLCanvasElement} aCanvas - the canvas to help with
         */
        private constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            this.canvas.width = window.innerWidth; 
            this.canvas.height = window.innerHeight;

            // get the context from the canvas
            this.context = this.canvas.getContext('2d');

        }

        
        /**
         * Clear
         * Clears the canvas
         */
        public Clear(): void {
            // clear the screen
            this.context.clearRect(0, 0, this.GetWidth(), this.GetHeight());
        }


        /**
         * GetCanvas
         * Getter to provide access to the canvas
         */
        public GetCanvas(): HTMLCanvasElement {
            return this.canvas;
        }

        /**
         * GetCenter
         * returns the center coordinate
         */
        public GetCenter(): { X: number, Y: number } {
            return {X: this.GetWidth() / 2, Y: this.GetHeight() / 2};
        }

        /**
         * GetHeight
         * returns Height of the canvas
         */
        public GetHeight(): number {
            return this.canvas.height;
        }

        /**
         * GetWidth
         * returns the Width of the canvas
         */
        public GetWidth(): number {
            return this.canvas.width;
        }

        /**
         * writeTextToCanvas
         * @param {string} text -
         * @param {number} fontSize -
         * @param {number} xpos -
         * @param {number} ypos -
         * @param {string} color -
         * @param {CanvasTextAlign} alignment -
         */
        public writeTextToCanvas(text: string,
                                 fontSize: number,
                                 xpos: number,
                                 ypos: number,
                                 color: string = "white",
                                 alignment: CanvasTextAlign = "center") {

            this.context.font = `${fontSize}px Arial`; //TODO: decide on fontstyle
            this.context.fillStyle = color;
            this.context.textAlign = alignment;
            this.context.fillText(text, xpos, ypos);
        }

        /**
         * @param {string} src - the source of the resource
         * @param {number} xpos - the x axis value of the coordinate
         * @param {number} ypos - the y axis value of the coordinate
         */
        public writeImageFromFileToCanvas(src: string,
                                          xpos: number,
                                          ypos: number) {

            let image = new Image();
            // add the listener so the waiting will not affect the change
            image.addEventListener('load', () => {
                //this.d_context.clip();
                this.context.drawImage(image, xpos, ypos);
            });

            // load the source in the image.
            image.src = src;
        }

        public writeImageToCanvas(image: any,
                                  xpos: number,
                                  ypos: number): void {

            this.context.drawImage(image, xpos, ypos);
        }

        /**
         *     /**
         * writeButtonToCanvas
         * Creates a button with a given text and set the callback
         * @param aCaption - the caption to write
         * @param fnName -  the registerd name of the callback
         * @param fn - the callback method (click if the location of the button is clicked)
         * @param xpos - the left top x position of the button
         * @param ypos - the left top y position of the button
         */
        public writeButtonToCanvas(caption: string, fnName: string, fn: () => void, xpos: number = -1, ypos: number = -1) {
            let buttonImage = new Image();
            buttonImage.src = "./assets/images//buttonBlue.png";

            buttonImage.addEventListener('load', (): void => {
                let dx = xpos;
                let dy = ypos;
                // if x axis is not set, lets center the button horizontally
                if (dx < 0) dx = (this.GetWidth() - buttonImage.width) / 2;
                // if y axis is not set, lets center the button vertically
                if (dy < 0) dy = this.GetHeight() / 2 + buttonImage.height;

                // center the text based upon the font
                let fontX = dx + ((buttonImage.width + caption.length - 18) / 2); // - 1/2 fontsize + buttonBorder
                let fontY = dy + (buttonImage.height - 12); // - 1/2 fontsize + buttonBorder
                this.context.drawImage(buttonImage, dx, dy);
                this.writeTextToCanvas(caption, 20, fontX, fontY, '#000');

                // check if there is a valid callback given
                // if the callback is valid store the callback in the Map
                // if (fn != null) {
                //     this.clickCommands.set(fnName, new ButtonAction(dx, dy, buttonImage.height, buttonImage.width, fn));
                // }
            });

        }
    }
