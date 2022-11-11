class Prisustvo {

    static trenutnaSedmica;

    constructor() {
        this.trenutnaSedmica = 1;
        this.prisustvo = 0;
        this.finalnoStanje = false;
    }

    izracunajPrisustvo(sedmica, listaPrisustva) {


        let rez = { greska: ""};

        if (sedmica < 1 || sedmica > 15 || isNaN(sedmica)) {
            rez.greska = "Parametar sedmica nema vrijednost u rasponu od 1 do 15!";
            return rez;
        } else if (sedmica >= this.trenutnaSedmica) {
            rez.greska = "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!";
            return rez;
        }

       
        let ukupno_prisutan = 0;
        let ukupno_odsutan = 0;
        
        for (let i = 0; i < listaPrisustva.length; i++) {

            const dupleVrijednosti = listaPrisustva
                .map(v => v.prSedmica)
                .filter((v, i, vprS) => vprS.indexOf(v) !== i)
            
            //console.log(dupleVrijednosti.length);
            const listaDuplih = listaPrisustva
                .filter(obj => dupleVrijednosti.includes(obj.prSedmica));
            
           
            
            // console.log(listaDuplih.length)
           
                
               let zadnji = listaDuplih.pop();
                
            
            //console.log(zadnji)

            let greska_prSedmica = -1;
            let greska_prisutan = -1;
            let greska_odsutan = -1;
            let greska_nijeUneseno = -1;


            if (!listaPrisustva[i].hasOwnProperty('prSedmica') ||
                !listaPrisustva[i].hasOwnProperty('prisutan') ||
                !listaPrisustva[i].hasOwnProperty('odsutan') ||
                !listaPrisustva[i].hasOwnProperty('nijeUneseno')) {
                rez.greska = "Parametar listaPrisustva nema ispravne properties!";
                return rez;

            }
            if (listaPrisustva[i].prSedmica < 1 || listaPrisustva[i].prSedmica > 15) {
                greska_prSedmica = i;
            }
            if (listaPrisustva[i].prisutan < 0 || listaPrisustva[i].prisutan > 8) {
                greska_prisutan = i;
            }
            if (listaPrisustva[i].odsutan < 0 || listaPrisustva[i].odsutan > 8) {
                greska_odsutan = i;
            }
            if (listaPrisustva[i].nijeUneseno < 0 || listaPrisustva[i].nijeUneseno > 8) {
                greska_nijeUneseno = i;
            }

            if (greska_prSedmica != -1 || greska_prisutan != -1 || greska_odsutan != -1 || greska_nijeUneseno != -1) {

                rez.greska = "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + listaPrisustva[i].prSedmica + " za properties [";
                
                if (greska_prisutan != -1)
                    rez.greska += "prisutan";
                
                if (greska_odsutan != -1) {
                    if (greska_prisutan != -1)
                        rez.greska += ",odsutan";
                    else rez.greska += "odsutan"
                }
            
                if (greska_nijeUneseno != -1) {
                    if (greska_prisutan != -1 || greska_odsutan != -1)
                        rez.greska += ",nijeUneseno";
                    
                    else rez.greska += "nijeUneseno";
                }

                rez.greska += "]!";
                return rez;

            }
        
            
            if (listaPrisustva[i].prisutan + listaPrisustva[i].odsutan + listaPrisustva[i].nijeUneseno > 8) {
                rez.greska = "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!"
                return rez;
            }


            ukupno_prisutan += listaPrisustva[i].prisutan;
            ukupno_odsutan += listaPrisustva[i].odsutan;
            console.log(ukupno_prisutan)
            console.log(ukupno_odsutan)
            this.prisustvo = (ukupno_prisutan) / (ukupno_prisutan + ukupno_odsutan) * 100;
            let prisustvo = this.prisustvo.toFixed(2);
            console.log(prisustvo);

           /* if (listaPrisustva[i].nijeUneseno === 0) this.finalnoStanje;
            console.log(this.finalnoStanje)

           /* let obj = {
                prisistvoZaSedmicu:"",
                prisutan: "",
                odsutan: "",
                nijeUneseno: ""
            }

            let obj = Object.assign({}, listaPrisustva[i]);
          

            obj.prSedmica = sedmica;
            obj.prisistvoZaSedmicu=obj.prSedmica
            delete obj.prSedmica;
            console.log(obj)
            if(obj.prisistvoZaSedmicu == listaPrisustva[i].prSedmica)
            {
                
            }
         
           */

        }
        
        return console.log("nesto")



}

};


let proba = new Prisustvo();
let sedmica = 1;
let lp = `{
    [{
        "prSedmica": "1",
        "prisutan": "2",
        "odsutan": "0",
        "nijeUneseno": "0"
    },
    {
        "prSedmica": "1",
        "prisutan": "0",
        "odsutan": "0",
        "nijeUneseno": "0"
    },
    {
        "prSedmica": "1",
        "prisutan": "0",
        "odsutan": "0",
        "nijeUneseno": "0"
    }];
}`;

console.log(proba.izracunajPrisustvo(sedmica, lp));