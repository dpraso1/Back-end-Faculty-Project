class Prisustvo {

    static trenutnaSedmica;

    constructor() {
        this.trenutnaSedmica = 1;
        this.prisustvo = 0;
        this.finalnoStanje = false;
    }

    izracunajPrisustvo(sedmica, listaPrisustva) {


        var rez = { greska: "" };
        // var LP = listaPrisustva;

        if (sedmica < 1 || sedmica > 15 || isNaN(sedmica)) {
            rez.greska = "Parametar sedmica nema vrijednost u rasponu od 1 do 15!";
            return rez;
        } else if (sedmica >= this.trenutnaSedmica) {
            rez.greska = "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!";
            return rez;
        }


        listaPrisustva = [{
            prSedmica: "0",
            prisutan: "0",
            odsutan: "0",
            nijeUneseno: "4"
        },
        {
            prSedmica: "0",
            prisutan: "0",
            odsutan: "3",
            nijeUneseno: "0"
        },
        {
            prSedmica: "0",
            prisutan: "0",
            odsutan: "0",
            nijeUneseno: "1"
        }];

        for (var i = 0; i < listaPrisustva.length; i++) {

            const dupleVrijednosti = listaPrisustva
                .map(v => v.prSedmica)
                .filter((v, i, vprS) => vprS.indexOf(v) !== i)
            //console.log(dupleVrijednosti);
            const listaDuplih = listaPrisustva
                .filter(obj => dupleVrijednosti.includes(obj.prSedmica));
            //console.log(listaDuplih)

            let zadnji = listaDuplih.pop();
            //console.log(zadnji)
            if (!listaPrisustva[i].hasOwnProperty('prSedmica') ||
                !listaPrisustva[i].hasOwnProperty('prisutan') ||
                !listaPrisustva[i].hasOwnProperty('odsutan') ||
                !listaPrisustva[i].hasOwnProperty('nijeUneseno')) {
                rez.greska = "Parametar listaPrisustva nema ispravne properties!";
                return rez;

            }
            if (listaPrisustva[i].prSedmica < 1 || listaPrisustva[i].prSedmica > 15) {
                rez.greska = "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + listaPrisustva[i].prSedmica + " za properties!";
                return rez;
            }
            if (listaPrisustva[i].prisutan < 0 || listaPrisustva[i].prisutan > 8) {
                rez.greska = "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + listaPrisustva[i].prSedmica + " za properties!";
                return rez;
            }
            if (listaPrisustva[i].odsutan < 0 || listaPrisustva[i].odsutan > 8) {
                rez.greska = "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + listaPrisustva[i].prSedmica + " za properties!";
                return rez;
            }
            if (listaPrisustva[i].nijeUneseno < 0 || listaPrisustva[i].nijeUneseno > 8) {
                rez.greska = "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + listaPrisustva[i].prSedmica + " za properties!";
                return rez;
            }


        }
    }

};

/*
        LP = [{
            prSedmica: "18",
            prisutan: "0",
            odsutan: "0",
            nijeUneseno: "0"
        },
            {
                prSedmica: "0",
                prisutan: "0",
                odsutan: "0",
                nijeUneseno: "0"
            },
            {
                prSedmica: "0",
                prisutan: "0",
                odsutan: "0",
                nijeUneseno: "0"
            }];

        for (var i = 0; i < LP.length - 1; i++) {
            for (var j = i; j < LP.length; j++) {
        
                i++;
                j++;


                const unique = []

                const duplicates = LP.filter(o => {

                    if (unique.find(i => i.prSedmica === o.prSedmica)) {
                        return true
                    }

                    unique.push(o)
                    return false;
                });
                
                const posljednji = LP.lastIndexOf(LP[i])
                

                if (duplicates && posljednji != -1) {
                    
                    const rez = LP[posljednji];
                    
                    return rez;
                }
                if (!duplicates) {
                    if (!LP[i].prSedmica || !LP[i].prisutan || !LP[i].odsutan || !LP[i].nijeUneseno ||
                        !LP[j].prSedmica || !LP[j].prisutan || !LP[j].odsutan || !LP[j].nijeUneseno) {
                        rez.greska = "Parametar listaPrisustva nema ispravne properties!";
                        return rez;
                    } else
                        if (LP[i].prSedmica < 1 || LP[i].prSedmica > 15 ||
                            LP[j].prSedmica < 1 || LP[j].prSedmica > 15 ||
                            LP[i].prisutan < 0 || LP[i].prisutan > 8 ||
                            LP[j].prisutan < 0 || LP[j].prisutan > 8 ||
                            LP[i].odsutan < 0 || LP[i].odsutan > 8 ||
                            LP[j].odsutan < 0 || LP[j].odsutan > 8 ||
                            LP[i].nijeUneseno < 0 || LP[i].nijeUneseno > 8 ||
                            LP[j].nijeUneseno < 0 || LP[j].nijeUneseno > 8) {
                    
                            rez.greska = "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + LP[i].prSedmica + " za properties!";
                            return rez;
                
                        } else console.log("gr");
                }
            }
            
        } */



let proba = new Prisustvo();
let sedmica = 1;
let lp = `{
    [{
        "prSedmica": "0",
        "prisutan": "0",
        "odsutan": "0",
        "nijeUneseno": "0"
    },
    {
        "prSedmica": "0",0
        "prisutan": "0",
        "odsutan": "0",
        "nijeUneseno": "0"
    },
    {
        "prSedmica": "0",
        "prisutan": "0",
        "odsutan": "",
        "nijeUneseno": "0"
    }];
}`;

console.log(proba.izracunajPrisustvo(sedmica, lp));