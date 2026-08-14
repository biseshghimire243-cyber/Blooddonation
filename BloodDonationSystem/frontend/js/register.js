const registerForm = document.getElementById("registerForm");


// ========================================
// REGISTER FORM
// ========================================

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    // Get form values

    const fullname =
        document.getElementById("fullname").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const blood_group =
        document.getElementById("blood_group").value;

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const availability =
        document.getElementById("availability").value;

    const password =
        document.getElementById("password").value;


    // ========================================
    // Basic Validation
    // ========================================

    if (
        !fullname ||
        !email ||
        !blood_group ||
        !phone ||
        !address ||
        !password
    ) {

        showMessage(
            "Please fill all required fields.",
            "error"
        );

        return;
    }


    // Password validation

    if (password.length < 6) {

        showMessage(
            "Password must be at least 6 characters.",
            "error"
        );

        return;
    }


    // Phone validation

    if (!/^[0-9]{10}$/.test(phone)) {

        showMessage(
            "Please enter a valid 10-digit phone number.",
            "error"
        );

        return;
    }


    // ========================================
    // Button
    // ========================================

    const submitButton =
        registerForm.querySelector("button[type='submit']");

    submitButton.disabled = true;

    submitButton.classList.add("loading");

    submitButton.textContent = "Creating Account...";


    // ========================================
    // Send Data To Backend
    // ========================================

    try {

        const response = await fetch(
            "/api/auth/register",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    fullname,
                    email,
                    phone,
                    password,
                    blood_group,
                    address,
                    availability

                })

            }
        );


        const data = await response.json();


        // ========================================
        // Error
        // ========================================

        if (!response.ok) {

            showMessage(
                data.message || "Registration failed.",
                "error"
            );

            return;
        }


        // ========================================
        // Success
        // ========================================

        showMessage(
            "Registration successful! Redirecting to login...",
            "success"
        );


        // Clear form

        registerForm.reset();


        // Redirect to login

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1500);


    } catch (error) {

        console.error(
            "Registration Error:",
            error
        );


        showMessage(
            "Unable to connect to the server. Please try again.",
            "error"
        );


    } finally {

        submitButton.disabled = false;

        submitButton.classList.remove("loading");

        submitButton.textContent = "Register";

    }

});


// ========================================
// MESSAGE FUNCTION
// ========================================

function showMessage(message, type) {

    let messageBox =
        document.querySelector(".form-message");


    // Create message box if it doesn't exist

    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.className =
            "form-message";

        registerForm.appendChild(messageBox);

    }


    messageBox.textContent = message;

    messageBox.className =
        `form-message ${type}`;

}