/// <reference path="../screens/ScreenBase.ts"/>
/// <reference path="../screens/ScreenQuiz.ts"/>

class AmericaQuiz extends ScreenQuiz{

    private static instance: ScreenQuiz = null;


    public constructor(){
        super();
        console.log('this is AmericaQuiz');

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
                a2: ['Gelderland', false],
                b2: ['Drenthe', false],
                c2: ['Overijssel', true], // correct

                letter3: 'C',
                a3: ['Amsterdam', false],
                b3: ['Leiden', false],
                c3: ['Haarlem', true] // correct 
            },

            {
                letter1: 'A',
                a1: ['Leeuwarden', true], // correct
                b1: ['Groningen', false],
                c1: ['Assen', false],

                letter2: 'B',
                a2: ['Rotterdam', false],
                b2: ['Den Haag', false],
                c2: ['Middelburg', true], // correct

                letter3: 'c',
                a3: ['Limburg', false],
                b3: ['Gelderland', false],
                c3: ['Noord-Brabant', true] // correct 
            },

            {
                letter1: 'A',
                a1: ['Lelystad', true], // correct
                b1: ['Amsterdam', false],
                c1: ['Zwolle', false],

                letter2: 'b',
                a2: ['Noord-Holland', false],
                b2: ['Zeeland', false],
                c2: ['Zuid-Holland', true], // correct

                letter3: 'C',
                a3: ['Eindhoven', false],
                b3: ['Venlo', false],
                c3: ['Maastricht', true] // correct 
            }]
    }
    public static Instance(): ScreenQuiz {
        if (this.instance == null) {
            this.instance = new AmericaQuiz();
        }
        return this.instance;
    }

    public drawScreenLevel = (): void => {
        this.canvasHelper.Clear();
        this.removeButtons();
        this.canvasHelper.ChangeScreen(new AmericaLevel);
    }

    public drawScreenEndResult = (): void => {
        this.canvasHelper.ChangeScreen(new AmericaEndResult);
    }

}