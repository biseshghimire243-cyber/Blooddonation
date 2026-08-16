// ========================================
// USER DASHBOARD
// ========================================

const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");


// ========================================
// CHECK LOGIN
// ========================================

if (!token || !userData) {

    window.location.href = "login.html";

} else {

    try {

        const user = JSON.parse(userData);

        console.log("Logged in user:", user);


        // Show username
        const usernameElement =
            document.getElementById("username");

        if (usernameElement) {

            usernameElement.textContent =
                user.fullname;

        }

    } catch (error) {

        console.error(
            "User data error:",
            error
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href =
            "login.html";

    }

}


// ========================================
// LOGOUT
// ========================================

const logoutButton =
    document.getElementById("logout");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("username");

            window.location.href =
                "login.html";

        }
    );

}