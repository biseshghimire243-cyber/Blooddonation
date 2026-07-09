const password = document.getElementById("password");
const toggle = document.getElementById("togglePassword");

toggle.addEventListener("click", () => {

    if(password.type === "password"){
        password.type = "text";
        toggle.classList.remove("fa-eye");
        toggle.classList.add("fa-eye-slash");
    }else{
        password.type = "password";
        toggle.classList.remove("fa-eye-slash");
        toggle.classList.add("fa-eye");
    }

});

document.getElementById("loginForm").addEventListener("submit", async(e)=>{

    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try{

        const response = await fetch("http://localhost:5000/api/auth/login",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                password
            })

        });

        const data = await response.json();

       if (data.success) {

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("role", data.user.role);

    alert("Login Successful");

    window.location.href = "dashboard.html";

} else {

    alert(data.message);

}

    }catch(error){

        alert("Server Error");

    }

});