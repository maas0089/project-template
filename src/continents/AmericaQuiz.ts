/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenQuiz.ts"/>

class AmericaQuiz extends ScreenQuiz{

    private static instance: ScreenQuiz = null;


    public constructor(){
        super();
        console.log('this is AmericaQuiz');

        this.totalquestion = 3; //total amount of questions

        this.imageLocations = [
            "./assets/questions/NorthAmerica1.png",
            './assets/questions/NorthAmerica2.png', 
            './assets/questions/NorthAmerica3.png'
        ];   

        this.qAndA = [
            {
                
                letter1: 'a',
                a1: ['Californië ', true], // correct
                b1: ['Los Angeles', false],
                c1: ['Alaska', false],

                letter2: 'B',
                a2: ['Chicago', true], // correct
                b2: ['Washington', false],
                c2: ['Mississipi', false], 

                letter3: 'C',
                a3: ['New York', true], // correct
                b3: ['Washington', false],
                c3: ['Montreal ', false]  
            },

            {
                letter1: 'A',
                a1: ['Montreal ', true], // correct
                b1: ['Los Angeles', false],
                c1: ['New York', false],

                letter2: 'II',
                a2: ['Groenland ', true], // correct
                b2: ['Alaska', false],
                c2: ['Canada', false], 

                letter3: 'C',
                a3: ['Atlantische Oceaan ', true], // correct
                b3: ['Caribische Zee', false],
                c3: ['Noordelijke IJszee', false]  
            },

            {
                letter1: 'A',
                a1: ['Mexico-Stad', true], // correct
                b1: ['Los Angeles', false],
                c1: ['Rocky Mountains', false],

                letter2: 'b',
                a2: ['Mississipi', true],
                b2: ['Rocky Mountains', false],
                c2: ['Chicago', false], // correct

                letter3: 'III',
                a3: ['Verenigde Staten', true],
                b3: ['Hawaii', false],
                c3: ['Canada', false] // correct 
            }]
    }
    public static Instance(): ScreenQuiz {
        if (this.instance == null) {
            this.instance = new AmericaQuiz();
        }
        return this.instance;
    }

    public drawMap(): void {
        this.canvasHelper.writeImageFromFileToCanvas(`${this.imageLocations[this.currentQuestion]}`, 100, 100, 711, 700);
    }

    public drawWrongScreen = (): void => {
        this.canvasHelper.Clear();
        this.removeButtons();
        // this.canvasHelper.ChangeScreen(new AmericaLevel);
        this.canvasHelper.ChangeScreen(new AmericaEndResult(false));
    }

    public drawCorrectScreen = (): void => {
        this.canvasHelper.ChangeScreen(new AmericaEndResult(true));
    }

}