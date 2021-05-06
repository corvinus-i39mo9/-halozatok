var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

function init() {
    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0
        }
    }

    document.getElementById("elore_gomb").addEventListener("click", elore);
    document.getElementById("vissza_gomb").addEventListener("click", vissza);

    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }

    if (localStorage.getItem("nwxtQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nwxtQuestion"));
    }

    if (hotList.length == 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kerdesBetoltes(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        kerdesMegjelenites();
        console.log("LocalStorage-ból jönnek a kérdések");
    }

    fetch("/questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })    
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

function kerdesMegjelenites() {
    let kerdes = hotList[displayedQuestion].question;
    document.getElementById(`valasz1`).style.pointerEvents = "auto";
    document.getElementById(`valasz2`).style.pointerEvents = "auto";
    document.getElementById(`valasz3`).style.pointerEvents = "auto";
    document.getElementById(`valasz1`).classList.remove("jo", "rossz");
    document.getElementById(`valasz2`).classList.remove("jo", "rossz");
    document.getElementById(`valasz3`).classList.remove("jo", "rossz");
    console.log(kerdes);
    document.getElementById("kerdes_szoveg").innerText = kerdes.questionText;
    document.getElementById("valasz1").innerText = kerdes.answer1;
    document.getElementById("valasz2").innerText = kerdes.answer2;
    document.getElementById("valasz3").innerText = kerdes.answer3;
    helyesvalasz = kerdes.correctAnswer;
    if (kerdes.image) {
        document.getElementById("kep1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image;
        document.getElementById("kep1").style.display = "block";
    }
    else {
        document.getElementById("kep1").style.display = "none";
    }
    document.getElementById("valasz1").classList.remove("jo", "rossz");
    document.getElementById("valasz2").classList.remove("jo", "rossz");
    document.getElementById("valasz3").classList.remove("jo", "rossz");
}

window.onload = init;

function elore() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) displayedQuestion = 0;
    kerdesMegjelenites();
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kerdesMegjelenites();
}

function valasztas(szam, valasszam) {
    console.log(helyesvalasz);
    
    if (helyesvalasz == szam) {
        hotList[displayedQuestion].goodAnswers++;
        document.getElementById(valasszam).classList.add("jo");
    }
    else {
        hotList[displayedQuestion].goodAnswers = 0;
        document.getElementById(valasszam).classList.add("rossz");
        document.getElementById('valasz' + helyesvalasz).classList.add("jo");
    }
    if (hotList[displayedQuestion].goodAnswers == 3) {
        kerdesBetoltes(nextQuestion, displayedQuestion);
        nextQuestion++;
    }
    document.getElementById(`valasz1`).style.pointerEvents = "none";
    document.getElementById(`valasz2`).style.pointerEvents = "none";
    document.getElementById(`valasz3`).style.pointerEvents = "none";
    timerHandler = setTimeout(elore, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nwxtQuestion", nextQuestion);
}