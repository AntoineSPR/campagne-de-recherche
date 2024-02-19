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
const messager = document.getElementById("messager");
const audience = document.getElementById("audience");
const negociation = document.getElementById("negociation");
const soldats = document.getElementById("soldats");
const entrainement = document.getElementById("entrainement");
const renfort = document.getElementById("renfort");

const offreDeploye = document.querySelector(".offre");
const entrepriseDeploye = document.querySelector(".entreprise");
const infosDeploye = document.querySelector(".infos");
const messagerDeploye = document.querySelector(".messager");
const audienceDeploye = document.querySelector(".audience");

const nombreOffres = document.getElementById("nombreOffres");
const nombreEntreprises = document.getElementById("nombreEntreprises");
const nombreMessages = document.getElementById("nombreMessages");
const nombreAppels = document.getElementById("nombreAppels");

const scoreOffres = document.querySelector(".score-offres");
const scoreEntreprises = document.querySelector(".score-entreprises");
const scoreInfos = document.querySelector(".score-infos");
const scoreMessages = document.querySelector(".score-messages");
const scoreAppels = document.querySelector(".score-appels");

const score = document.querySelectorAll(".score");
const obj = document.querySelectorAll(".obj");

// Fonction pour mettre à jour la couleur si le score est inférieur à l'objectif, puis : 
// Faire disparaître l'icône de rapport si les objectifs ne sont plus atteints :

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

// Fonction pour afficher les objectifs, et exécuter la fonciton si non atteints :

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

        objectifNonAtteint();
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
            affichageRapport.innerHTML = `<img src='images/scroll.png' alt='rapport rempli'>`;
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

// Fonction pour supprimer le dernier élément de la liste de deploiement en cliquant dans sa zone puis :
// Mettre à jour le score de l'élément correspondant (sans descendre en-dessous de zéro), puis :
// Vérifier si l'objectif est toujours atteint, et appeler la fonction si ce n'est pas le cas : 


function supprimerElement(zone) {
    zone.addEventListener("click", () => {
        let listeDeploiement = zone.innerHTML.split("<div>");
        listeDeploiement.pop();
        zone.innerHTML = listeDeploiement.join("<div>");
       
        switch(zone) {
            case offreDeploye :
                if (parseInt(scoreOffres.innerText) > 0){
                scoreOffres.innerText = parseInt(scoreOffres.innerText) - 1;}
                break;
            case entrepriseDeploye : 
            if (parseInt(scoreEntreprises.innerText) > 0){
                scoreEntreprises.innerText = parseInt(scoreEntreprises.innerText) - 1;}
                break;
            case infosDeploye :
                if (parseInt(scoreInfos.innerText) > 0){
                scoreInfos.innerText = parseInt(scoreInfos.innerText) - 1;}
                break;
            case messagerDeploye :
                if (parseInt(scoreMessages.innerText) > 0){
                scoreMessages.innerText = parseInt(scoreMessages.innerText) - 1;}
                break;
            case audienceDeploye :
                if (parseInt(scoreAppels.innerText) > 0){
                scoreAppels.innerText = parseInt(scoreAppels.innerText) - 1;}
                break;
        }

        objectifNonAtteint();
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
