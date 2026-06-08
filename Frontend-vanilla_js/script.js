let content=[];

const recommendationButton=document.getElementById("recommendation");
const searchButton=document.getElementById("searchButton");
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

        });

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

            <h3>${item.title}</h3>

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

                <h3>${item.title}</h3>

                <p>${item.overview || ""}</p>

                <a href="details.html?id=${item.id}">
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