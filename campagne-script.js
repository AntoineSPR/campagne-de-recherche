let deploiementReco = document.querySelector(".deploiement-reco");
let deploiementComm = document.querySelector(".deploiement-comm");
let deploiementPrep = document.querySelector(".deploiement-prep");
let deploiementInterne = document.querySelectorAll(".deploiement-interne");
let objectifReco = document.querySelector(".objectif-reco");
let objectifComm = document.querySelector(".objectif-comm");
let affichageRapport = document.querySelector(".affichage-rapport");

let offre = document.getElementById("offre");
let entreprise = document.getElementById("entreprise");
let infos = document.getElementById("infos");
let messager = document.getElementById("messager");
let audience = document.getElementById("audience");
let negociation = document.getElementById("negociation");
let soldats = document.getElementById("soldats");
let entrainement = document.getElementById("entrainement");
let renfort = document.getElementById("renfort");

let nombreOffres = document.getElementById("nombreOffres");
let nombreEntreprises = document.getElementById("nombreEntreprises");
let nombreMessages = document.getElementById("nombreMessages");
let nombreAppels = document.getElementById("nombreAppels");

let scoreOffres = document.querySelector(".score-offres");
let scoreEntreprises = document.querySelector(".score-entreprises");
let scoreInfos = document.querySelector(".score-infos");
let scoreMessages = document.querySelector(".score-messages");
let scoreAppels = document.querySelector(".score-appels");

let score = document.querySelectorAll(".score");
let obj = document.querySelectorAll(".obj");

// Fonction pour afficher les objectifs :

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
    })
}

afficherObjectif(nombreOffres);
afficherObjectif(nombreEntreprises);
afficherObjectif(nombreMessages);
afficherObjectif(nombreAppels);

// Fonction pour deployer les éléments cochés, puis :
// Augmenter le score correspondant, puis :
// Changer la couleur du score lorsque l'objectif est atteint, puis :
// Afficher l'icône de rapport lorsque tous les scores sont au vert :

function deployerTroupes(troupe, zone) {
    troupe.addEventListener("click", () => {
        let zoneInterne = zone.querySelector(`.${troupe.id}`);
        zoneInterne.innerHTML += `<div>${troupe.innerHTML}</div>`;
        switch(troupe) {
            case offre :
                scoreOffres.innerText = parseInt(scoreOffres.innerText) + 1;
                break;
            case entreprise : 
                scoreEntreprises.innerText = parseInt(scoreEntreprises.innerText) + 1;
                break;
            case infos :
                scoreInfos.innerText = parseInt(scoreInfos.innerText) + 1;
                break;
            case messager :
                scoreMessages.innerText = parseInt(scoreMessages.innerText) + 1;
                break;
            case audience :
                scoreAppels.innerText = parseInt(scoreAppels.innerText) + 1;
                break;
        }
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
            affichageRapport.innerHTML = `<img src='images/scroll.png' alt='rapport'>`;
        }
    })
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

// Fonction pour supprimer le dernier élément de la liste de deploiement en cliquant dans sa zone :

function supprimerElement(zone) {
    zone.addEventListener("click", () => {
        let listeDeploiement = zone.innerHTML.split("<div>");
        listeDeploiement.pop();
        zone.innerHTML = listeDeploiement.join("<div>");
    })
}

deploiementInterne.forEach(zone => {
    supprimerElement(zone);
});


// Calcul de la hauteur maximale des zones de déploiement en fonction du viewport et limitation pour conserver les proportions de la grille :

const hauteurDeploiement = deploiementReco.getBoundingClientRect().height;
const deploiementInterneElements = document.querySelectorAll('.deploiement-interne');

deploiementInterneElements.forEach(element => {
    element.style.maxHeight = `${hauteurDeploiement}px`;
});
