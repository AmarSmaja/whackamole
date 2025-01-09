let bodoviP = document.getElementById('bodovi')
let preostaloVrijemeP = document.getElementById('vrijeme')
let pocniIgruBtn = document.getElementById('novaIgrica')
let restartIgruBtn = document.getElementById('restartIgricu')
let grid = document.getElementsByClassName('grid')[0];

//Kod preuzet sa: https://stackoverflow.com/questions/9419263/how-to-play-audio
let clickMuzika = new Audio('../IMG/click.mp3')
let losaMuzika = new Audio('../IMG/los.mp3')
let krajTajmera = new Audio('../IMG/vrijeme.mp3')

let bodovi = 0
let preostaloVrijeme = 30
let pozicija = null
let tajmerId = null
let randomSlikaId = null

let listaSvakih2 = ['projekat', 'padispita1', 'test']
let listaSvakih10 = ['padispita2', 'zavrsniIspit']
let listaSvakih30 = ['bonus1', 'bonus2', 'padispita2']

function randomKlasa(classList) {
    let randomIndeks = Math.floor(Math.random() * classList.length)
    return classList[randomIndeks]
}

//Kod nisam direktno uzeo sa stranice, ali sam koristio ove linkove da bih dosao do ovog koda:
//Za classList sam naucio ovdje: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
//Za setTimeout funkciju sam naucio ovdje: https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
function dodajKlasu(classList) {
    let kocke = document.querySelectorAll('.kocka');
    let randomKocka = kocke[Math.floor(Math.random() * kocke.length)];
    let odabranaKlasa = randomKlasa(classList);

    let klaseKocke = randomKocka.classList;
    
    //Kod nije preuzet, nego sam koristio ovaj link da uradim forEach: 
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    klaseKocke.forEach(function(klasa) {
        if (klasa !== 'kocka') {
            randomKocka.classList.remove(klasa);
        }
    });

    randomKocka.classList.add(odabranaKlasa);

    setTimeout(() => {
        randomKocka.classList.remove(odabranaKlasa);
    }, 2000);
}

function pocniIgru() {
    bodovi = 0;
    preostaloVrijeme = 30;

    bodoviP.innerHTML = 'Vasi bodovi: 0';
    preostaloVrijemeP.innerHTML = 'Preostalo vrijeme: 30s';

    tajmerId = setInterval(() => {
        dodajKlasu(listaSvakih2);
    }, 2000);

    setInterval(odbrojavanje, 1000);
}

function refreshIgru() {
    location.reload()
}

function odbrojavanje() {
    preostaloVrijeme--
    preostaloVrijemeP.innerHTML = `Preostalo vrijeme: ${preostaloVrijeme}s`

    if (preostaloVrijeme == 0) {
        location.reload()
    }
}

//Dio koda preuzet sa: https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class
document.querySelectorAll('.kocka').forEach(kocka => {
    kocka.addEventListener('click', function izbrisiKlase() {
        if (kocka.classList.contains('projekat')) {
            bodovi += 10;
        } else if (kocka.classList.contains('padispita1')) {
            bodovi -= 50;
        } else if (kocka.classList.contains('zavrsniIspit')) {
            bodovi += 20
        } else if (kocka.classList.contains('test')) {
            bodovi += 5
        } else if (kocka.classList.contains('bonus1')) {
            bodovi += 50
        } else if (kocka.classList.contains('bonus2')) {
            preostaloVrijeme += 5
        } else if (kocka.classList.contains('padispita2')) {
            bodovi = 0
        }
        bodoviP.innerText = `Bodovi: ${bodovi}`;

        kocka.classList.remove('projekat', 'padispita1', 'padispita2', 'test', 'zavrsniIspit', 'bonus1', 'bonus2');
        kocka.removeEventListener('click', izbrisiKlase);
    });
});

pocniIgruBtn.addEventListener('click', pocniIgru)
restartIgruBtn.addEventListener('click', refreshIgru)