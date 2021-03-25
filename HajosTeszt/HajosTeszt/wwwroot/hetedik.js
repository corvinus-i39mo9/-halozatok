
var kerdesek;
var aktualisKerdes;
var kerdesszam;
var hovaKattintottam;
var helyesvalasz = 0;

window.addEventListener('load', (event) => {
    aktualisKerdes = 0;
    letoltes();
});

function letoltes() {
    fetch('questions.json')
        .then(response => response.json())
        .then(data => letoltesvege(data))
}

function kerdesmegjelenit(k) {
    temp1 = (kerdesek[k].questionText);
    temp2 = (kerdesek[k].answer1);
    temp3 = (kerdesek[k].answer2);
    temp4 = (kerdesek[k].answer3);
    helyesvalasz = (kerdesek[k].correctAnswer);
    temp6 = (kerdesek[k].image);
    document.getElementById("kerdes_szoveg").innerText = temp1;
    document.getElementById("valasz1").innerText = temp2;
    document.getElementById("valasz2").innerText = temp3;
    document.getElementById("valasz3").innerText = temp4;
    kepforras = "https://szoft1.comeback.hu/hajo/" + temp6;
    if (temp6 != null) {
        document.getElementById("kep1").style.visibility = "visible";
        document.getElementById("kep1").src = kepforras;
    }
    else {
        document.getElementById("kep1").style.visibility = "hidden";
    }
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

