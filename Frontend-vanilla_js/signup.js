document
.getElementById("signupForm")
.addEventListener("submit", async (event) => {

    event.preventDefault();

    const username =
    document.getElementById("username").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const response =
    await fetch(
        "https://website-suggester.onrender.com/signup",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,
                email,
                password
            })
        }
    );

    const data = await response.json();

    alert(data.message);

    if(response.ok){
        window.location.href="login.html";
    }

});