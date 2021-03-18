window.onload = function () {
    console.log("betöltõdött")
    let x = document.getElementById("pascal");
    for (var sor = 0; sor < 10; sor++) {
        let ujsor = document.createElement("div");
        x.appendChild(ujsor);
        ujsor.classList.add("sor");
        ujsor.setAttribute("id", `${sor+1}`);
        for (var oszlop = 0; oszlop <= sor; oszlop++) {
            let ujelem = document.createElement("div");
            ujsor.appendChild(ujelem);
            try {
                if (sor < 3) {
                    ujelem.innerHTML = `1`;
                    document.getElementById("32").innerHTML = '2';
                }
                else {
                    let seged1 = (sor && oszlop);
                    let seged2 = (sor && oszlop + 1);
                    let seged3 = document.getElementById(seged1).innerText;
                    let seged4 = document.getElementById(seged2).innerText;
                    let faktorialis = fakt(seged3, seged4);
                    ujelem.innerText = faktorialis;
                }
            } catch (e) {
                ujelem.innerHTML = `1`;
            }
            
            ujelem.setAttribute("id", `${sor+1}${oszlop+1}`);
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