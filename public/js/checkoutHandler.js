
const   currentBasket = JSON.parse(localStorage.getItem('BASKET')),
    tableGrid = document.getElementById("table_grid");
function createUniqueBasket(datas){
    const   currentBasket = JSON.parse(localStorage.getItem('BASKET'));

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
    createBasketList(uniqueBasket);
}

function removeBasketList() {
    showTests ? console.warn("Removing existing basket elements") : null;
    let i = 1;
    while (tableGrid.firstChild) {
        showTests ? console.log("removing element : "+i) : null;
        tableGrid.removeChild(tableGrid.firstChild);
        i++;
    }
}
removeBasketList();

function createBasketList (datas) {
    showTests ? console.warn("Creating Basket") : null;
    showTests ? console.log('Received datas (array expected) : ',datas): null;
    if (datas === null) {
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-blue-gray-200");
        tr.innerHTML = `<td class="py-3 px-4 font-medium text-center" colspan="7"><a href="?route=home">Basket is Empty - <span class="text-green-600">Return to Shop</span></a></td`
        tableGrid.appendChild(tr);
        return;
    }
    let finalPrice = 0;
    datas.forEach((data) => {
        finalPrice += parseInt(data.price);
        let fullPrice = parseInt(data.price) * parseInt(data.occurs);
        console.log("price : ", fullPrice);
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-blue-gray-200", "text-center");
        tr.innerHTML = `<td class="py-3 px-4 text-center">${data.item}</td>
                        <td class="py-3 px-4 text-center">€${data.price}</td>
                        <td class="py-3 px-4 text-center">${data.occurs}</td>
                        <td class="py-3 px-4 text-center">€${fullPrice}</td>
                        <td class="py-3 px-4 text-center">
                            <button><img src="/public/images/icons/arrow-down.svg" alt="-" class="h-6 h-6"></button>
                        </td>
                        <td class="py-3 px-4">
                            <button><img src="/public/images/icons/removeItem.svg" alt="X" class="h-6 h-6"></button>
                        </td>
                        <td class="py-3 px-4">
                            <button><img src="/public/images/icons/arrow-up.svg" alt="+" class="h-6 h-6"></button>
                        </td>`

    tableGrid.appendChild(tr);
    });
    createTotalPrice(datas);
}


let finalPrice = 0;
function createTotalPrice(datas) {
    datas.forEach((data) => {
        finalPrice += parseInt(data.price);
        const trPrice = document.createElement("tr");

        if (document.querySelector(".tempRemove")) {
            const tempRemove =  document.querySelector(".tempRemove");
            tableGrid.removeChild(tempRemove);
        }
        trPrice.classList.add("border-b", "border-blue-gray-200", "tempRemove");
        trPrice.innerHTML = `<td class="py-3 px-4 font-medium" colspan="3">Total Wallet Value</td>
                        <td class="py-3 px-8 font-medium text-left" colspan="4">€${finalPrice}</td>`

    tableGrid.appendChild(trPrice);

    });





}

if (currentBasket) {
createUniqueBasket(currentBasket);
}else {
    createBasketList(null)
}

/*
 const divExt = document.createElement("div");
        divExt.classList.add("flex", "justify-between", "items-center");
        const divTitle = document.createElement("div");
        divTitle.innerHTML = `<div>
                        <h5 class="text-gray-800 font-medium w-14">${data.item} x ${data.occurs} </h5>
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
        tableGrid.appendChild(divExt)
    createTotalPrice(data);
 */