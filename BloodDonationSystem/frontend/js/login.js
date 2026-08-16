const loginForm = document.getElementById("loginForm");

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");


// ========================================
// SHOW / HIDE PASSWORD
// ========================================

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.classList.remove("fa-eye");

            togglePassword.classList.add("fa-eye-slash");

        } else {

            passwordInput.type = "password";

            togglePassword.classList.remove("fa-eye-slash");

            togglePassword.classList.add("fa-eye");

        }

    });

}


// ========================================
// LOGIN
// ========================================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


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
    // LOGIN BUTTON
    // ========================================

    const loginButton =
        loginForm.querySelector(
            "button[type='submit']"
        );

    loginButton.disabled = true;

    loginButton.classList.add("loading");

    loginButton.textContent = "Logging in...";


    // ========================================
    // SEND LOGIN REQUEST
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


        console.log("Login response:", data);


        // ========================================
        // LOGIN FAILED
        // ========================================

        if (!response.ok || !data.success) {

            showMessage(
                data.message ||
                "Invalid email or password.",
                "error"
            );

            return;
        }


        // ========================================
        // SAVE TOKEN
        // ========================================

        localStorage.setItem(
            "token",
            data.token
        );


        // ========================================
        // SAVE USER
        // ========================================

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        localStorage.setItem(
    "username",
    data.user.fullname
);


        console.log("Logged in user:", data.user);

        console.log(
            "User role:",
            data.user.role
        );


        // ========================================
        // SUCCESS MESSAGE
        // ========================================

        showMessage(
            "Login successful! Redirecting...",
            "success"
        );


        // ========================================
        // ROLE BASED REDIRECT
        // ========================================

        setTimeout(() => {

            if (data.user.role === "admin") {

                console.log(
                    "Admin detected. Opening admin dashboard."
                );

                window.location.href =
                    "admin/dashboard.html";

            } else {

                console.log(
                    "Normal user detected. Opening user dashboard."
                );

                window.location.href =
                    "dashboard.html";

            }

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

        setTimeout(() => {

            loginButton.disabled = false;

            loginButton.classList.remove(
                "loading"
            );

            loginButton.textContent = "Login";

        }, 1000);

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