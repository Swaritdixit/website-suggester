let content=[];

const recommendationButton=document.getElementById("recommendation");
const searchButton=document.getElementById("searchButton");
fetch("https://website-suggester.onrender.com/genres")
.then(res=>res.json())
.then(genres=>{

const genreSelect=
document.getElementById("genre");

genres.forEach(genre=>{

genreSelect.innerHTML+=`
<option value="${genre.id}">
${genre.name}
</option>
`;

});

});
if(
    window.location.pathname.includes("favorites.html") ||
    window.location.pathname.includes("watchlist.html")
){
    if(!localStorage.getItem("token")){
        alert("Please login first");
        window.location.href="login.html";
    }
}
function getResults(){

    const search=document.getElementById("searchInput").value;
    const genre=document.getElementById("genre").value;
    const mood=document.getElementById("mood").value;
    const type=document.getElementById("type").value;

    fetch(`https://website-suggester.onrender.com/content?search=${search}&genre=${genre}&mood=${mood}&type=${type}`)

    .then(response=>response.json())

    .then(filtered=>{

        const result=document.getElementById("result");

        result.innerHTML="";

        filtered.forEach(item=>{

            result.innerHTML += `

<div class="card">

    <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">

    <h3>${item.title || item.name}</h3>

    <p>${item.overview}</p>

    <span>⭐ ${item.vote_average}</span>

    <button
        class="favBtn"
        data-id="${item.id}"
        data-title="${item.title || item.name}"
        data-poster="${item.poster_path}"
        data-media="${item.media_type || "movie"}"
    >
        ❤️
    </button>
    
     <button
        class="watchBtn"
        data-id="${item.id}"
        data-title="${item.title || item.name}"
        data-poster="${item.poster_path}"
        data-media="${item.media_type || "movie"}"
    >
        📌 Watch Later
    </button>

    <a href="details.html?id=${item.id}&media=${item.media_type || "movie"}">

        <button>
            Watch Now
        </button>

    </a>

</div>

`;

        });attachFavoriteButtons();
attachWatchlistButtons();

        if(filtered.length===0){

            result.innerHTML=`

            <div class="no-result">

                <h2>No results found</h2>

                <p>Try another search or genre</p>

            </div>

            `;

        }

    });

}

recommendationButton.addEventListener(
    "click",
    getResults
);

searchButton.addEventListener(
    "click",
    getResults
);

document
.getElementById("searchInput")
.addEventListener("keypress",event=>{

    if(event.key==="Enter"){

        getResults();

    }

});

fetch("https://website-suggester.onrender.com/trending")
.then(response=>response.json())
.then(data=>{

    const trendingContainer =
    document.getElementById("trendingContainer");

    trendingContainer.innerHTML = "";

    data.slice(0,8).forEach(item=>{

        trendingContainer.innerHTML += `

        <div class="trending-card">

            <img
            src="https://image.tmdb.org/t/p/w500${item.poster_path}">

            <h3>${item.title || item.name}</h3>

            <p>⭐ ${item.vote_average}</p>

            <a href="details.html?id=${item.id}">
                <button>Watch Now</button>
            </a>

        </div>

        `;

    });

});
const token = localStorage.getItem("token");

if(token){

    fetch(
        "https://website-suggester.onrender.com/recommendations",
        {
            headers:{
                Authorization:token
            }
        }
    )

    .then(response=>response.json())

    .then(data=>{

        const recommendationsContainer =
        document.getElementById(
            "recommendationsContainer"
        );

        recommendationsContainer.innerHTML="";

        data.slice(0,8).forEach(item=>{

            recommendationsContainer.innerHTML += `

            <div class="card">

                <img
                src="https://image.tmdb.org/t/p/w500${item.poster_path}">

              <h3>${item.title || item.name}</h3>

                <p>${item.overview || ""}</p>

                <a href="details.html?id=${item.id}&media=movie}">
                    <button>Watch Now</button>
                </a>

            </div>

            `;

        });

    });

}
const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener(
"click",
()=>{

localStorage.removeItem(
"token"
);

window.location.href =
"login.html";

}
);

}
const askAI =
document.getElementById("askAI");

if(askAI){

askAI.addEventListener("click", async ()=>{

const prompt =
document.getElementById("aiPrompt").value;

const response =
await fetch(
"https://website-suggester.onrender.com/ask-ai",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:localStorage.getItem("token")
},
body:JSON.stringify({
prompt
})
}
);

const data =
await response.json();

document.getElementById(
"aiResults"
).innerText =
data.answer;

});

}
document
.querySelectorAll(".favBtn")
.forEach(button=>{

button.addEventListener(
"click",
async ()=>{

const token =
localStorage.getItem("token");

if(!token){

alert("Please login");
return;

}

await fetch(
"https://website-suggester.onrender.com/favorites",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:token
},
body:JSON.stringify({
tmdbId:button.dataset.id,
title:button.dataset.title,
posterPath:button.dataset.poster,
mediaType:button.dataset.media
})
}
);

alert("Added to favorites");

});

});
function attachFavoriteButtons(){

document
.querySelectorAll(".favBtn")
.forEach(button=>{

button.onclick=async()=>{

const token=localStorage.getItem("token");

if(!token){
alert("Please login");
return;
}

await fetch(
"https://website-suggester.onrender.com/favorites",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:token
},
body:JSON.stringify({
tmdbId:button.dataset.id,
title:button.dataset.title,
posterPath:button.dataset.poster,
mediaType:button.dataset.media
})
}
);

alert("Added to favorites");

};

});

}
function attachWatchlistButtons(){

document
.querySelectorAll(".watchBtn")
.forEach(button=>{

button.onclick=async()=>{

const token=localStorage.getItem("token");

if(!token){
alert("Please login");
return;
}

await fetch(
"https://website-suggester.onrender.com/watchlist",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:token
},
body:JSON.stringify({
tmdbId:button.dataset.id,
title:button.dataset.title,
posterPath:button.dataset.poster,
mediaType:button.dataset.media
})
}
);

alert("Added to watchlist");

};

});

}
fetch(
"https://website-suggester.onrender.com/genres"
)
.then(res=>res.json())
.then(genres=>{

const select =
document.getElementById("genre");

genres.forEach(g=>{

select.innerHTML += `
<option value="${g.id}">
${g.name}
</option>
`;

});

});

if(token){

fetch(
"https://website-suggester.onrender.com/taste-profile",
{
headers:{
Authorization:token
}
}
)
.then(res=>res.json())
.then(data=>{

document.getElementById(
"tasteProfile"
).innerHTML = `

<h3>Genres</h3>
<p>${data.genres.join(", ")}</p>

<h3>Themes</h3>
<p>${data.themes.join(", ")}</p>

<h3>Keywords</h3>
<p>${data.keywords.join(", ")}</p>

`;

});

}
const token=localStorage.getItem("token");

if(token){

fetch(
"https://website-suggester.onrender.com/taste-profile",
{
headers:{
Authorization:token
}
}
)
.then(res=>res.json())
.then(data=>{

const profile=
document.getElementById("tasteProfile");

if(!profile) return;

profile.innerHTML=`
<h3>Genres</h3>
<p>${data.genres.join(", ")}</p>

<h3>Themes</h3>
<p>${data.themes.join(", ")}</p>

<h3>Keywords</h3>
<p>${data.keywords.join(", ")}</p>
`;

});

}
document
.getElementById("goTrending")
?.addEventListener("click",()=>{

document
.getElementById("trending")
.scrollIntoView({
behavior:"smooth"
});

});

document
.getElementById("goFavorites")
?.addEventListener("click",()=>{

window.location.href=
"favorites.html";

});
if(!localStorage.getItem("token")){

document
.querySelector(".ai-chat")
?.remove();

document
.querySelector(".taste-profile")
?.remove();

}