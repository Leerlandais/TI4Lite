
const   currentBasket = JSON.parse(localStorage.getItem('BASKET')),
    checkoutGrid = document.getElementById("checkout_grid");

function removeBasketList() {
    showTests ? console.warn("Removing existing basket elements") : null;
    let i = 1;
    while (checkoutGrid.firstChild) {
        console.log("removing element : "+i);
        checkoutGrid.removeChild(checkoutGrid.firstChild);
        i++;
    }
}
removeBasketList();

function createBasketList (datas) {
    showTests ? console.warn("Creating Basket") : null;

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
        pricePara.textContent = "€" + data.price;
        divExt.appendChild(pricePara);
        showTests ? console.log("Created Div (object expected) : ", divExt) : null;
        checkoutGrid.appendChild(divExt)
        i++;
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