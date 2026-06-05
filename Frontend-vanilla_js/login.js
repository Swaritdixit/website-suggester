document
.getElementById("loginForm")

.addEventListener("submit",async(event)=>{

    event.preventDefault();

    const email=
    document.getElementById("email").value;

    const password=
    document.getElementById("password").value;

    const response=
    await fetch(
        "http://localhost:3000/login",
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({
                email,
                password
            })
        }
    );

    const data=
    await response.json();

    alert(data.message);
    localStorage.setItem("token",data.token);
window.location.href="index.html";
});