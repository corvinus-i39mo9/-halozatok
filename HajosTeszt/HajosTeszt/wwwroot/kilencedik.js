
var kerdesek;
var aktualisKerdes;
var kerdesszam;
var hovaKattintottam;
var helyesvalasz = 0;

window.addEventListener('load', (event) => {
    aktualisKerdes = 0;
    fetch('/questions/1')
        .then(response => response.json())
        .then(data => k�rd�sBet�lt�s(data)
        );
});

function k�rd�sBet�lt�s(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hib�s v�lasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => k�rd�sMegjelen�t�s(data));   

function k�rd�sMegjelen�t�s(k�rd�s) {
    console.log(k�rd�s);
    document.getElementById("kerdes_szoveg").innerText = k�rd�s.questionText
    document.getElementById("valasz1").innerText = k�rd�s.answer1
    document.getElementById("valasz2").innerText = k�rd�s.answer2
    document.getElementById("valasz3").innerText = k�rd�s.answer3
    document.getElementById("kep").src = "https://szoft1.comeback.hu/hajo/" + k�rd�s.image;
    letoltesvege() ;
}

function letoltesvege(d) {
    console.log("Sikeres let�lt�s");
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

