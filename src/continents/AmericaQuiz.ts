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
                a1: 'Arnhem', // correct
                b1: 'Amersfoort',
                c1: 'Nijmegen',
    
                letter2: 'b',
                a2: 'Gelderland',
                b2: 'Drenthe',
                c2: 'Overijssel', // correct
    
                letter3: 'C',
                a3: 'Amsterdam',
                b3: 'Leiden',
                c3: 'Haarlem' // correct 
            },
    
            {
                letter1: 'A',
                a1: 'Leeuwarden', // correct
                b1: 'Groningen',
                c1: 'Assen',
    
                letter2: 'B',
                a2: 'Rotterdam',
                b2: 'Den Haag',
                c2: 'Middelburg', // correct
    
                letter3: 'c',
                a3: 'Limburg',
                b3: 'Gelderland',
                c3: 'Noord-Brabant' // correct 
            },
    
            {
                letter1: 'A',
                a1: 'Lelystad', // correct
                b1: 'Amsterdam',
                c1: 'Zwolle',
    
                letter2: 'b',
                a2: 'Noord-Holland',
                b2: 'Zeeland',
                c2: 'Zuid-Holland', // correct
    
                letter3: 'C',
                a3: 'Eindhoven',
                b3: 'Venlo',
                c3: 'Maastricht' // correct 
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
        this.canvasHelper.Clear();
        this.removeButtons();

        this.question++;
        this.firstAnswer = 0;
        this.secondAnswer = 0;
        this.thirdAnswer = 0;

        this.canvasHelper.ChangeScreen(new AmericaEndResult);
    }

}