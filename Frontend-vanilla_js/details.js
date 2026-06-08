const params=new URLSearchParams(window.location.search);

const id=params.get("id");
const media=params.get("media") || "movie";

fetch(`https://website-suggester.onrender.com/details/${id}?media=${media}`)

.then(response=>response.json())

.then(item=>{

    const container=
    document.getElementById("detailsContainer");

    container.innerHTML=`

    <div class="details-card">

        <img
        src="https://image.tmdb.org/t/p/w500${item.poster_path}"
        alt="${item.title || item.name}">

        <h1>${item.title || item.name}</h1>

        <p>${item.overview}</p>

        <span>⭐ ${item.vote_average}</span>

        <p>
        Release Date:
        ${item.release_date || item.first_air_date}
        </p>

        <p>
        Runtime:
        ${item.runtime || item.number_of_episodes || "N/A"}
        </p>

        <p>
        Genres:
       ${item.genres ?
item.genres.map(g=>g.name).join(", ")
:
"N/A"}
        </p>

    </div>

    `;

});