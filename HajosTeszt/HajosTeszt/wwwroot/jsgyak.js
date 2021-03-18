window.onload = function () {
    console.log("betöltõdött")
    let x = document.getElementById("pascal");
    for (var sor = 0; sor < 10; sor++) {
        let ujsor = document.createElement("div");
        x.appendChild(ujsor);
        ujsor.classList.add("sor");
        ujsor.setAttribute("id", `${sor}`);
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            let ujelem = document.createElement("div");
            ujsor.appendChild(ujelem);
            if (sor < 2) {
                ujelem.innerHTML = `1`
                break;
            }
            else {
                let seged1 = (sor - 1 && oszlop - 1);
                let seged2 = (sor - 1 && oszlop + 1);
                fakt(document.getElementById(seged1).innerHTML, document.getElementById(seged2).innerHTML);
            }
            ujelem.setAttribute("id", `${sor}${oszlop}`);
            ujelem.classList.add("elem");
            ujelem.style.backgroundColor = `rgb(255,${255 / 10 * sor},${255 / 10 * -oszlop})`;
        }
    }
}
let fakt = function (szam1, szam2) {
    let szam3 = szam1 - szam2;
    let er1 = 1;
    for (let i = 2; i <= szam1; i++) {
        er1 = er1 * i;
    }
    let er2 = 1;
    for (let i = 2; i <= szam2; i++) {
        er2 = er2 * i;
    }
    let er3 = 1;
    for (let i = 2; i <= szam3; i++) {
        er3 = er3 * i;
    }
    return er1 / (er2 * er3);
}