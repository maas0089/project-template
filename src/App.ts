
    class App {

        // from here we define our new (refactored) members
        private canvasHelper: CanvasHelper;

        public constructor() {

            // Initialize the CanvasHelper and assign the correct canvas
            this.canvasHelper = CanvasHelper.Instance();

            this.canvasHelper.ChangeScreen(new ScreenLevelSelect());
        }
    }

//this will get an HTML element. I cast this element in de appropriate type using <>
let init = function () {
    const myGame = new App();
};

//add load listener for custom font types
window.addEventListener('load', init);
