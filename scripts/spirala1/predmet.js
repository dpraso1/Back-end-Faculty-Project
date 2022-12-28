class Predmet {

    kodPredmeta = "";

    provjeriKodPredmeta(kod) {
        var KOD = kod.value;
        var regex1 = new RegExp(/^(RI|AE|EE|TK)-(BoE)-([1-3])-([1-2])$/);
        var regex2 = new RegExp(/^(RI|AE|EE|TK)-(MoE|RS)-([1-2])-([1-2])$/);

        
        if (kod < 10 || !(regex1.test(kod) || regex2.test(kod))) {
            this.kodPredmeta = KOD;
            return false
        } else return true
         
    }
}
let proba = new Predmet();
console.log(proba.provjeriKodPredmeta("RI-BoE-1-1"));
console.log(proba.provjeriKodPredmeta("TK-MoE-2-1"));
console.log(proba.provjeriKodPredmeta("AE-BoE-1"));
console.log(proba.provjeriKodPredmeta("RS-boe-1-2"));
console.log(proba.provjeriKodPredmeta("AE-RS-1-2"));