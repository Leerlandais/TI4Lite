const resetLS = document.getElementById("resetLS");
resetLS.addEventListener("click", createNewStorage)

// création du LS si pas déjà existant
function createStorage (){
    if (!localStorage.getItem("ITEM1")) {
        for(let i = 1; i <= 12; i++) {
            const item = {id: i, sold: Math.floor(Math.random() * 40) + 1};
            localStorage.setItem('ITEM'+i, JSON.stringify(item));
        }
    }
}
// lancement direct
createStorage();

// au cas où on a besoin de recréer le LS (epuisement du stock)
function createNewStorage() {
    localStorage.clear();
    location.reload()
}

// utiliser chaque fois qu'on a besoin du basket
function getBasket() {
    if (localStorage.getItem("BASKET") && localStorage.getItem("BASKET").length) {
        return localStorage.getItem("BASKET");
        }
    return null;
}

// pour vider basket après l'achat
function removeBasket() {
    localStorage.removeItem('BASKET');
}

// enleve un article du panier
function removeFromBasket(data) {
    return true;
}

// et ajoute un
function addToBasket(data) {
    return true;
}


