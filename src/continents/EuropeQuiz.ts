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



        // questions and answers for The Netherlands
        // this.qAndA = [
        //     {                
        //         letter1: 'A',
        //         a1: ['Arnhem', true],// correct
        //         b1: ['Amersfoort', false],
        //         c1: ['Nijmegen', false],

        //         letter2: 'b',
        //         a2: ['Overijssel', true], // correct
        //         b2: ['Drenthe', false],
        //         c2: ['Gelderland', false], 

        //         letter3: 'C',
        //         a3: ['Haarlem', true], // correct
        //         b3: ['Leiden', false],
        //         c3: ['Amsterdam', false]  
        //     },

        //     {
        //         letter1: 'A',
        //         a1: ['Leeuwarden', true], // correct
        //         b1: ['Groningen', false],
        //         c1: ['Assen', false],

        //         letter2: 'B',
        //         a2: ['Middelburg', true], // correct
        //         b2: ['Den Haag', false],
        //         c2: ['Rotterdam', false], 

        //         letter3: 'c',
        //         a3: ['Noord-Brabant', true], // correct
        //         b3: ['Gelderland', false],
        //         c3: ['Limburg', false]  
        //     },

        //     {
        //         letter1: 'A',
        //         a1: ['Lelystad', true], // correct
        //         b1: ['Amsterdam', false],
        //         c1: ['Zwolle', false],

        //         letter2: 'b',
        //         a2: ['Zuid-Holland', true], // correct
        //         b2: ['Zeeland', false],
        //         c2: ['Noord-Holland', false], 

        //         letter3: 'C',
        //         a3: ['Maastricht', true], // correct
        //         b3: ['Venlo', false],
        //         c3: ['Eindhoven', false]  
        //     }]
    }

    public static Instance(): ScreenQuiz {
        if (this.instance == null) {
            this.instance = new EuropeQuiz();
        }
        return this.instance;
    }

    public drawMap(): void {
        this.canvasHelper.writeImageFromFileToCanvas(`${this.imageLocations[this.question]}`, 350, 100, 504, 597);
    }

    public drawScreenLevel = (): void => {
        this.canvasHelper.Clear();
        this.removeButtons();
        this.canvasHelper.ChangeScreen(new EuropeLevel);
    }

    public drawScreenEndResult = (): void => {
        this.canvasHelper.ChangeScreen(new EuropeEndResult);
    }

}