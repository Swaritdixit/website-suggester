let content=[];
fetch("http://localhost:3000/movies")
    .then(response => response.json())
    .then(data => {
        content = data;
        console.log(content);
    });
const button=document.getElementById("recommendation");
button.addEventListener("click",()=>{
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
                       <button>Watch Now</button>
                       </div>`;
});
if(filtered.length===0){
    result.innerHTML=`<div class="no-result">

                       <h2>No results found</h2>

                        <p>Try another search or genre</p>

</div>`;
}
});
});
document.getElementById("searchInput").addEventListener("keypress",event=>{
    if(event.key==="Enter"){
        document.getElementById("recommendation").click();
    }
});
