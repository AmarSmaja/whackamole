let bodoviP = document.getElementById('bodovi')
let preostaloVrijemeP = document.getElementById('vrijeme')
let pocniIgruBtn = document.getElementById('novaIgrica')
let restartIgruBtn = document.getElementById('restartIgricu')
let grid = document.getElementsByClassName('grid')[0]
let nazadPocetnaBtn = document.querySelector('.nazadPocetna')

//Kod preuzet sa: https://stackoverflow.com/questions/9419263/how-to-play-audio
let clickMuzika = new Audio('../IMG/click.mp3')
let losaMuzika = new Audio('../IMG/los.mp3')
let jokerMuzika = new Audio('../IMG/joker.mp3')

let bodovi = 0
let preostaloVrijeme = 30
let pozicija = null
let tajmerId = null
let randomSlikaId = null

let listaSvakih2 = ['projekat', 'padispita1', 'test']
let listaSvakih10 = ['padispita2', 'zavrsniIspit', 'bonus2', 'bonus1']
let listaSvakih30 = ['bonus1', 'bonus2', 'padispita2']
let specijalni = ['joker', 'hide', 'scale', 'home']

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
    //Za brisanje svake klase osim glavne, kod koristen od: 
    //https://bito.ai/resources/remove-all-classes-javascript-javascript-explained/
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

    setInterval(() => {
        dodajKlasu(listaSvakih2);
    }, 2000);
    
    setInterval(() => {
        dodajKlasu(listaSvakih10);
    }, 5000);
    
    setInterval(() => {
        dodajKlasu(listaSvakih30);
    }, 10000);

    setInterval(() => {
        dodajKlasu(specijalni);
    }, 5000)

    // tajmerId = setInterval(() => {
    //     dodajKlasu(listaSvakih2);
    // }, 2000);

    setInterval(odbrojavanje, 1000);
}

function refreshIgru() {
    location.reload()
}

function nazadPocetnu() {
    window.location.href = 'pocetna.html'
}

function odbrojavanje() {

    preostaloVrijeme--
    preostaloVrijemeP.innerHTML = `Preostalo vrijeme: ${preostaloVrijeme}s`
    
    if (preostaloVrijeme == 0) {
        location.reload()
    }
}

//Dio koda preuzet sa: https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class
grid.addEventListener('click', function(e) {
    //Kod preuzet sa linka: https://www.freecodecamp.org/news/event-delegation-javascript/
    //na linku se koristi za ime taga, dok sam ja napravio da radi preko klase
    if (e.target.classList.contains('kocka')) {
    document.querySelectorAll('.kocka').forEach(kocka => {
    kocka.addEventListener('click', function izbrisiKlase() {
        console.log(kocka.classList);
        
        if (kocka.classList.contains('projekat')) {
            bodovi += 10;
            clickMuzika.play()
        } else if (kocka.classList.contains('padispita1')) {
            bodovi -= 50;
            losaMuzika.play()
        } else if (kocka.classList.contains('zavrsniIspit')) {
            bodovi += 20
            clickMuzika.play()
        } else if (kocka.classList.contains('test')) {
            bodovi += 5
            clickMuzika.play()
        } else if (kocka.classList.contains('bonus1')) {
            bodovi += 50
            clickMuzika.play()
        } else if (kocka.classList.contains('bonus2')) {
            preostaloVrijeme += 5
            clickMuzika.play()
        } else if (kocka.classList.contains('padispita2')) {
            bodovi = 0
            losaMuzika.play()
        } else if (kocka.classList.contains('joker')) {
            window.open()
            jokerMuzika.play()
        } else if (kocka.classList.contains('hide')) {
            document.body.style.opacity = 0.2
        } else if (kocka.classList.contains('scale')) {
            kocka.style.transition = 'transform 0.4s';
            kocka.style.transform = 'scale(0.2)';
        } else if (kocka.classList.contains('home')) {
            window.location.href = 'pocetna.html'
        }

        bodoviP.innerText = `Bodovi: ${bodovi}`;

        kocka.classList.remove('projekat', 'padispita1', 'padispita2', 'test', 'zavrsniIspit', 'bonus1', 'bonus2', 'joker', 'hide', 'scale', 'home');
        kocka.removeEventListener('click', izbrisiKlase);
    });
});
    }
})

pocniIgruBtn.addEventListener('click', pocniIgru)
restartIgruBtn.addEventListener('click', refreshIgru)
nazadPocetnaBtn.addEventListener('click', nazadPocetnu)