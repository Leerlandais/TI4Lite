
let currentBasket = getBasket(),
    tableGrid = document.getElementById("table_grid");

console.log("THIS CUNT : ",currentBasket);
function createUniqueBasket(datas){
    const   currentBasket = datas;

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
    let datas = getBasket();
    createUniqueBasket(datas);
}
removeBasketList();

function createBasketList (datas) {
    showTests ? console.warn("Creating Basket") : null;
    showTests ? console.log('Received datas (array expected) : ',datas): null;
    if (datas === null || datas.length < 1) {
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
        showTests ? console.log("price : ", fullPrice) : null;
        const tr = document.createElement("tr");
        tr.classList.add("border-b", "border-blue-gray-200", "text-center");
        tr.innerHTML = `<td class="py-3 px-4 text-center">${data.item}</td>
                        <td class="py-3 px-4 text-center">€${data.price}</td>
                        <td class="py-3 px-4 text-center">${data.occurs}</td>
                        <td class="py-3 px-4 text-center">€${fullPrice}</td>
                        <td class="py-3 px-4 text-center">
                            <button onclick="removeFromBasket(${data})"><img src="/public/images/icons/arrow-down.svg" alt="-" class="h-6 h-6"></button>
                        </td>
                        <td class="py-3 px-4">
                            <button onclick="deleteFromBasket(${data.id})"><img src="/public/images/icons/removeItem.svg" alt="X" class="h-6 h-6"></button>
                        </td>
                        <td class="py-3 px-4">
                            <button onclick="removeFromBasket(${data})"><img src="/public/images/icons/arrow-up.svg" alt="+" class="h-6 h-6"></button>
                        </td>`
        showTests ? console.log("Price Table created (object expected) :", tr) : null;
    tableGrid.appendChild(tr);
    });
    createTotalPrice(datas);
}


function createTotalPrice(datas) {
let finalPrice = 0;
    showTests ? console.warn("Calculating total price and creating Table") : null;
    datas.forEach((data) => {
        finalPrice += parseInt(data.price);
        showTests ? console.log('Current total (int expected) : ',finalPrice): null;
        const trPrice = document.createElement("tr");

        if (document.querySelector(".tempRemove")) {
            const tempRemove =  document.querySelector(".tempRemove");
            showTests ? console.log("Removing unnecessary element : ", tempRemove) : null;
            tableGrid.removeChild(tempRemove);
        }
        trPrice.classList.add("border-b", "border-blue-gray-200", "tempRemove");
        trPrice.innerHTML = `<td class="py-3 px-4 font-medium" colspan="3">Total Wallet Value</td>
                        <td class="py-3 px-8 font-medium text-left" colspan="4">€${finalPrice}</td>`
        showTests ? console.log("Total Price Section created (object expected) :", trPrice) : null;
    tableGrid.appendChild(trPrice);
    });

    showTests ? console.warn("Price Table Creation Complete") : null;
}

// createUniqueBasket(currentBasket);


