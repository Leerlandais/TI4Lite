
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

// filtrage des articles par category
function getByCategory(cat) {
    console.log(cat);
    fetch("js/article-datas.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(allCats) {
            const oneCat = allCats.filter(product => product.cat === cat);
            createViewUsingCategory(oneCat);
        })
        .catch(error => console.error('Error fetching data:', error));

}

function createViewUsingCategory(datas) {
    datas.forEach(function(data) {
    console.log("THIS : "+JSON.stringify(data))
    });
}
