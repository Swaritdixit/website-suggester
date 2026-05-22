const content=[
    {
        title:"Glory",
        genre:["Action", "Adventure"],
        mood:["Emotional", "Epic"],
        type:["K-Drama"],
        rating:8.8,
        image:"images/glory.png",
        platforms:["Netflix","Viki"],
        description:"A gripping tale of revenge and redemption, Glory follows the journey of a young woman seeking justice in a world filled with corruption."
    },
    {
        title:"Death Note",
        genre:["Mystery", "Supernatural"],
        mood:["Dark", "Suspenseful"],   
        type:["Anime"],
        rating:9.0,
        image:"images/deathnote.png",
        platforms:["Netflix","Crunchyroll"],
        description:"A high school student discovers a mysterious notebook that grants him the power to kill anyone whose name he writes in it."
    },
    {
        title:"dhurandhar",
        genre:["Action", "Comedy"],
        mood:["Light-hearted", "Fun"],
        type:["Movies"],
        rating:9.4,
        image:"images/dhurandhar.png",
        platforms:["Amazon Prime","Netflix"],
        description:" a two-part Indian spy thriller duology directed by Aditya Dhar and starring Ranveer Singh. The narrative follows an undercover Indian operative on a high-stakes covert mission to infiltrate Karachi's criminal networks and dismantle terrorist organizations targeting India."
         
    },
    {
        title:"Modern-family",
        genre:["Comedy"],
        mood:["Light-hearted", "Heartwarming"],
        type:["TV Shows"],
        rating:8.5,
        image:"images/modernfamily.png",
        platforms:["Netflix","ABC"],
        description:"A comedy series following the lives of a diverse family in Los Angeles."
    }
];
const button=document.getElementById("recommendation");
const search=document.getElementById("searchInput").value.toLowerCase();
button.addEventListener("click",()=>{
    const genre=document.getElementById("genre").value;
    const mood=document.getElementById("mood").value;
    const type=document.getElementById("type").value;
   const filtered = content.filter(item =>

    (
        item.title.toLowerCase().includes(search)
        ||

        item.description.toLowerCase().includes(search)
    )

    &&

    (
        genre === "" ||

        item.genre.some(g =>
            g.toLowerCase().includes(genre.toLowerCase())
        )
    )

    &&

    (
        mood === "" ||

        item.mood.some(m =>
            m.toLowerCase().includes(mood.toLowerCase())
        )
    )

    &&

    (
        type === "" ||

        item.type.some(t =>
            t.toLowerCase().includes(type.toLowerCase())
        )
    )
);
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

document.getElementById("searchInput").addEventListener("keypress",event=>{
    if(event.key==="Enter"){
        document.getElementById("recommendation").click();
    }
});
