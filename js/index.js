const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

displayCategory = news => {
    //console.log(news);
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = ``;
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('row');
    categoryDiv.innerHTML =
        `   <button class="col border border-0 bg-transparent">Home</button>
            <button onclick="loadNews('${news[0].category_id}')" class="col border border-0 bg-transparent">${news[0].category_name}</button>
            <button  onclick="loadNews('${news[1].category_id}')" class="col border border-0 bg-transparent">${news[1].category_name}</button>
            <button  onclick="loadNews('${news[2].category_id}')" class="col border border-0 bg-transparent">${news[2].category_name}</button>
            <button  onclick="loadNews('${news[3].category_id}')" class="col border border-0 bg-transparent">${news[3].category_name}</button>
            <button  onclick="loadNews('${news[4].category_id}')" class="col border border-0 bg-transparent">${news[4].category_name}</button>
            <button  onclick="loadNews('${news[5].category_id}')" class="col border border-0 bg-transparent">${news[5].category_name}</button>
            <button  onclick="loadNews('${news[6].category_id}')" class="col border border-0 bg-transparent">${news[6].category_name}</button>
            <button  onclick="loadNews('${news[7].category_id}')" class="col border border-0 bg-transparent">${news[7].category_name}</button>
        `
    categoryContainer.appendChild(categoryDiv);
}
loadCategory();

const loadNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayNews(data.data);
}

const displayNews = news => {
    // console.log(news);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ` `;

    //display no news found
    const noNews = document.getElementById('no-found-message');
    if (news.length === 0) {
        noNews.classList.remove('d-none');
    }
    else {
        noNews.classList.add('d-none');
    }

    //display all news
    news.forEach(singleNews => {
        console.log(singleNews);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
            <div class="d-flex justify-content-center align-items-center pt-2 mb-2">
            <div class="card mb-3 card-portion" style=" width: 1080px;
            height: 350px;">
                <div class="row g-0 ">
                    <div class="col-md-4">
                        <img src="${singleNews.image_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">title</h5>
                            <p class="card-text">${singleNews.details}</p>
                            <div id="show-all" class="text-center d-none">
                <div id="btn-show-all" class="btn btn-primary">Show all</div> </div>

                            <div class="row mt-5">
                                <div class="col">${singleNews.author.name}</div>
                                <div class="col"><i class="fa-regular fa-eye"></i></div>
                                <!-- <div class="col">Home</div> -->
                                <div class="col"><i class="fa-solid fa-arrow-right"></i></div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
            `
        newsContainer.appendChild(newsDiv);
    })
}
// const showAll = document.getElementById('show-all');
// if (dataLimit && phones.length > 10) {
//     phones = phones.slice(0, 10);
//     showAll.classList.remove('d-none');
// }
// else {
//     showAll.classList.add('d-none');
//}

//loadNews();
