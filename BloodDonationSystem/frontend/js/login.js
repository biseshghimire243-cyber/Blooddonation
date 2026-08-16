// ========================================
// LOGIN FORM
// ========================================

const loginForm = document.getElementById("loginForm");

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");


// ========================================
// SHOW / HIDE PASSWORD
// ========================================

if (togglePassword && passwordInput) {

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

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        // ========================================
        // GET INPUT VALUES
        // ========================================

        const emailInput =
            document.getElementById("username");

        const email =
            emailInput
                ? emailInput.value.trim()
                : "";

        const password =
            passwordInput
                ? passwordInput.value
                : "";


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

        if (loginButton) {

            loginButton.disabled = true;

            loginButton.classList.add("loading");

            loginButton.textContent =
                "Logging in...";

        }


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


            // ========================================
            // GET SERVER RESPONSE
            // ========================================

            const data =
                await response.json();


            console.log(
                "Login response:",
                data
            );


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
            // CHECK TOKEN
            // ========================================

            if (!data.token) {

                showMessage(
                    "Login failed: server did not return a token.",
                    "error"
                );

                return;

            }


            // ========================================
            // CHECK USER DATA
            // ========================================

            if (!data.user) {

                showMessage(
                    "Login failed: user information is missing.",
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


            // ========================================
            // SAVE USERNAME
            // ========================================

            localStorage.setItem(
                "username",
                data.user.fullname
            );


            // ========================================
            // CONSOLE INFORMATION
            // ========================================

            console.log(
                "Login successful!"
            );

            console.log(
                "Logged in user:",
                data.user
            );

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
            // ADMIN DASHBOARD REDIRECT
            // ========================================

            setTimeout(() => {

                window.location.href =
                    "/admin/dashboard.html";

            }, 1000);


        } catch (error) {

            // ========================================
            // CONNECTION ERROR
            // ========================================

            console.error(
                "Login Error:",
                error
            );


            showMessage(
                "Unable to connect to the server.",
                "error"
            );


        } finally {

            // ========================================
            // RESET BUTTON
            // ========================================

            setTimeout(() => {

                if (loginButton) {

                    loginButton.disabled = false;

                    loginButton.classList.remove(
                        "loading"
                    );

                    loginButton.textContent =
                        "Login";

                }

            }, 1000);

        }

    });

}


// ========================================
// MESSAGE FUNCTION
// ========================================

function showMessage(message, type) {

    if (!loginForm) {
        return;
    }


    let messageBox =
        document.querySelector(
            ".form-message"
        );


    // ========================================
    // CREATE MESSAGE BOX
    // ========================================

    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.className =
            "form-message";

        loginForm.appendChild(
            messageBox
        );

    }


    // ========================================
    // SHOW MESSAGE
    // ========================================

    messageBox.textContent =
        message;

    messageBox.className =
        `form-message ${type}`;

}