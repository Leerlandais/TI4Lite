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
function addToBasket(data, showTests=false) {
   showTests ? console.log("Received this (object expected) : ",data) : null;
    let currentBasket = JSON.parse(localStorage.getItem("BASKET")) || [];
    currentBasket.push(data);
    localStorage.setItem("BASKET", JSON.stringify(currentBasket));
    showTests ? console.log("Current Basket (array expected) : ",currentBasket) : null;

    let item = "ITEM"+data.id;
    showTests ? console.log("Item created as (string expected) : ",item) : null;
    let itemData = JSON.parse(localStorage.getItem(item));
    data.left = data.amount - parseInt(itemData.sold);
    showTests ? console.log(`${data.item} in stock (int expected) : `, data.left) : null

    adjustCheckoutAmount();
    adjustRemainingAmount(data.id, true);
}


