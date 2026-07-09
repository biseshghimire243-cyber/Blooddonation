document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault();

   const user = {

    fullname: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
    blood_group: document.getElementById("blood_group").value,
    address: document.getElementById("address").value,
    availability: document.getElementById("availability").value

};

    try{

        const response = await fetch("http://localhost:5000/api/auth/register",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(user)

        });

        const data = await response.json();

        if(data.success){

            alert("Registration Successful");

            window.location.href="login.html";

        }else{

            alert(data.message);

        }

    }catch(error){

        console.log(error);

        alert("Server Error");

    }

});