let assert = chai.assert;
describe('Prisustvo', function () {
    describe('#izracunajPrisustvo()', function () {
        //TEST 1
        it('parametar sedmica nema vrijednost u rasponu od 1 do 15 (uključujući 1 i 15)', function () {
            let proba1 = new Prisustvo();
            let sedmica1 = -1;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });
        //TEST2
        it('parametar ima vrijednost koja je veća od vrijednosti atributa trenutnaSedmica', function () {
            let proba1 = new Prisustvo();
            let sedmica1 = 3;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });
       

    });
});




