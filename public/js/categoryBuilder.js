const categoryGrid = document.getElementById("category_grid");
function postCategories(datas) {

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
console.log (category+" : "+disabled);
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
                                          catButton"
                                   onclick='getByCategory(${category})'
                                   ${disabled}>
                                   ${data.cat}
                                   </button>`

        divExt.appendChild(img);
        divExt.appendChild(divBtn);

    categoryGrid.appendChild(divExt);
    });

}

getCategoryData();

/*
<div class="relative rounded-sm overflow-hidden group">
    <img src="{{ asset('images/category/category-1.jpg') }}" alt="category 1" class="w-full">
    <a href="#"
       class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Bedroom</a>
</div>

 */

