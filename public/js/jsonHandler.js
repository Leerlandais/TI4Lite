

// recuperation des categories
function getCategoryData(){
    fetch("js/category-datas.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(datas) {
            postCategories(datas);
        })
        .catch(error => console.error('Error fetching datas:', error));
}