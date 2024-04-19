//////////////////////////////////////////////////////
// Fonction pour deployer les éléments sélectionnés :
//////////////////////////////////////////////////////

function deployerTroupes(troupe, zone) {
    troupe.addEventListener("click", () => {
        let compte=nombreTroupes[troupe.id];
    
    if (compte >= 16) {
        console.log(`Nombre maximum d'unités ${troupe.id} déployées`);
        return;
    }
    
    let zoneInterne = zone.querySelector(`.${troupe.id}`);
        zoneInterne.innerHTML += `<div>${troupe.innerHTML}</div>`;
    nombreTroupes[troupe.id]++;

    majScore(troupe.id);
    verifObjectif();

    })
}

deployerTroupes(offre, deploiementReco);
deployerTroupes(entreprise, deploiementReco);
deployerTroupes(infos, deploiementReco);
deployerTroupes(mail, deploiementComm);
deployerTroupes(appel, deploiementComm);
deployerTroupes(entretien, deploiementComm);
deployerTroupes(reseau, deploiementPrep);
deployerTroupes(entrainement, deploiementPrep);
deployerTroupes(projet, deploiementPrep);

//////////////////////////////////////////////////////
// Fonction pour modifier le score au déploiement/retrait de l'unité correspondante : 
//////////////////////////////////////////////////////

function majScore(unite) {
    let scoreElement = document.querySelector(`.score-${unite}`);
    if (scoreElement) {
    scoreElement.innerText = nombreTroupes[unite];
    }
}

//////////////////////////////////////////////////////
// Fonction pour changer la couleur du score lorsque l'objectif est atteint, puis
// Afficher l'icône de victoire lorsque tous les scores sont au vert :
//////////////////////////////////////////////////////

function verifObjectif() {
    for (let i = 0; i < score.length; i++) {
        let valeurScore = parseInt(score[i].innerText);
        let valeurObj = parseInt(obj[i].innerText);
        
        if (valeurScore >= valeurObj) {
            score[i].style.color = "green";
            obj[i].style.color = "green";
        }
    }

    let toutVert = Array.from(score).every(element => {
        return element.style.color === "green";
    });
    
    if (toutVert) {
        victoryImage.style = `opacity: 1`;
        victoryText.innerText = `Objectif atteint !`;
    }
}

//////////////////////////////////////////////////////
// Fonction pour modifier les objectifs et vérifier leur avancement : 
//////////////////////////////////////////////////////

function afficherObjectif(nombreVise) {
    nombreVise.addEventListener("change", () => {
        let nombreInfos = parseInt(nombreOffres.value) + parseInt(nombreEntreprises.value);
        let objOffres = document.querySelector(".obj-offres");
        objOffres.innerText = `${nombreOffres.value}`;
        let objEntreprises = document.querySelector(".obj-entreprises");
        objEntreprises.innerText = `${nombreEntreprises.value}`;
        let objInfos = document.querySelector(".obj-infos");
        objInfos.innerText = `${nombreInfos}`;
        let objMessages = document.querySelector(".obj-messages");
        objMessages.innerText = `${nombreMessages.value}`;
        let objAppels = document.querySelector(".obj-appels");
        objAppels.innerText = `${nombreAppels.value}`;

        verifObjectif();
        objectifNonAtteint();
    })
}

afficherObjectif(nombreOffres);
afficherObjectif(nombreEntreprises);
afficherObjectif(nombreMessages);
afficherObjectif(nombreAppels);

//////////////////////////////////////////////////////
// Fonction pour supprimer le dernier élément de la liste de deploiement en cliquant dans sa zone puis
// Mettre à jour le score de l'élément correspondant (sans descendre en-dessous de zéro), puis
// Vérifier si l'objectif est toujours atteint, et appeler la fonction si ce n'est pas le cas : 
//////////////////////////////////////////////////////


function supprimerElement(zone) {
    zone.addEventListener("click", () => {
        let listeDeploiement = zone.innerHTML.split("<div>");
        listeDeploiement.pop();
        zone.innerHTML = listeDeploiement.join("<div>");

        let typeTroupe = zone.classList[0];
        if (nombreTroupes[typeTroupe] > 0) {
            nombreTroupes[typeTroupe]--;
            majScore(typeTroupe);
        }

        objectifNonAtteint();
    })
}

deploiementInterne.forEach(zone => {
    supprimerElement(zone);
});

//////////////////////////////////////////////////////
// Fonction pour mettre à jour la couleur si le score est inférieur à l'objectif, puis : 
// Réinitialise l'icône de victoire si les objectifs ne sont plus atteints :
//////////////////////////////////////////////////////

function objectifNonAtteint(){
    for (let i = 0; i < score.length; i++) {
        let valeurScore = parseInt(score[i].innerText);
        let valeurObj = parseInt(obj[i].innerText);
        if (valeurScore < valeurObj){
             score[i].style.color = "red";
             obj[i].style.color = "red";
         }
    }

    let toutVert = Array.from(score).every(element => {
        return element.style.color === "green";
    });
    
    if (toutVert == false) {
        victoryImage.style = `opacity : 0.5`;
        victoryText.innerText = `Objectif en vue`;
    }
}
