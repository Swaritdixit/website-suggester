
if(
!localStorage.getItem("token")
){
window.location.href=
"login.html";
}
fetch(
    "https://website-suggester.onrender.com/watchlist",
    {
        headers:{
            Authorization:
            localStorage.getItem("token")
        }
    }
)
.then(response=>response.json())

.then(data=>{

    const container=
    document.getElementById(
        "watchlistContainer"
    );

    container.innerHTML="";

    data.forEach(item=>{

        container.innerHTML+=`

        <div class="card">

            <img
            src="https://image.tmdb.org/t/p/w500${item.posterPath}"
            alt="${item.title}">

            <h3>${item.title}</h3>

            <p>${item.mediaType}</p>

            <button
                class="removeWatch"
                data-id="${item._id}">
                Remove
            </button>

        </div>

        `;

    });

    document
    .querySelectorAll(".removeWatch")

    .forEach(button=>{

        button.addEventListener("click",()=>{

            fetch(

                `https://website-suggester.onrender.com/watchlist/remove/${button.dataset.id}`,

                {
                    method:"DELETE",

                    headers:{
                        Authorization:
                        localStorage.getItem(
                            "token"
                        )
                    }
                }

            )
            .then(()=>location.reload());

        });

    });

});
document
.querySelectorAll(".watchBtn")
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

});

});