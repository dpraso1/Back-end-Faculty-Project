class Prisustvo {

    static trenutnaSedmica = 1;

    constructor() {

        this.prisustvo = 0;
        this.finalnoStanje = false;
    }

    izracunajPrisustvo(sedmica, listaPrisustva) {


        let rez = { greska: "" };
        // var LP = listaPrisustva;

        if (sedmica < 1 || sedmica > 15 || isNaN(sedmica)) {
            rez.greska = "Parametar sedmica nema vrijednost u rasponu od 1 do 15!";
            return rez;
        }
        if (sedmica >= Prisustvo.trenutnaSedmica) {
            rez.greska = "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!";
            return rez;
        }


        for (let i = 0; i < listaPrisustva.length; i++) {

            if (!listaPrisustva[i].hasOwnProperty('prSedmica') ||
                !listaPrisustva[i].hasOwnProperty('prisutan') ||
                !listaPrisustva[i].hasOwnProperty('odsutan') ||
                !listaPrisustva[i].hasOwnProperty('nijeUneseno')) {
                rez.greska = "Parametar listaPrisustva nema ispravne properties!";
                return rez;

            }
        }
        let greska_prSedmica = -1;
        let greska_prisutan = -1;
        let greska_odsutan = -1;
        let greska_nijeUneseno = -1;

        for (let i = 0; i < listaPrisustva.length; i++) {

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
        }

        for (let i = 0; i < listaPrisustva.length; i++) {
            if ((listaPrisustva[i].prisutan + listaPrisustva[i].odsutan + listaPrisustva[i].nijeUneseno) > 8) {
                rez.greska = "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!"
                return rez;
            }
        }

        let ukupno_prisutan = 0;
        let ukupno_odsutan = 0;
        for (let i = 0; i < listaPrisustva.length; i++) {
            ukupno_prisutan += listaPrisustva[i].prisutan;
            ukupno_odsutan += listaPrisustva[i].odsutan;
        }

        console.log(ukupno_prisutan)
        console.log(ukupno_odsutan)
        this.prisustvo = (ukupno_prisutan) / (ukupno_prisutan + ukupno_odsutan) * 100;
        let prisustvo = this.prisustvo.toFixed(2);
        console.log(prisustvo);

        let provjeri = true;

        for (let i = 0; i < listaPrisustva.length; i++) {
            if (listaPrisustva[i].nijeUneseno != 0)
                provjeri = false;
            
        } if (provjeri) {
            this.finalnoStanje = true;
        } else {
            this.finalnoStanje = false;
        }

        console.log(this.finalnoStanje)

    }

};
let proba = new Prisustvo();
console.log(Prisustvo.trenutnaSedmica);
Prisustvo.trenutnaSedmica = 7;
console.log(Prisustvo.trenutnaSedmica);
const lp1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 1 },
{ prSedmica: 4, prisutan: -2, odsutan: -2, nijeUneseno: -1 },
{ prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
console.log(proba.izracunajPrisustvo(2, lp1));
console.log(proba.prisustvo);
console.log(proba.finalnoStanje);