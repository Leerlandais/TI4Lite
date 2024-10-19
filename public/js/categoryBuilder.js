const categoryGrid = document.getElementById("category_grid");
function postCategories(datas) {
// d'abord, verification que catGrid est vide
    while (categoryGrid.firstChild) {
        categoryGrid.removeChild(categoryGrid.firstChild);
    }

    datas.forEach((data) => {
    const divExt = document.createElement("div");
        divExt.classList.add("relative",
                             "rounded-sm" ,
                             "overflow-hidden" ,
                             "group");

    const category = JSON.stringify(data.cat);
    const disabled = data.disabled ? "disabled" : "";

        let img = document.createElement("img");
            img.setAttribute("src", data["img"]);
            img.setAttribute("alt", data["cat"]);
            img.classList.add("w-full");

    const divBtn = document.createElement("div");
        divBtn.innerHTML = `<button 
                            class="absolute inset-0 bg-black bg-opacity-40 
                                   flex items-center justify-center text-xl 
                                   text-white font-roboto font-medium 
                                   group-hover:bg-opacity-60 transition 
                                   catButton
                                   ${disabled}"
                            onclick='getByCategory(${category})'
                            >
                            ${data.cat}
                            </button>`

        divExt.appendChild(img);
        divExt.appendChild(divBtn);

    categoryGrid.appendChild(divExt);
    });
adjustOpacity();
}

getCategoryData();


// enleve effet et listener pour les category fictifs
function adjustOpacity() {
    const catBtn = document.querySelectorAll(".catButton");
    for (let i = 0; i < catBtn.length; i++) {
        if(catBtn[i].classList.contains("disabled")) {
            catBtn[i].classList.remove("group-hover:bg-opacity-60");
            catBtn[i].removeAttribute('onclick');
        }
    }
}