

const   currentBasket = JSON.parse(localStorage.getItem('BASKET')),
        checkoutGrid = document.getElementById("checkout_grid");

function removeBasketList() {
    while (checkoutGrid.firstChild) {
        checkoutGrid.removeChild(checkoutGrid.firstChild);
    }
}
removeBasketList();

function createBasketLink (datas) {
console.log(datas);
let i;
    datas.forEach((data) => {

        const divExt = document.createElement("div");
        divExt.classList.add("flex", "justify-between");
        const divTitle = document.createElement("div");
        divTitle.innerHTML = `<div>
                        <h5 class="text-gray-800 font-medium w-14">${data.item}</h5>
                    </div>`;
        divExt.appendChild(divTitle);

        const remItem = document.createElement("p");
        remItem.classList.add("text-gray-600", "flex", "align-end");
        remItem.innerHTML = `<button onclick="removeFromBasket(${i})"><img src="images/icons/removeItem.svg" alt="X" class="h-6 w-6"></button>`
        divExt.appendChild(remItem);

        const pricePara = document.createElement("p");
        pricePara.classList.add("text-gray-800", "font-medium");
        pricePara.textContent = "€"+ data.price;
        divExt.appendChild(pricePara);

    checkoutGrid.appendChild(divExt)
        i++;
    });
createTotalPrice(currentBasket);
    function createTotalPrice(datas) {
let finalPrice = 0;
datas.forEach((data) => {
    finalPrice += parseInt(data.price);
    const totPrice = document.createElement("div");
    totPrice.classList.add("flex", "justify-between", "border-b", "border-gray-200", "mt-1", "text-gray-800", "font-medium", "py-3", "uppercase", "tempRemove");
    if (document.querySelector(".tempRemove")) {
    const tempRemove =  document.querySelector(".tempRemove");
    checkoutGrid.removeChild(tempRemove);
    }

    const p1 = document.createElement("p");
    p1.textContent = "Subtotal";
    totPrice.append(p1);
    const p2 = document.createElement("p");
    p2.textContent = `€${finalPrice}`;
    totPrice.append(p2);
    checkoutGrid.appendChild(totPrice);
    });
    }
}

function removeFromBasket(data) {
    currentBasket.splice(data, 1);
    localStorage.setItem('BASKET', JSON.stringify(currentBasket));
    console.log(currentBasket);
    removeBasketList();
    createBasketLink(currentBasket);
}
createBasketLink(currentBasket);