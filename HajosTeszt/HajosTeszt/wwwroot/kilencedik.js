
var kerdesek;
var aktualisKerdes = 1;
var helyesvalasz = 0;

window.onload = function (e) {
    console.log("Oldal betöltve...");
    kerdesBetoltes(aktualisKerdes);
    document.getElementById("elore").onclick = elorefv();
    document.getElementById("vissza").onclick = visszafv();
}

function kerdesBetoltes(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kerdesMegjelenites(data));
}

function kerdesMegjelenites(kerdes) {
    if (!kerdes) return;
    aktualisKerdes = kerdes.id;
    console.log(kerdes);
    document.getElementById("kerdes_szoveg").innerText = kerdes.questionText
    document.getElementById("valasz1").innerText = kerdes.answer1
    document.getElementById("valasz2").innerText = kerdes.answer2
    document.getElementById("valasz3").innerText = kerdes.answer3
    helyesvalasz = kerdes.correctAnswer;
    if (kerdes.image) {
        document.getElementById("kep").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
        document.getElementById("kep").classList.remove("rejtett")
    }
    else {
        document.getElementById("kep").classList.add("rejtett")
    }
    document.getElementById("valasz1").classList.remove("jo", "rossz");
    document.getElementById("valasz2").classList.remove("jo", "rossz");
    document.getElementById("valasz3").classList.remove("jo", "rossz");
}
function valasztas(szam) {
    console.log(helyesvalasz);
    document.getElementById("valasz" + szam).style.backgroundColor = "red";
    if (helyesvalasz = szam) {
        document.getElementById("valasz" + szam).style.backgroundColor = "green";
    }
}

function elorefv() {
    aktualisKerdes++;
    kerdesMegjelenites(aktualisKerdes)
}

function visszafv() {
    aktualisKerdes--;
    kerdesMegjelenites(aktualisKerdes)
}

