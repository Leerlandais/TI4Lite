const category_grid = document.getElementById("category_grid");
function getCategoryDatas() {
    fetch("js/category-datas.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(datas) {
            postCategories(datas);
        })
        .catch(error => console.error('Error fetching datas:', error));
}


function postCategories(datas) {
    datas.forEach((data) => {
    const divExt = document.createElement("div");
    divExt.classList.add("relative",
                         "rounded-sm" ,
                         "overflow-hidden" ,
                         "group");

        let img = document.createElement("img");
        img.setAttribute("src", data["img"]);
        img.setAttribute("alt", data["cat"]);
        img.classList.add("w-full");

        let catButton = document.createElement("button");
       // href.setAttribute("href", data["href"]);
        catButton.classList.add("absolute",
                            "inset-0",
                            "bg-black",
                            "bg-opacity-40",
                            "flex",
                            "items-center",
                            "justify-center",
                            "text-xl",
                            "text-white",
                            "font-roboto",
                            "font-medium",
                            "group-hover:bg-opacity-60",
                            "transition",
                            "catButtons");
        catButton.textContent = data["cat"];

        divExt.appendChild(img);
        divExt.appendChild(catButton);

    category_grid.appendChild(divExt);
    });

}

getCategoryDatas();

/*
<div class="relative rounded-sm overflow-hidden group">
    <img src="{{ asset('images/category/category-1.jpg') }}" alt="category 1" class="w-full">
    <a href="#"
       class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Bedroom</a>
</div>

 */

