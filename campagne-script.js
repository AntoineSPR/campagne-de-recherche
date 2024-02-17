let deploiement = document.querySelector(".deploiement");
let objectifReco = document.querySelector(".objectif-reco");
let objectifComm = document.querySelector(".objectif-comm");

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

// Fonction pour afficher l'objectif de reconnaissance choisi pour une catégorie donnée, et calculer l'objectif total :

function afficherObjectifReco(nombreVise) {
    nombreVise.addEventListener("change", () => {
        let nombreInfos = parseInt(nombreOffres.value) + parseInt(nombreEntreprises.value);
        objectifReco.innerHTML = `<p>Objectif d'offres à trouver : ${nombreOffres.value} <br>
            Objectif de royaumes à découvrir : ${nombreEntreprises.value}<br>
            Objectif de de renseignements à glaner : ${nombreInfos}</p>`
    })
}

afficherObjectifReco(nombreOffres);
afficherObjectifReco(nombreEntreprises);

// Fonction pour afficher l'objectif de communication choisi pour une catégorie donnée :

function afficherObjectifComm(nombreVise) {
    nombreVise.addEventListener("change", () => {
        objectifComm.innerHTML = `<p>Objectif de messagers à envoyer : ${nombreMessages.value}<br>
            Objectif d'audience auxquelles prendre part : ${nombreAppels.value}</p>`
    })
}

afficherObjectifComm(nombreMessages);
afficherObjectifComm(nombreAppels);

// Fonction pour deployer les éléments cochés :

function deployerTroupes(troupe) {
    troupe.addEventListener("change", () => {
        if (troupe.checked == true) {
            deploiement.innerHTML += "<br>" + troupe.value;
            troupe.checked = false;
        }
    })
}

deployerTroupes(offre);
deployerTroupes(entreprise);
deployerTroupes(infos);
deployerTroupes(messager);
deployerTroupes(audience);
deployerTroupes(negociation);
deployerTroupes(soldats);
deployerTroupes(rassemblements);
deployerTroupes(entrainement);
deployerTroupes(renfort);

// Déployer le rapport si coché 'Oui' : 

rapport.addEventListener("change", () => {
    if (rapport.checked == true) {
        deploiement.innerHTML += "<br>" + rapport.value;
    }
})

// Supprimer le dernier élément de la liste de deploiement en cliquant n'importe où sur la liste :

deploiement.addEventListener("click", () => {
    let listeDeploiement = deploiement.innerHTML.split("<br>");
    listeDeploiement.pop();
    deploiement.innerHTML = listeDeploiement.join("<br>");
})
