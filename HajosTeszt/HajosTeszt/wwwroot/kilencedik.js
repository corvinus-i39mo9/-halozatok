
var kerdesek;
var aktualisKerdes;
var kerdesszam;
var hovaKattintottam;
var helyesvalasz = 0;

window.addEventListener('load', (event) => {
    aktualisKerdes = 0;
    fetch('/questions/1')
        .then(response => response.json())
        .then(data => kérdésBetöltés(data)
        );
});

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));   

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kerdes_szoveg").innerText = kérdés.questionText
    document.getElementById("valasz1").innerText = kérdés.answer1
    document.getElementById("valasz2").innerText = kérdés.answer2
    document.getElementById("valasz3").innerText = kérdés.answer3
    document.getElementById("kep").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    letoltesvege() ;
}

function letoltesvege(d) {
    console.log("Sikeres letöltés");
    console.log(d);
    kerdesek = d;
    kerdesszam = kerdesek.length;
    kerdesmegjelenit(0);
    aktualisKerdes = 0;

    document.getElementById("vissza").addEventListener('click', (event) => {
            kerdesmegjelenit(aktualisKerdes - 1);
        aktualisKerdes -= 1;
    });
    document.getElementById("elore").addEventListener('click', (event) => {
            kerdesmegjelenit(aktualisKerdes + 1);
        aktualisKerdes += 1;
    });
    /*
    document.getElementById("valasz1").addEventListener('click', (event) => {
        hovaKattintottam = 1;
        console.log(helyesvalasz);
        document.getElementById("valasz1").style.backgroundColor = "red";
        if (helyesvalasz = hovaKattintottam) {
            document.getElementById("valasz1").style.backgroundColor = "green";
        }
    });
    document.getElementById("valasz2").addEventListener('click', (event) => {
        hovaKattintottam = 2;
        console.log(helyesvalasz);
        document.getElementById("valasz2").style.backgroundColor = "red";
        if (helyesvalasz = hovaKattintottam) {
            document.getElementById("valasz2").style.backgroundColor = "green";
        }
    });
    document.getElementById("valasz3").addEventListener('click', (event) => {
        hovaKattintottam = 3;
        console.log(helyesvalasz);
        document.getElementById("valasz3").style.backgroundColor = "red";
        if (helyesvalasz = hovaKattintottam) {
            document.getElementById("valasz3").style.backgroundColor = "green";
        }
    });
    */
}

