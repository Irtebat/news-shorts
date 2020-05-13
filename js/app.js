//Creating and configuring HTTP request object
// xhr=new XMLHttpRequest()
// xhr.open('GET',url,true)
// xhr.setRequestHeader('X-Api-Key','61828a825bd14f68be97c722bb52fdf6')
// xhr.onreadystatechange=()=>{
//     if(xhr.readyState==4)
//     {
//         result=JSON.parse(xhr.response);
//     }
//     else{
//         console.log("Some error occured");
//     }
// }
// xhr.send()

let newsAccordian = document.getElementById('newsAccordian')
let searchBox = document.getElementById('searchBox')

searchBox.addEventListener('keyup',()=>
{
    let q=searchBox.value
    let language='en'
    //let country='us'

    // Setting endpoint parameters for URL
    url = new URL('https://newsapi.org/v2/everything')
    //url.searchParams.set('country', country)
    url.searchParams.set('q', q)
    url.searchParams.set('language',language)
    console.log(url.href);
    var result;

    //In case of no empty search string
    if(url.searchParams.get('q')==''){
        newsAccordian.innerHTML=''
    }
    else{
            //Creating and configuring HTTP request pipelien
            params = {
                method: 'GET',
                headers: {
                    'X-Api-Key': '61828a825bd14f68be97c722bb52fdf6'
                },
            }
            function status(response) {
                return new Promise(function (resolve, reject) {
                    if (response.status >= 200 && response.status < 300) {
                        return resolve(response)
                    }
                    else {
                        return reject(new Error(response.statusText))
                    }
                })
            }
            fetch(url, params).then(status).then(function (response) {
                return response.json()
            }).then(function (data) {
                articles = data.articles;
                let newsHtml = ''
                //Iterate over articles and render it to the DOM
                for (let news=0;(news<10 && news<articles.length);news++) {
                    let html = `
                    <div class="card">
                        <div class="card-header" id="heading${news}">
                            <h2 class="mb-0">
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${news}" aria-expanded="true" aria-controls="collapse${news}">
                                ${articles[news].title}
                                </button>
                            </h2>
                        </div>
                        <div id="collapse${news}" class="collapse" aria-labelledby="heading${news}" data-parent="#newsAccordian">
                            <div class="card-body">${articles[news].content}. <a href="${articles[news].url}" target="_blank">Read more</a></div>
                        </div>
                    </div>`
                    newsHtml += html
                }
                newsAccordian.innerHTML = newsHtml
            })
    }

})



