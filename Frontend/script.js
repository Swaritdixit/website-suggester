let content=[];
const recommendationButton=document.getElementById("recommendation");
const searchButton = document.getElementById("searchButton");
function getResults(){
    const search=document.getElementById("searchInput").value;
    const genre=document.getElementById("genre").value;
    const mood=document.getElementById("mood").value;
    const type=document.getElementById("type").value;


fetch(`http://localhost:3000/content?search=${search}&genre=${genre}&mood=${mood}&type=${type}`)
.then(response => response.json())
.then(filtered => {

  
   console.log(filtered );
const result=document.getElementById("result");
result.innerHTML="";
filtered.forEach(item=>{
    result.innerHTML+=`<div class="card">
                       <img src="${item.image}" alt="${item.title}">
                       <h3>${item.title}</h3>
                       <p>${item.description}</p>
                       <span>⭐ ${item.rating}</span>
                       <div class="platforms">
                           ${item.platforms.map(p => `<span>${p}</span>`).join('')}
                          </div>
                          <button class="favBtn" data-id="${item._id}">
    ❤️
</button>

<a href="details.html?id=${item._id}">
    <button>Watch Now</button>
</a>

                       `;
});
if(filtered.length===0){
    result.innerHTML=`<div class="no-result">

                       <h2>No results found</h2>

                        <p>Try another search or genre</p>

</div>`;
}
});
};
recommendationButton.addEventListener("click",getResults);
searchButton.addEventListener("click",getResults);
document.getElementById("searchInput").addEventListener("keypress",event=>{
    if(event.key==="Enter"){
        getResults();
    }
});
fetch("http://localhost:3000/trending").then(response=>response.json())
.then(data=>{
    const trendingContainer=document.getElementById("trendingContainer");
    data.forEach(item=>{
        trendingContainer.innerHTML+=`<div class="trending-card">

        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <button class="favBtn" data-id="${item._id}">
        ❤️
    </button>

    <a href="details.html?id=${item._id}">
        <button>Watch Now</button>
    </a>
        </div>`;
    });

});
document.querySelectorAll(".favBtn").forEach(button=>{
    button.addEventListener("click",()=>{
        const id=button.dataset.id;
        fetch(`http://localhost:3000/favorite/${id}`).then(response=>response.json())
        .then(data=>{
            console.log(data);
        });
    })
})
