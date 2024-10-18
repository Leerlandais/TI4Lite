const basketSize = document.getElementById("basketSize");
function addToBasket(added) {
   let sellThis = added;
   let item = "ITEM" + sellThis.id;
   console.log("item created as : ", item);

   let itemData = JSON.parse(localStorage.getItem(item));
   sellThis.left = sellThis.amount - parseInt(itemData.sold);
   console.log("starting left = ", sellThis.left);

   let amtBox = document.getElementById("amt" + sellThis.id);
   let cartBtn = document.getElementById(item);

   if (parseInt(sellThis.left) <= 1) {
      cartBtn.disabled = true;
      cartBtn.textContent = "Sold Out";
   }

   sellThis.left = sellThis.left - 1;

   amtBox.textContent = sellThis.left;

   let newSold = 50 - sellThis.left;

   itemData.sold = newSold;
   localStorage.setItem(item, JSON.stringify(itemData));

   let currentBasket = JSON.parse(localStorage.getItem("BASKET")) || [];
   currentBasket.push(sellThis);
   localStorage.setItem("BASKET", JSON.stringify(currentBasket));
   basketSize.textContent = currentBasket.length;

   /*


    */
}




