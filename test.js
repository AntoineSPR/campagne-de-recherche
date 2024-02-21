let nombreTroupes = {
    "offre": 0,
    "entreprise": 0,
    "infos": 0,
    "messager" : 0,
    "audience" : 0,
    "negociation" : 0;
    "soldats" : 0; 
    "entrainement" : 0;
    "renfort" : 0;
};

function deployerTroupes(troupe, zone) {
    troupe.addEventListener("click", () => {
        let compte=nombreTroupes[troupe.id];
    
    if (compte > 15) {
        console.log(`Nombre maximum d'unités ${troupe.id} déployées`);
        return;
    }
    
    let zoneInterne = zone.querySelector(`.${troupe.id}`);
        zoneInterne.innerHTML += `<div>${troupe.innerHTML}</div>`;
    nombreTroupes[troupe.id]++;
    updateScore(troupe.id);
        
        for (let i = 0; i < score.length; i++) {
            let valeurScore = parseInt(score[i].innerText);
            let valeurObj = parseInt(obj[i].innerText);
            
            if (valeurScore === valeurObj) {
                score[i].style.color = "green";
                obj[i].style.color = "green";
            }
        }

        let toutVert = Array.from(score).every(element => {
            return element.style.color === "green";
        });
        
        if (toutVert) {
            affichageRapport.innerHTML = `<img src='images/scroll.png' alt='rapport rempli'>`;
        }
    })
}

function updateScore(unite) {
    let scoreElement = document.getElementById(`score-${unit}`);
    scoreElement.innerText = nombreTroupes[unit];
}

deployerTroupes(offre, deploiementReco);
deployerTroupes(entreprise, deploiementReco);
deployerTroupes(infos, deploiementReco);
deployerTroupes(messager, deploiementComm);
deployerTroupes(audience, deploiementComm);
deployerTroupes(negociation, deploiementComm);
deployerTroupes(soldats, deploiementPrep);
deployerTroupes(entrainement, deploiementPrep);
deployerTroupes(renfort, deploiementPrep);
////////////////////////////////////////////////



function deployerTroupes(troupe) {
    


