/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenQuiz.ts"/>

class EuropeQuiz extends ScreenQuiz {

    private static instance: ScreenQuiz = null;


    public constructor() {
        super();
        console.log('this is EuropeQuiz');

        this.totalquestion = 3; //total amount of questions

        this.imageLocations = [
            "./assets/questions/Europe1.png",
            './assets/questions/Europe2.png',
            './assets/questions/Europe3.png'
        ];

        this.qAndA = [
            {
                letter1: 'A',
                a1: ['Helsinki ', true],// correct
                b1: ['Warschau', false],
                c1: ['Kopenhagen', false],

                letter2: 'B',
                a2: ['Londen ', true], // correct
                b2: ['Berlijn', false],
                c2: ['Parijs', false], 

                letter3: 'III',
                a3: ['Tsjechië ', true], // correct
                b3: ['Slowakije', false],
                c3: ['Polen', false] 
            },

            {
                letter1: 'A',
                a1: ['Praag ', true], // correct
                b1: ['Wenen', false],
                c1: ['Bratislava', false],

                letter2: 'B',
                a2: ['Athene ', true], // correct
                b2: ['Budapest', false],
                c2: ['Rome', false],

                letter3: 'c',
                a3: ['Rijn', true], // correct
                b3: ['Wolga', false],
                c3: ['Noordzee', false] 
            },

            {
                letter1: 'A',
                a1: ['Zwarte Zee', true], // correct
                b1: ['Middellandse Zee', false],
                c1: ['Het Kanaal', false],

                letter2: 'II',
                a2: ['Zwitserland', true], // correct
                b2: ['Oostenrijk', false],
                c2: ['Frankrijk', false],

                letter3: 'C',
                a3: ['Madrid', true], // correct
                b3: ['Parijs', false],
                c3: ['Rome', false] 
            }]
    }

    public static Instance(): ScreenQuiz {
        if (this.instance == null) {
            this.instance = new EuropeQuiz();
        }
        return this.instance;
    }

    public drawMap(): void {
        this.canvasHelper.writeImageFromFileToCanvas(`${this.imageLocations[this.currentQuestion]}`, 50, 100, 1000, 790);
    }

    public drawWrongScreen = (): void => {
        this.canvasHelper.Clear();
        this.removeButtons();
        // this.canvasHelper.ChangeScreen(new EuropeLevel);
        this.canvasHelper.ChangeScreen(new EuropeEndResult(false));
    }

    public drawCorrectScreen = (): void => {
        this.canvasHelper.ChangeScreen(new EuropeEndResult(true));
    }

}