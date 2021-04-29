
var helyesvalasz = 0;

var timeoutHandler;
var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;

window.onload = function (e) {
    console.log("Oldal betöltve...");
    init();
}

function kerdesBetoltes(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kerdesMegjelenites();
                }
            }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    for (var i = 0; i < questionsInHotList; i++) {
        kerdesBetoltes(nextQuestion, i);
        nextQuestion++;
    }
}

function kerdesMegjelenites() {
    let kerdes = hotList[displayedQuestion].question;
    document.getElementById(`valasz1`).style.pointerEvents = "auto";
    document.getElementById(`valasz2`).style.pointerEvents = "auto";
    document.getElementById(`valasz3`).style.pointerEvents = "auto";
    document.getElementById(`valasz1`).style.backgroundColor = "white";
    document.getElementById(`valasz2`).style.backgroundColor = "white";
    document.getElementById(`valasz3`).style.backgroundColor = "white";
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
function valasztas(szam, valasszam) {
    console.log(helyesvalasz);
    document.getElementById(valasszam).style.backgroundColor = "red";
    if (helyesvalasz == szam) {
        hotList[displayedQuestion].goodAnswers++;
        document.getElementById(valasszam).style.backgroundColor = "green";
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
    }
    if (hotList[displayedQuestion].goodAnswers == 3) {
        kerdesBetoltes(nextQuestion, displayedQuestion);
        nextQuestion++;
    }
    document.getElementById(`valasz1`).style.pointerEvents = "none";
    document.getElementById(`valasz2`).style.pointerEvents = "none";
    document.getElementById(`valasz3`).style.pointerEvents = "none";
    timeoutHandler = setTimeout(elore, 3000);
}

function elore() {
    clearTimeout(timeoutHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenites()
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenites()
}

