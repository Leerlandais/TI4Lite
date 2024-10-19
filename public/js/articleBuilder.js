const articleGrid = document.getElementById("article_grid");
const recommendedGrid = document.getElementById("recommended_grid");

function postArticlesByGrid(datas, whichGrid, showTests=false){
    if (showTests) {
        console.log("untouched data received (json expected) :"+JSON.stringify(datas));
        console.log("whichGrid (string expected) : "+whichGrid);
    }

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
        const oneItemString = JSON.stringify(oneItem);
        showTests ? console.log("object created for each item : "+ oneItemString) : null;

        // Calculation des articles restant
        const soldAmt = JSON.parse(localStorage.getItem('ITEM'+data["id"])).sold;
        console.log(soldAmt);
        const newAmt = parseInt(data["amount"]) - parseInt(soldAmt);
        console.log(`Amount of ${data.item} in stock (int 0-49 expected) :`+ newAmt)


    });
}