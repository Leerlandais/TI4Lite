
const   currentBasket = JSON.parse(localStorage.getItem('BASKET')),
    checkoutGrid = document.getElementById("checkout_grid");
function createUniqueBasket(datas){
    const   currentBasket = JSON.parse(localStorage.getItem('BASKET')),
        checkoutGrid = document.getElementById("checkout_grid");

    showTests ? console.log("Current Basket (array expected) : ",currentBasket) : null;
    const occurrences = currentBasket.reduce((item, currentItem) => {
        const key = JSON.stringify(currentItem);
        item[key] = (item[key] || 0) + 1;
        return item;
    }, {});

    const uniqueBasket = Object.keys(occurrences).map(key => {
        const item = JSON.parse(key);
        return {
            ...item,
            occurs: occurrences[key]
        };
    });
    showTests ? console.log("Recreated basket using occurrences instead of repetition (identical or reduced sized array expected) : ", uniqueBasket): null;
}

function removeBasketList() {
    showTests ? console.warn("Removing existing basket elements") : null;
    let i = 1;
    while (checkoutGrid.firstChild) {
        showTests ? console.log("removing element : "+i) : null;
        checkoutGrid.removeChild(checkoutGrid.firstChild);
        i++;
    }
}
removeBasketList();

function createBasketList (datas) {
    showTests ? console.warn("Creating Basket") : null;
    showTests ? console.log('Received datas (array expected) : ',datas): null;

    datas.forEach((data) => {
        const divExt = document.createElement("div");
        divExt.classList.add("flex", "justify-between", "items-center");
        const divTitle = document.createElement("div");
        divTitle.innerHTML = `<div>
                        <h5 class="text-gray-800 font-medium w-14">${data.item} x ${data.item} </h5>
                    </div>`;
        divExt.appendChild(divTitle);

        const choiceBtns = document.createElement("div");
        choiceBtns.classList.add("flex", "justify-around", "items-center", "space-x-4");
        const incItem = document.createElement("p");
        incItem.classList.add("text-gray-600");
        incItem.innerHTML = `<button onclick="removeFromBasket(${data.id})"><img src="images/icons/arrow-down.svg" alt="\/" class="h-6 w-6"></button>`
        choiceBtns.appendChild(incItem);
        const remItem = document.createElement("p");
        remItem.classList.add("text-gray-600");
        remItem.innerHTML = `<button onclick="deleteFromBasket(${data.id})"><img src="images/icons/removeItem.svg" alt="X" class="h-6 w-6"></button>`
        choiceBtns.appendChild(remItem);
        const decItem = document.createElement("p");
        decItem.classList.add("text-gray-600");
        decItem.innerHTML = `<button onclick="addToBasket(${data.id})"><img src="images/icons/arrow-up.svg" alt="/\" class="h-6 w-6"></button>`
        choiceBtns.appendChild(decItem);

        divExt.appendChild(choiceBtns);
        const pricePara = document.createElement("p");
        pricePara.classList.add("text-gray-800", "font-medium");
        pricePara.textContent = "€" + data.price;
        divExt.appendChild(pricePara);
        showTests ? console.log("Created Div (object expected) : ", divExt) : null;
        checkoutGrid.appendChild(divExt)
    createTotalPrice(data);
    });
}
let finalPrice = 0;
function createTotalPrice(data) {
        finalPrice += parseInt(data.price);
        showTests ? console.log("adjusting total price (int expected) :", finalPrice): null;
        const totPrice = document.createElement("div");
        totPrice.classList.add("flex", "justify-between", "border-b", "border-gray-200",
                               "mt-1", "text-gray-800", "font-medium", "py-3", "uppercase",
                               "tempRemove");

        if (document.querySelector(".tempRemove")) {
            showTests ? console.log("Removing surplus subtotal div"): null;
            const tempRemove =  document.querySelector(".tempRemove");
            checkoutGrid.removeChild(tempRemove);
        }

        const p1 = document.createElement("p");
        p1.textContent = "Subtotal";
        totPrice.append(p1);
        const p2 = document.createElement("p");
        p2.textContent = `€${finalPrice}`;
        showTests ? console.log("Creating final price display (2xobject expected) : ",p1, p2): null;
        totPrice.append(p2);
        checkoutGrid.appendChild(totPrice);
        showTests ? console.log("Created Div (object expected) : ", totPrice): null;


}


createBasketList(currentBasket);