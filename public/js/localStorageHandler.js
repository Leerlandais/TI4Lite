const resetLS = document.getElementById("resetLS");
resetLS.addEventListener("click", createNewStorage)

// création du LS si pas déjà existant
function createStorage (){
        showTests ? console.warn("RUNNING CREATE STORAGE FUNCTION") : null;
    if (!localStorage.getItem("ITEM1")) {
        for(let i = 1; i <= 12; i++) {
            const item = {id: i, sold: Math.floor(Math.random() * 40) + 1};
            localStorage.setItem('ITEM'+i, JSON.stringify(item));
        }
        localStorage.setItem("TESTS", null);
    }
}
// lancement direct
createStorage();

// au cas où on a besoin de recréer le LS (epuisement du stock)
function createNewStorage() {
    localStorage.clear();
    createStorage();
    location.reload()
}

// utiliser chaque fois qu'on a besoin du basket
function getBasket() {
        showTests ? console.warn("RUNNING GETBASKET FUNCTION") : null;
    if (localStorage.getItem("BASKET") && localStorage.getItem("BASKET").length) {
        return JSON.parse(localStorage.getItem("BASKET"));
        }
    return null;
}

// pour vider basket après l'achat
function removeBasket(datas) {
        showTests ? console.warn("RUNNING REMOVE BASKET FUNCTION") : null;
        localStorage.removeItem('BASKET');

    datas.forEach((data) => {
       let sold = JSON.parse(localStorage.getItem('ITEM'+data.id));
       sold.sold += 1;
       showTests ? console.log("Adjusting sold amount for : ", data.item) : null;
       localStorage.setItem('ITEM'+data.id+'', JSON.stringify(sold));
    });
}

// enleve un article du panier
function removeFromBasket(data) {
    showTests ? console.warn("RUNNING REMOVE FROM BASKET FUNCTION") : null;
    showTests ? console.log(currentBasket) : null;
    showTests ? console.log(data) : null;

    currentBasket.splice(data, 1);
    showTests ? console.log('Item removed (smaller array expected) : ',currentBasket) : null;
    localStorage.setItem('BASKET', JSON.stringify(currentBasket));
    removeBasketList();
    createUniqueBasket();
}

// enleve completement un article du panier
function deleteFromBasket(id) {
    const currentBasket = getBasket();
        showTests ? console.warn("RUNNING DELETE FROM BASKET FUNCTION") : null;
        showTests ? console.log(currentBasket) : null;
        showTests ? console.log(id) : null;

    const delResponse = confirm("Are you sure you want to delete this item?");
        showTests ? console.log("Remove item ? ", delResponse) : null;
        if(delResponse === null) {
            return;
        }
        let newBasket = currentBasket.filter(data => data.id !== id);
        showTests ? console.log("newBasket : ", newBasket) : null;
        localStorage.removeItem("BASKET");
        localStorage.setItem('BASKET', JSON.stringify(newBasket));
        removeBasketList();


}
// et ajoute un
function addToBasket(data) {
        showTests ? console.warn("RUNNING ADD TO BASKET FUNCTION") : null;
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
    adjustRemainingAmount(data.id);
}


