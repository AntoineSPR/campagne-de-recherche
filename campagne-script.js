const deploiementReco = document.querySelector(".deploiement-reco");
const deploiementComm = document.querySelector(".deploiement-comm");
const deploiementPrep = document.querySelector(".deploiement-prep");
const deploiementInterne = document.querySelectorAll(".deploiement-interne");
const objectifReco = document.querySelector(".objectif-reco");
const objectifComm = document.querySelector(".objectif-comm");
const affichageRapport = document.querySelector(".affichage-rapport");

const offre = document.getElementById("offre");
const entreprise = document.getElementById("entreprise");
const infos = document.getElementById("infos");
const mail = document.getElementById("mail");
const appel = document.getElementById("appel");
const entretien = document.getElementById("entretien");
const reseau = document.getElementById("reseau");
const entrainement = document.getElementById("entrainement");
const projet = document.getElementById("projet");

const offreDeploye = document.querySelector(".offre");
const entrepriseDeploye = document.querySelector(".entreprise");
const infosDeploye = document.querySelector(".infos");
const mailDeploye = document.querySelector(".mail");
const appelDeploye = document.querySelector(".appel");

const nombreOffres = document.getElementById("nombreOffres");
const nombreEntreprises = document.getElementById("nombreEntreprises");
const nombreMessages = document.getElementById("nombreMessages");
const nombreAppels = document.getElementById("nombreAppels");

const scoreOffres = document.querySelector(".score-offre");
const scoreEntreprises = document.querySelector(".score-entreprise");
const scoreInfos = document.querySelector(".score-infos");
const scoreMessages = document.querySelector(".score-mail");
const scoreAppels = document.querySelector(".score-appel");

const score = document.querySelectorAll(".score");
const obj = document.querySelectorAll(".obj");

let nombreTroupes = {
    "offre": 0,
    "entreprise": 0,
    "infos": 0,
    "mail" : 0,
    "appel" : 0,
    "entretien" : 0,
    "reseau" : 0, 
    "entrainement" : 0,
    "projet" : 0,
};

//////////////////////////////////////////////////////
// Fonction pour deployer les éléments sélectionnés :
//////////////////////////////////////////////////////

function deployerTroupes(troupe, zone) {
    troupe.addEventListener("click", () => {
        let compte=nombreTroupes[troupe.id];
    
    if (compte >= 15) {
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
// Afficher l'icône de rapport lorsque tous les scores sont au vert :
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
        affichageRapport.innerHTML = `<img src='images/victoire.png' alt='objectif atteint'>`;
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
// Faire disparaître l'icône de rapport si les objectifs ne sont plus atteints :
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
        affichageRapport.innerHTML = ``;
    }
}

//////////////////////////////////////////////////////
// Calcul de la hauteur maximale des zones de déploiement en fonction du viewport et limitation pour conserver les proportions de la grille :
//////////////////////////////////////////////////////

const hauteurDeploiement = deploiementReco.getBoundingClientRect().height;
const deploiementInterneElements = document.querySelectorAll('.deploiement-interne');

deploiementInterneElements.forEach(element => {
    element.style.maxHeight = `${hauteurDeploiement}px`;
});

//////////////////////////////////////////////////////
// Comportement visuel des boutons :
//////////////////////////////////////////////////////

const boutons = document.querySelectorAll("button");

boutons.forEach(bouton => {
    bouton.addEventListener("click", () => {
        bouton.style.transition = "transform 70ms linear";
        bouton.style.transform = "translate(2px, 2px)";
        bouton.style.boxShadow = "none";
        setTimeout(() => {
            bouton.style.transform = "none";
            bouton.style.boxShadow = "";
        }, 70);
    })
})