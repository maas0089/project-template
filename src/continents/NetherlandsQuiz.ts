/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenQuiz.ts"/>

class NetherlandsQuiz extends ScreenQuiz {

    private static instance: ScreenQuiz = null;


    public constructor() {
        super();
        console.log('this is NetherlandsQuiz');

        this.totalquestion = 3; //total amount of questions

        this.imageLocations = [
            "./assets/questions/Netherlands1.png",
            './assets/questions/Netherlands2.png',
            './assets/questions/Netherlands3.png'
        ];

        this.qAndA = [
            {                
                letter1: 'A',
                a1: ['Arnhem', true],// correct
                b1: ['Amersfoort', false],
                c1: ['Nijmegen', false],

                letter2: 'b',
                a2: ['Overijssel', true], // correct
                b2: ['Drenthe', false],
                c2: ['Gelderland', false], 

                letter3: 'C',
                a3: ['Haarlem', true], // correct
                b3: ['Leiden', false],
                c3: ['Amsterdam', false]  
            },

            {
                letter1: 'A',
                a1: ['Leeuwarden', true], // correct
                b1: ['Groningen', false],
                c1: ['Assen', false],

                letter2: 'B',
                a2: ['Middelburg', true], // correct
                b2: ['Den Haag', false],
                c2: ['Rotterdam', false], 

                letter3: 'c',
                a3: ['Noord-Brabant', true], // correct
                b3: ['Gelderland', false],
                c3: ['Limburg', false]  
            },

            {
                letter1: 'A',
                a1: ['Lelystad', true], // correct
                b1: ['Amsterdam', false],
                c1: ['Zwolle', false],

                letter2: 'b',
                a2: ['Zuid-Holland', true], // correct
                b2: ['Zeeland', false],
                c2: ['Noord-Holland', false], 

                letter3: 'C',
                a3: ['Maastricht', true], // correct
                b3: ['Venlo', false],
                c3: ['Eindhoven', false]  
            }]
    }

    public static Instance(): ScreenQuiz {
        if (this.instance == null) {
            this.instance = new NetherlandsQuiz();
        }
        return this.instance;
    }

    public drawMap(): void {
        this.canvasHelper.writeImageFromFileToCanvas(`${this.imageLocations[this.currentQuestion]}`, this.canvasHelper.GetCenter().X * 0.4, 100, 504, 597);
    }

    public drawScreenLevel = (): void => {
        this.canvasHelper.Clear();
        this.removeButtons();
        this.canvasHelper.ChangeScreen(new NetherlandsLevel);
    }

    public drawScreenEndResult = (): void => {
        this.canvasHelper.ChangeScreen(new NetherlandsEndResult);
    }

}