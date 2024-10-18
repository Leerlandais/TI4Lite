const articleGrid = document.getElementById("article_grid");
const recommendedGrid = document.getElementById("recommended_grid");
const categoryGrid = document.getElementById("category_grid");
console.log(categoryGrid);
const catButton = categoryGrid.querySelectorAll("button");
console.log(catButton.length);
function getArticleDatas(whichGrid) {
    fetch("js/article-datas.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(datas) {
            postArticles(datas, whichGrid);
        })
        .catch(error => console.error('Error fetching datas:', error));
}


function postArticles(datas, whichGrid) {
    let cutData = datas;
if (datas.length > 9) {
    // D'abord, preparation de datas pour qu'ils sont aléatoire et unique
    const shuffledData = datas.sort((a, b) => 0.5 - Math.random());
    const uniqueData = [...new Map(shuffledData.map(item => [item.id, item])).values()];
    cutData = whichGrid.id === "article_grid" ? uniqueData.slice(0, 4) : uniqueData.slice(5, 9);
}
    cutData.forEach((data) => {

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
        const oneItemString = JSON.stringify(oneItem);

        // Calculation des articles restant
        const soldAmt = JSON.parse(localStorage.getItem('ITEM'+data["id"])).sold;
        const newAmt = parseInt(data["amount"]) - parseInt(soldAmt);

        // Div parent pour contenir les autres
        const divExt = document.createElement("div");
            divExt.classList.add("bg-white", "shadow", "rounded", "overflow-hidden", "group",)

        // Div pour contenir l'image
        const divImg = document.createElement("div");
            divImg.classList.add("relative");
        const img = document.createElement("img");
            img.setAttribute("src", data["img"]);
            img.setAttribute("alt", data["item"]);
            divImg.appendChild(img);
            divExt.appendChild(divImg);

        // Div pour les infos du produit
        const divLink = document.createElement("div");
            divLink.classList.add("pt-4", "pb-3", "px-4",)
        const link = document.createElement("a");
            link.innerHTML = `<h4 class="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"> ${data["item"]}</h4>`
            divLink.appendChild(link);
        const divPrice = document.createElement("div");
            divPrice.classList.add("flex", "items-baseline", "mb-1", "space-x-2")
        const p1 = document.createElement("p");
            p1.classList.add("text-xl", "text-primary", "font-semibold")
            p1.textContent = "€ "+data["priceRed"];
        const p2 = document.createElement("p");
            p2.classList.add("text-sm", "text-gray-400", "line-through");
            p2.textContent = "€ "+data["price"];
            divPrice.appendChild(p1);
            divPrice.appendChild(p2);
            divLink.appendChild(divPrice);
        const divLeft = document.createElement("div");
            divLeft.classList.add("flex", "items-center");
            divLeft.innerHTML = `<div class="text-xs text-gray-500 ml-3">Remaining : <span id="amt${data['id']}">${newAmt}</span></div>`;
            divLink.appendChild(divLeft);
        // et le bouton pour le selectionner
        const divBtn = document.createElement("div");
            divBtn.innerHTML = `<button 
                                   class="block w-full py-1 text-center text-white 
                                          bg-primary border border-primary rounded-b 
                                          hover:bg-transparent hover:text-primary transition"
                                   id="ITEM${data['id']}"
                                   onclick='addToBasket(${oneItemString})'>
                                   Add to cart
                                   </button>`
            divLink.appendChild(divBtn);

        divExt.appendChild(divLink);
        // Selon les besoin, ajoute l'article dans le zone correct
            whichGrid.appendChild(divExt);

    });

}
// affiche montants d'articles dans le panier
if (localStorage.getItem("BASKET") && localStorage.getItem("BASKET").length) {
    let currentBasket = JSON.parse(localStorage.getItem("BASKET"))
    basketSize.textContent = currentBasket.length;
}else {
    basketSize.textContent = "0";
    console.log("no basket");
}

// appel 2 fois du fonction, 1 pour les articles 'Arrivals', l'autre pour 'Recommend'
getArticleDatas(articleGrid);
getArticleDatas(recommendedGrid);
