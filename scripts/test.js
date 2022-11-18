let assert = chai.assert;
describe('Prisustvo', function () {
    describe('#izracunajPrisustvo()', function () {
      
        it('parametar sedmica nema vrijednost u rasponu od 1 do 15 (uključujući 1 i 15) - negativna vrijednost', function () {
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

        it('parametar sedmica nema vrijednost u rasponu od 1 do 15 (uključujući 1 i 15) - decimalna vrijednost', function () {
            let proba1 = new Prisustvo();
            let sedmica1 = 0.5;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });

        it('parametar sedmica nema vrijednost u rasponu od 1 do 15 (uključujući 1 i 15) - vrijednost veća od 15', function () {
            let proba1 = new Prisustvo();
            let sedmica1 = 16;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 5, odsutan: 2, nijeUneseno: 1}, 
                 { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });
    
        it('parametar sedmica ima vrijednost koja je veća od vrijednosti atributa trenutnaSedmica', function () {
            let proba1 = new Prisustvo();
            Prisustvo.trenutnaSedmica = 1;
            let sedmica1 = 3;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 1, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 1, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });

        it('parametar sedmica ima vrijednost koja je veća od vrijednosti atributa trenutnaSedmica', function () {
            let proba1 = new Prisustvo();
            Prisustvo.trenutnaSedmica = 9;
            let sedmica1 = 13;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 1, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 1, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });
        
        it('parametar sedmica ima vrijednost koja je veća od vrijednosti atributa trenutnaSedmica', function () {
            let proba1 = new Prisustvo();
            Prisustvo.trenutnaSedmica = 9;
            let sedmica1 = 24;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 1, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 1, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });
      
        it('objekat ili objekti parametra listaPrisustva ima/imaju neispravan jedan ili više properties (npr. nemaju property prisustvo)', function () {
            let proba1 = new Prisustvo();
            Prisustvo.trenutnaSedmica = 2;
            let sedmica1 = 1;
            let lp1 = `{
                [{ prSedmica: 1, , odsutan: 2, nijeUneseno: 0 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar listaPrisustva nema ispravne properties!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });

        it('objekat ili objekti parametra listaPrisustva ima/imaju neispravan jedan ili više properties (npr. nemaju property prisustvo)', function () {
            let proba1 = new Prisustvo();
            let sedmica1 = 1;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 1, odsutan: 2, nijeUneseno: -10 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar listaPrisustva nema ispravne properties!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });

        it('objekat ili objekti parametra listaPrisustva ima/imaju neispravan jedan ili više properties (npr. nemaju property prisustvo)', function () {
            let proba1 = new Prisustvo();
            let sedmica1 = 1;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 1, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: -2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1,  }];
            }`;
            let g1 = { greska: "Parametar listaPrisustva nema ispravne properties!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });

        it('objekat ili objekti parametra listaPrisustva ima/imaju neispravan jedan ili više properties (npr. nemaju property prisustvo)', function () {
            let proba1 = new Prisustvo();
            let sedmica1 = 1;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 1, odsutan: 2, nijeUneseno: 1 }, 
                 { , prisutan: 2, odsutan: -2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1,  }];
            }`;
            let g1 = { greska: "Parametar listaPrisustva nema ispravne properties!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });

        it('zbir properties prisutan, odsutan i nijeUneseno za jednu ili više sedmica je veći od 8)', function () {
            let proba1 = new Prisustvo();
            Prisustvo.trenutnaSedmica = 7;
            let sedmica1 = 2;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 6, odsutan: 6, nijeUneseno: 6 }, 
                 { prSedmica: 1, prisutan: 6, odsutan: 6, nijeUneseno: 6 }, 
                 { prSedmica: 1, prisutan: 6, odsutan: 6, nijeUneseno: 6 }];
            }`;
            let g1 = { greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });
  
        it('parametri sedmica i listaPrisustva ne ispunjavaju više uslova', function () {
            let proba1 = new Prisustvo();
            Prisustvo.trenutnaSedmica = 9;
            let sedmica1 = 24;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 6, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: -7, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });

        it('parametri sedmica i listaPrisustva ne ispunjavaju više uslova', function () {
            let proba1 = new Prisustvo();
            Prisustvo.trenutnaSedmica = 9;
            let sedmica1 = 2;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 6, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: -7, nijeUneseno: 1 }];
            }`;
            let g1 = { greska: "Parametar listaPrisustva nema ispravne properties!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });
        
        it('parametri sedmica i listaPrisustva ne ispunjavaju više uslova', function () {
            let proba1 = new Prisustvo();
            Prisustvo.trenutnaSedmica = 9;
            let sedmica1 = 12;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 6, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: -7, }];
            }`;
            let g1 = { greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });
        it('parametri sedmica i listaPrisustva ne ispunjavaju više uslova', function () {
            let proba1 = new Prisustvo();
            Prisustvo.trenutnaSedmica = 20;
            let sedmica1 = 17;
            let lp1 = `{
                [{ prSedmica: 1, , odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: -7, }];
            }`;
            let g1 = { greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!" };

            assert.deepEqual(proba1.izracunajPrisustvo(sedmica1, lp1), g1);
        });

        it('metoda ispravno računa vrijednost atributa prisustvo', function () {
            let proba1 = new Prisustvo();
            Prisustvo.trenutnaSedmica = 2;
            let sedmica1 = 1;
            let lp1 = `{
                [{ prSedmica: 1, prisutan: 1, odsutan: 2, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 2, odsutan: 1, nijeUneseno: 1 }, 
                 { prSedmica: 1, prisutan: 1, odsutan: 1, nijeUneseno: 1 }];
            }`;
            let prisutan = 4;
            let odsutan = 4;
            proba1.prisustvo = (prisutan)/(prisutan+odsutan) * 100;

            assert.deepEqual(proba1.prisustvo, 50);
        });

    });
});
