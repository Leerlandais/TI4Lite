
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
    fetch("js/article-datas.json")
        .then(function(response) {
            return response.json();
        })

        .catch(error => console.error('Error fetching data:', error));

}

function createViewUsingCategory(datas) {
    datas.forEach(function(data) {

        // temporary - replace with article_grid once ready
        const categoryGrid = document.getElementById("category_grid");
            while (categoryGrid.firstChild) {
                categoryGrid.removeChild(categoryGrid.firstChild);
            }
    });
}


function getArticleDatas(whichGrid) {
    fetch("js/article-datas.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(datas) {
            prepareArticleDatas(datas, whichGrid);
        })
        .catch(error => console.error('Error fetching datas:', error));
}

function prepareArticleDatas(datas, whichGrid) {
    const artData = datas.slice((datas.length -4),datas.length);
    const restData = datas.filter(item => !artData.includes(item));
    const shuffledData = restData.sort((a, b) => 0.5 - Math.random());
    const recoData = shuffledData.slice(0,4);
    switch(whichGrid) {
        case "articleGrid":
            postArticlesByGrid(artData, whichGrid, true);
            break;
        case "recommendedGrid":
            postArticlesByGrid(recoData, whichGrid, true);
            break;
        case "categorySelection":

            break;
    }
}

getArticleDatas("articleGrid");
getArticleDatas("recommendedGrid");