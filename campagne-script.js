let deploiementReco = document.querySelector(".deploiement-reco");
let deploiementComm = document.querySelector(".deploiement-comm");
let deploiementPrep = document.querySelector(".deploiement-prep");
let objectifReco = document.querySelector(".objectif-reco");
let objectifComm = document.querySelector(".objectif-comm");
let affichageRapport = document.querySelector(".affichage-rapport");

let offre = document.getElementById("offre");
let entreprise = document.getElementById("entreprise");
let infos = document.getElementById("infos");
let rapport = document.getElementById("oui");
let messager = document.getElementById("messager");
let audience = document.getElementById("audience");
let negociation = document.getElementById("negociation");
let soldats = document.getElementById("soldats");
let rassemblements = document.getElementById("rassemblements");
let entrainement = document.getElementById("entrainement");
let renfort = document.getElementById("renfort");

let nombreOffres = document.getElementById("nombreOffres");
let nombreEntreprises = document.getElementById("nombreEntreprises");
let nombreMessages = document.getElementById("nombreMessages");
let nombreAppels = document.getElementById("nombreAppels");

// Fonction pour afficher les objectifs de reconnaissance :

function afficherObjectifReco(nombreVise) {
    nombreVise.addEventListener("change", () => {
        let nombreInfos = parseInt(nombreOffres.value) + parseInt(nombreEntreprises.value);
        objectifReco.innerHTML = `<p> / ${nombreOffres.value} <img src='images/scout.png' alt='éclaireur'><br>
            / ${nombreEntreprises.value} <img src='images/knight.png' alt='chevalier'><br>
            / ${nombreInfos} <img src='images/spy.png' alt='espion'></p>`
    })
}

afficherObjectifReco(nombreOffres);
afficherObjectifReco(nombreEntreprises);

// Fonction pour afficher les objectifs de communication :

function afficherObjectifComm(nombreVise) {
    nombreVise.addEventListener("change", () => {
        objectifComm.innerHTML = `<p> / ${nombreMessages.value} <img src='images/messenger.png' alt='messager'><br>
        / ${nombreAppels.value} <img src='images/king.png' alt='roi'></p>`
    })
}

afficherObjectifComm(nombreMessages);
afficherObjectifComm(nombreAppels);

// Fonction pour deployer les éléments cochés :

function deployerTroupes(troupe, zone) {
    troupe.addEventListener("change", () => {
        if (troupe.checked == true) {
            zone.innerHTML += `<div>${troupe.value}</div>`;
            troupe.checked = false;
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
deployerTroupes(rassemblements, deploiementPrep);
deployerTroupes(entrainement, deploiementPrep);
deployerTroupes(renfort, deploiementPrep);

// Déployer le rapport si coché 'Oui' : 

rapport.addEventListener("change", () => {
    if (rapport.checked == true) {
        affichageRapport.innerHTML += rapport.value;
    }
})

// Fonction pour supprimer le dernier élément de la liste de deploiement en cliquant n'importe où sur la liste :

function supprimerElement(zone) {
    zone.addEventListener("click", () => {
        let listeDeploiement = zone.innerHTML.split("<div>");
        listeDeploiement.pop();
        zone.innerHTML = listeDeploiement.join("<div>");
    })
}

supprimerElement(deploiementReco);
supprimerElement(deploiementComm);
supprimerElement(deploiementPrep);

