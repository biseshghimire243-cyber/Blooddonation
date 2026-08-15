// ========================================
// ADMIN DASHBOARD
// ========================================

console.log("Admin Dashboard Loaded");


// ========================================
// GET LOGIN DATA
// ========================================

const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");

console.log("Token:", token);
console.log("User:", userData);


// ========================================
// CHECK LOGIN
// ========================================

if (!token || !userData) {

    console.log("No login information found.");

    window.location.href = "../login.html";

} else {

    try {

        const user = JSON.parse(userData);

        console.log("Current user:", user);
        console.log("Current role:", user.role);


        // ========================================
        // CHECK ADMIN
        // ========================================

        if (user.role !== "admin") {

            console.log("User is not admin.");

            alert("Admin access required.");

            window.location.href = "../dashboard.html";

        }

    } catch (error) {

        console.error(
            "User data error:",
            error
        );

        localStorage.removeItem("user");

        window.location.href = "../login.html";

    }

}


// ========================================
// LOGOUT BUTTON
// ========================================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "../login.html";

    });

}


// ========================================
// LOAD DASHBOARD STATISTICS
// ========================================

async function loadDashboardStats() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/admin/dashboard"
        );


        const data = await response.json();


        console.log(
            "Dashboard API:",
            data
        );


        if (data.success) {

            document.getElementById(
                "totalUsers"
            ).textContent =
                data.stats.totalUsers;


            document.getElementById(
                "totalDonors"
            ).textContent =
                data.stats.totalDonors;


            document.getElementById(
                "totalRequests"
            ).textContent =
                data.stats.totalRequests;


            document.getElementById(
                "emergencyRequests"
            ).textContent =
                data.stats.emergencyRequests;

        }

    } catch (error) {

        console.error(
            "Dashboard API Error:",
            error
        );

    }

}


loadDashboardStats();