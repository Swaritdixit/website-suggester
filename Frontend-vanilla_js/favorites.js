fetch("http://localhost:3000/favorites",
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
    document.getElementById("favoritesContainer");

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
                class="removeBtn"
                data-id="${item._id}">
                Remove
            </button>

        </div>

        `;

    });

    document
    .querySelectorAll(".removeBtn")

    .forEach(button=>{

        button.addEventListener("click",()=>{

            const id=
            button.dataset.id;

            fetch(

                `http://localhost:3000/favorites/${id}`,

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

            .then(()=>{

                location.reload();

            });

        });

    });

});