fetch("http://localhost:3000/favorites").then(response=>response.json())    
.then(data=>{
    const container=document.getElementById("favoritesContainer");
    dataa.forEach(item=>{
        container.innerHTML+=`
        <div class="card">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>${item.description}</p>
         <button
                class="removeBtn"
                data-id="${item._id}"
            >
                Remove
            </button>

        </div>

        `;
    });
})
document.querySelectorAll(".removeBtn")
.forEach(button=>{

    button.addEventListener("click",()=>{

        const id=button.dataset.id;

        fetch(
            `http://localhost:3000/removeFavorite/${id}`
        )

        .then(()=>{

            location.reload();

        });

    });

});