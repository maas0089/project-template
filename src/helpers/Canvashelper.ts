    class CanvasHelper {

        private readonly canvas: HTMLCanvasElement;
        private readonly context: CanvasRenderingContext2D; 

        // !There is no class ButtonAction
        // private clickCommands: Map<string, ButtonAction> = new Map<string, ButtonAction>();

        // Singleton

        private static instance: CanvasHelper = null;

        public static Instance(canvas: HTMLCanvasElement = null): CanvasHelper {

            if (this.instance == null) {
                if (canvas == null) {
                    throw new DOMException("The first time the instance is created a Canvas must be given.");
                }
                this.instance = new CanvasHelper(canvas);
            }
            return this.instance;
        }

        // end of singleton

        /**
         * constructor
         * @AccessModifier {public}
         * Clears the canvas
         * @param {HTMLCanvasElement} aCanvas - the canvas to help with
         */
        // THE CONSTRUCTOR IS CHANGED FROM PUBLIC TO PRIVATE.
        // THIS IS REQUIRED WHEN WE WORK WITH SINGLETONS.
        private constructor(canvas: HTMLCanvasElement) {
            // bind the passed argument to the local member
            //construct all canvas
            this.canvas = canvas;
            this.canvas.width = window.innerWidth; 
            this.canvas.height = window.innerHeight;

            // get the context from the canvas
            this.context = this.canvas.getContext('2d');

        }

        
        /**
         * Clear
         * @AccessModifier {public}
         * Clears the canvas
         */
        public Clear(): void {
            // clear the screen
            this.d_context.clearRect(0, 0, this.GetWidth(), this.GetHeight());
        }

        /**
         *
         * @constructor
         */
        public BeginUpdate(): void {
            this.d_context.save();
        }

        /**
         *
         * @constructor
         */
        public EndUpdate(): void {
            this.d_context.clip();
            this.d_context.restore();
        }

        /**
         * GetCanvas
         * @AccessModifier {public}
         * Getter to provide access to the canvas
         */
        public GetCanvas(): HTMLCanvasElement {
            return this.d_canvas;
        }

        /**
         * GetCenter
         * @AccessModifier {public}
         * returns the center coordinate
         */
        public GetCenter(): { X: number, Y: number } {
            // return the center as a valid return
            return {X: this.GetWidth() / 2, Y: this.GetHeight() / 2};
        }

        /**
         * GetHeight
         * @AccessModifier {public}
         * returns Height of the canvas
         */
        public GetHeight(): number {
            // return the height of the canvas
            return this.d_canvas.height;
        }

        /**
         * GetWidth
         * @AccessModifier {public}
         * returns the Width of the canvas
         */
        public GetWidth(): number {
            // return the width of the canvas
            return this.d_canvas.width;
        }

        public UnregisterClickListener(fnName: string): void {
            this.d_clickCommands.delete(fnName);
        }

        /**
         * writeTextToCanvas
         * @AccessModifier {public}
         * Handles the internal redirection of the click event.
         * @param {string} text -
         * @param {number} fontSize -
         * @param {number} aXpos -
         * @param {number} aYpos -
         * @param {string} color -
         * @param {CanvasTextAlign} alignment -
         */
        public writeTextToCanvas(aText: string,
                                 aFontSize: number,
                                 aXpos: number,
                                 aYpos: number,
                                 aColor: string = "white",
                                 aAlignment: CanvasTextAlign = "center") {

            this.d_context.font = `${aFontSize}px Minecraft`;
            this.d_context.fillStyle = aColor;
            this.d_context.textAlign = aAlignment;
            this.d_context.fillText(aText, aXpos, aYpos);
        }

        /**
         * writeTextToCanvas
         * @AccessModifier {public}
         * Handles the internal redirection of the click event.
         * @param {string} aSrc - the source of the resource
         * @param {number} aXpos - the x axis value of the coordinate
         * @param {number} aYpos - the y axis value of the coordinate
         */
        public writeImageFromFileToCanvas(aSrc: string,
                                          aXpos: number,
                                          aYpos: number) {

            let image = new Image();
            // add the listener so the waiting will not affect the change
            image.addEventListener('load', () => {
                //this.d_context.clip();
                this.d_context.drawImage(image, aXpos, aYpos);
            });

            // load the source in the image.
            image.src = aSrc;
        }

        public writeImageToCanvas(aImage: any,
                                  aXpos: number,
                                  aYpos: number): void {

            this.d_context.drawImage(aImage, aXpos, aYpos);
        }

        /**
         *     /**
         * writeButtonToCanvas
         * @AccessModifier {public}
         * Creates a button with a given text and set the callback
         *      providing a callback is mandatory for the button has no use
         *      withoud the callback.
         * @param aCaption - the caption to write
         * @param fnName -  the registerd name of the callback
         * @param fn - the callback method (click if the location of the button is clicked)
         * @param aXpos - the left top x position of the button
         * @param aYpos - the left top y position of the button
         */
        public writeButtonToCanvas(aCaption: string, fnName: string, fn: () => void, aXpos: number = -1, aYpos: number = -1) {
            let buttonImage = new Image();
            buttonImage.src = "./assets/images/SpaceShooterRedux/PNG/UI/buttonBlue.png";
            // Make sure the image is loaded first otherwise nothing will draw.

            buttonImage.addEventListener('load', (): void => {
                let dx = aXpos;
                let dy = aYpos;
                // if x axis is not set, lets center the button horizontally
                if (dx < 0) dx = (this.GetWidth() - buttonImage.width) / 2;
                // if y axis is not set, lets center the button vertically
                if (dy < 0) dy = this.GetHeight() / 2 + buttonImage.height;

                // center the text based upon the font
                let fontX = dx + ((buttonImage.width + aCaption.length - 18) / 2); // - 1/2 fontsize + buttonBorder
                let fontY = dy + (buttonImage.height - 12); // - 1/2 fontsize + buttonBorder
                this.d_context.drawImage(buttonImage, dx, dy);
                this.writeTextToCanvas(aCaption, 20, fontX, fontY, '#000');

                // check if there is a valid callback given
                // if the callback is valid store the callback in the Map
                if (fn != null) {
                    this.d_clickCommands.set(fnName, new ButtonAction(dx, dy, buttonImage.height, buttonImage.width, fn));
                }
            });

        }
    }
