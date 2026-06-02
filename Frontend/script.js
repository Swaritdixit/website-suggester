let content=[];

const recommendationButton=document.getElementById("recommendation");
const searchButton=document.getElementById("searchButton");

function getResults(){

    const search=document.getElementById("searchInput").value;
    const genre=document.getElementById("genre").value;
    const mood=document.getElementById("mood").value;
    const type=document.getElementById("type").value;

    fetch(`http://localhost:3000/content?search=${search}&genre=${genre}&mood=${mood}&type=${type}`)

    .then(response=>response.json())

    .then(filtered=>{

        const result=document.getElementById("result");

        result.innerHTML="";

        filtered.forEach(item=>{

            result.innerHTML+=`

            <div class="card">

                <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">

                <h3>${item.title || item.name}</h3>

                <p>${item.overview}</p>

                <span>⭐ ${item.vote_average}</span>

                <button
                    class="favBtn"
                    data-id="${item.id}"
                >
                    ❤️
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

fetch("http://localhost:3000/trending")

.then(response=>response.json())

.then(data=>{

    const trendingContainer=
    document.getElementById("trendingContainer");

    data.forEach(item=>{

        trendingContainer.innerHTML+=`

        <div class="trending-card">

            <img src="https://image.tmdb.org/t/p/w500${item.poster_path}">

            <h3>${item.title || item.name}</h3>

            <p>${item.overview}</p>

            <button
                class="favBtn"
                data-id="${item.id}"
            >
                ❤️
            </button>

            <a href="details.html?id=${item.id}&media=${item.media_type || "movie"}">

                <button>
                    Watch Now
                </button>

            </a>

        </div>

        `;

    });

});
document.addEventListener("click",event=>{

    if(event.target.classList.contains("favBtn")){

        fetch(
            "http://localhost:3000/favorites",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json",
                     Authorization:
            localStorage.getItem(
                "token"
            )
                },

                body:JSON.stringify({

                    tmdbId:event.target.dataset.id,

                    title:event.target.dataset.title,

                    posterPath:event.target.dataset.poster,

                    mediaType:event.target.dataset.media

                })

            }
        )

        .then(response=>response.json())

        .then(data=>{

            console.log(data);

        });

    }

});

fetch("http://localhost:3000/genres")

.then(response=>response.json())

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
fetch("http://localhost:3000/recommendations",{

    headers:{
        Authorization:
        localStorage.getItem("token")}})
        .then (response=>response.json())
        .then(data=>{
            const container=documentgetElementById("recommendationsContainer");
            container.innerHTML="";
            data.forEach(item=>{
                container.innerHTML+=`
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500${item.posterPath}">
                    <h3>${item.title}</h3>
                    <p>${item.mediaType}</p>
                </div>`;
            })
        });