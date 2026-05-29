const params=new URLSearchParams(window.location.search);
const id=params.get("id");
fetch(`http://localhost:3000/content/${id}`)
.then(response=>response.json())
.then(item=>{
    const container=document.getElementById("detailsContainer");
    container.innerHTML=`
    <div class="details-card">
    <img src="${item.image}" alt="${item.title}">
    <h1>${item.title}</h1>
    <p>${item.description}</p>
    <span>⭐ ${item.rating}</span>
    <p>Genre: ${item.genre.join(", ")}</p>
    <p>Mood: ${item.mood.join(", ")}</p>
    <p>Type: ${item.type.join(", ")}</p>
    <p>Platforms: ${item.platforms.join(", ")}</p>
    `;
})