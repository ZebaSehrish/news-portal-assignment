const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }

}

displayCategory = news => {
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML = ``;
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('row');
    categoryDiv.innerHTML =
        `   <button class="col border border-0 bg-transparent">Home</button>
            <button id="btn" onclick="loadNews('${news[0].category_id}')" class="col border border-0 bg-transparent">${news[0].category_name}</button>
            <button  onclick="loadNews('${news[1].category_id}')" class="col border border-0 bg-transparent">${news[1].category_name}</button>
            <button  onclick="loadNews('${news[2].category_id}')" class="col border border-0 bg-transparent">${news[2].category_name}</button>
            <button  onclick="loadNews('${news[3].category_id}')" class="col border border-0 bg-transparent">${news[3].category_name}</button>
            <button  onclick="loadNews('${news[4].category_id}')" class="col border border-0 bg-transparent">${news[4].category_name}</button>
            <button  onclick="loadNews('${news[5].category_id}')" class="col border border-0 bg-transparent">${news[5].category_name}</button>
            <button  onclick="loadNews('${news[6].category_id}')" class="col border border-0 bg-transparent">${news[6].category_name}</button>
            <button  onclick="loadNews('${news[7].category_id}')" class="col border border-0 bg-transparent">${news[7].category_name}</button>
        `;
    categoryContainer.appendChild(categoryDiv);
    //start the spinner

    toggleSpinner(true);
}
loadCategory();

const loadNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayNews(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

const displayNews = news => {
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

    news.forEach(singleNews => {
        if (singleNews.details.length > 500) {
            singleNews.details = singleNews.details.slice(0, 400);
        }
        //display all news
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
            <div class="d-flex justify-content-center align-items-center pt-5 mb-2">
            <div class="container-fluid card mb-3 card-portion" style=" width: 1080px;
            height: 350px;">
                <div class="row g-0">
                    <div class="col-md-4 col-12 col-sm-6 ">
                        <img src="${singleNews.image_url}" class="img-fluid mt-3 ms-1" style="width: 350px;
                        height: 300px;" alt="...">
                    </div>
                    <div class="col-md-8 col-12 col-sm-6">
                        <div onclick="loadNewsDetails('${singleNews._id}')"  class="card-body" data-bs-toggle="modal" data-bs-target="#newsDetailModal">
                            <h5 class="card-title pt-4">${singleNews.title ? singleNews.title : 'no title found'}"</h5>
                            <p class="card-text">${singleNews.details ? singleNews.details : 'no details found'}"<span>...</span></p>
                            <div id="show-all" class="text-center d-none">
                <div id="btn-show-all" class="btn btn-primary">Show all</div> </div>

                            <div class="row mt-5">
                           <div class="col d-flex d-grid gap-3"><div><img style="width:40px;height:40px; border-radius: 155px;" src="${singleNews.author.img ? singleNews.author.img : 'none'}"></div>
                                <div>${singleNews.author.name ? singleNews.author.name : 'author name not found'}</div></div>

                                <div class="col d-flex d-grid gap-2"><div><i onclick="loadNewsDetails('${singleNews._id}')" class="fa-regular fa-eye"></i></div>
                                <p>${singleNews.total_view ? singleNews.total_view : 'view number not found'}</p>
                                </div>

                                <div class="col"><i onclick="loadNewsDetails('${singleNews._id}')" class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#newsDetailModal"></i></div>
                                
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
            `;
        newsContainer.appendChild(newsDiv);
    })

}

loadNews('01');
//stop the spinner

toggleSpinner(false);

//show news details
const loadNewsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }
}
const displayNewsDetails = singleNews => {
    //console.log(singleNews);
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerHTML = `
    <h4>${singleNews.title ? singleNews.title : 'no news title found'}</h4>
    <p>by: ${singleNews.author.name ? singleNews.author.name : 'no author name found'}</p>
    <p>Published on: ${singleNews.author.published_date ? singleNews.author.published_date : 'no published date found'}</p>
    `;
    const newsDetails = document.getElementById('news-details');
    newsDetails.innerHTML = `
    <img src="${singleNews.image_url}" class="img-fluid">
    <div class="d-flex d-grid gap-2"> 
    <p>Rating: ${singleNews.rating.number ? singleNews.rating.number : 'no ratings found'} </p>
    <p>Viewed by: ${singleNews.total_view ? singleNews.total_view : 'no view details found'} </p></div>
    <p>${singleNews.details}</p>
    `   ;
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}


//loadNews();
