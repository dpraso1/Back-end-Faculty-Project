class Prisustvo {

    static trenutnaSedmica;
    
    constructor() {
        this.trenutnaSedmica = 1;
        this.prisustvo = 0;
        this.finalnoStanje = false;
    }

    izracunajPrisustvo(sedmica, listaPrisustva) {

  
        var rez= {greska:""};
        var S = sedmica;
        var LP = listaPrisustva;
            
            if (S <= 1 || S >= 15) {
                rez.greska = "Parametar sedmica nema vrijednost u rasponu od 1 do 15!";
                return rez;
            } else if ( S >= this.trenutnaSedmica) {
                rez.greska = "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!";
                return rez;
            }


            var obj = {
                prSedmica: "0",
                prisutan: "0",
                odsutan: "0",
                nijeUneseno: "0"
            }; 

            
            listaPrisustva = [obj];

    }

   
}

let proba = new Prisustvo();
let sedmica = 8;
let lp = `{
    [{
        "prsedmica": "1",
        "prisutan": "2",
        "odsutan": "3",
        "nijeUneseno": "4"
    },
    {
        "prsedmica": "1",
        "prisutan": "2",
        "odsutan": "5",
        "nijeUneseno": "4"
    },
    {
        "prsedmica": "1",
        "prisutan": "0",
        "odsutan": "3",
        "nijeUneseno": "4"
    }];
}`;


console.log(proba.izracunajPrisustvo(sedmica, lp));