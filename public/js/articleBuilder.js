const articleGrid = document.getElementById("article_grid");
const recommendedGrid = document.getElementById("recommended_grid");

function postArticlesByGrid(datas, whichGrid, showTests=false){

     showTests ? console.log("untouched data received (json expected) :"+JSON.stringify(datas)) :  null;

    showTests ? console.log(`BEGINNING CREATION OF :`, whichGrid ) : null
    if(whichGrid === "articleGrid") {
        whichGrid = articleGrid
    }else if (whichGrid === "recommendedGrid") {
        whichGrid = recommendedGrid
    }
    showTests ? console.log("whichGrid (div expected) : ",whichGrid) : null;
    datas.forEach((data) => {
        // Objet pour contenir nos articles
        const oneItem = {
            "id": data["id"],
            "cat": data["cat"],
            "item": data["item"],
            "price": data["priceRed"],
            "saved": (parseInt(data["price"]) - parseInt(data["priceRed"])),
            "amount": data["amount"],
        };
        // Transform objet en json pour facilite le transfer onClick
        showTests ? console.log("object created for each item (object expected) : ", oneItem) : null;
        const oneItemString = JSON.stringify(oneItem);
        showTests ? console.log("stringified version (json string expected) : ", oneItemString) : null;

        // Calculation des articles restant
        const soldAmt = JSON.parse(localStorage.getItem('ITEM'+data["id"])).sold;
        const newAmt = parseInt(data["amount"]) - parseInt(soldAmt);
        showTests ? console.log(`Amount of ${data.item} in stock (int 0-49 expected) :`, newAmt) : null;

        // Création des elements
            // Div parent pour contenir les autres
            const divExt = document.createElement("div");
                divExt.classList.add("bg-white", "shadow", "rounded", "overflow-hidden", "group",)
            // Div pour contenir l'image
            const divImg = document.createElement("div");
                divImg.classList.add("relative");
            // ajout l'image dans son div
            divImg.innerHTML = `<img src="${data['img']}" alt="${data.item}">`
            // et l'attacher au parent
            divExt.appendChild(divImg);
            // Div pour les infos du produit
            const divLink = document.createElement("div");
            divLink.classList.add("pt-4", "pb-3", "px-4",)
            // lien pour afficher eventuellement un modal avec description du produit
            const link = document.createElement("a");
            link.innerHTML = `<h4 class="uppercase font-medium 
                                         text-xl mb-2 text-gray-800 
                                         hover:text-primary transition"
                              > ${data["item"]}
                              </h4>`
            divLink.appendChild(link);
            // Div pour contenir les prix
            const divPrice = document.createElement("div");
                divPrice.classList.add("flex", "items-baseline", "mb-1", "space-x-2");
                // paragraph pour prix reduites
            const p1 = document.createElement("p");
                p1.classList.add("text-xl", "text-primary", "font-semibold")
                p1.textContent = "€ "+data["priceRed"];
                // paragraph pour prix normales
            const p2 = document.createElement("p");
                p2.classList.add("text-sm", "text-gray-400", "line-through");
                p2.textContent = "€ "+data["price"];
                // attach paras au parent(divPrice)
                divPrice.appendChild(p1);
                divPrice.appendChild(p2);
                // et divPrice au parent(divLink)
                divLink.appendChild(divPrice);
            // Div pour afficher articles restants
            const divLeft = document.createElement("div");
                divLeft.classList.add("flex", "items-center");
                divLeft.innerHTML = `<div class="text-xs text-gray-500 ml-3">Remaining : <span id="amt${data['id']}">${newAmt}</span></div>`;
                // attaché au parent(divLink)
                divLink.appendChild(divLeft);
            // Finalement, le div pour contenir le bouton (Add to Cart)
            const divBtn = document.createElement("div");
            divBtn.innerHTML = `<button 
                                class="block w-full py-1 text-center text-white 
                                       bg-primary border border-primary rounded-b 
                                       hover:bg-transparent hover:text-primary transition"
                                id="ITEM${data['id']}"
                                onclick='addToBasket(${oneItemString}, true)'>
                                Add to cart
                                </button>`
            divLink.appendChild(divBtn);
            divExt.appendChild(divLink);

        showTests ? console.log("Div Element expected : ",divExt) : null;
        whichGrid.appendChild(divExt);
    });
    adjustCheckoutAmount();
}

function adjustCheckoutAmount(showTests=false) {
    const basketSize = document.getElementById("basketSize");
    // affiche montants d'articles dans le panier
    if (getBasket()) {
        let currentBasket = JSON.parse(getBasket());
        showTests ? console.log("Current Basket (array expected) : ",currentBasket): null;
        basketSize.textContent = currentBasket.length;
    }else {
        basketSize.textContent = "0";
        showTests ? console.log("Basket is currently empty"): null;
    }
}

function adjustRemainingAmount(id, showTests=false) {
   const remainingDisplay = document.getElementById("amt" + id);
   showTests ? console.log("Display to be changed (object expected) : ", remainingDisplay) : null;
   let remainingAmount = parseInt(remainingDisplay.textContent);
   remainingAmount--;
   showTests ? console.log("Reducing remaining amount. New amount remaining = ", remainingAmount) : null;
   remainingDisplay.textContent = remainingAmount;
   if (remainingAmount < 1) {
       const stopListener = document.getElementById("ITEM" + id);
       stopListener.disabled = true;
       stopListener.textContent = "Sold Out";
       stopListener.style.opacity = "0.5";
       stopListener.classList.remove("hover:bg-transparent");
       stopListener.classList.remove("hover:text-primary");
   }
}