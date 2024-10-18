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

// utiliser chaque fois qu'on a besoin du basket
function getBasket() {
    return localStorage.getItem("BASKET");
}

// pour vider basket après l'achat
function removeBasket() {
    localStorage.removeItem('BASKET');
}

// au cas où on a besoin de recréer le LS (epuisement du stock)
function createNewStorage() {
    localStorage.clear();
    location.reload()
}

function removeFromBasket(data) {
    return true;
}

function addToBasket(data) {
    return true;
}


