const loginForm = document.getElementById("loginForm");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");


// ========================================
// SHOW / HIDE PASSWORD
// ========================================

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.classList.remove(
            "fa-eye"
        );

        togglePassword.classList.add(
            "fa-eye-slash"
        );

    } else {

        passwordInput.type = "password";

        togglePassword.classList.remove(
            "fa-eye-slash"
        );

        togglePassword.classList.add(
            "fa-eye"
        );

    }

});


// ========================================
// LOGIN
// ========================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    // Your HTML calls this "username"
    // but the backend expects "email"

    const email =
        document.getElementById("username")
            .value
            .trim();

    const password =
        passwordInput.value;


    // ========================================
    // VALIDATION
    // ========================================

    if (!email || !password) {

        showMessage(
            "Please enter email and password.",
            "error"
        );

        return;
    }


    // ========================================
    // BUTTON
    // ========================================

    const loginButton =
        loginForm.querySelector(
            "button[type='submit']"
        );

    loginButton.disabled = true;

    loginButton.classList.add("loading");

    loginButton.textContent = "Logging in...";


    // ========================================
    // SEND REQUEST
    // ========================================

    try {

        const response = await fetch(
            "/api/auth/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email: email,

                    password: password

                })

            }
        );


        const data = await response.json();


        // ========================================
        // LOGIN FAILED
        // ========================================

        if (!response.ok) {

            showMessage(
                data.message || "Invalid email or password.",
                "error"
            );

            return;
        }


        // ========================================
        // LOGIN SUCCESSFUL
        // ========================================

        localStorage.setItem(
            "token",
            data.token
        );


        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );


        showMessage(
            "Login successful! Redirecting...",
            "success"
        );


        // ========================================
        // REDIRECT
        // ========================================

        setTimeout(() => {

            window.location.href =
                "dashboard.html";

        }, 1000);


    } catch (error) {

        console.error(
            "Login Error:",
            error
        );


        showMessage(
            "Unable to connect to the server.",
            "error"
        );


    } finally {

        loginButton.disabled = false;

        loginButton.classList.remove(
            "loading"
        );

        loginButton.textContent = "Login";

    }

});


// ========================================
// MESSAGE FUNCTION
// ========================================

function showMessage(message, type) {

    let messageBox =
        document.querySelector(
            ".form-message"
        );


    // Create message box

    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.className =
            "form-message";

        loginForm.appendChild(
            messageBox
        );

    }


    messageBox.textContent = message;

    messageBox.className =
        `form-message ${type}`;

}