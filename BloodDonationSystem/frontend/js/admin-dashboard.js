// ========================================
// ADMIN DASHBOARD
// ========================================

console.log("Admin Dashboard Loaded");


// ========================================
// CHECK ADMIN LOGIN
// ========================================

const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");


// If user is not logged in
if (!token || !userData) {

    window.location.href = "../login.html";

}


// Get user information
const user = JSON.parse(userData);


// Only admin can access this page
if (user.role !== "admin") {

    alert("Access denied. Admin only.");

    window.location.href = "../dashboard.html";

}


// ========================================
// LOGOUT
// ========================================

const logoutBtn = document.getElementById("logoutBtn");

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


        if (!response.ok || !data.success) {

            console.error(
                "Failed to load dashboard:",
                data.message
            );

            return;

        }


        // ========================================
        // DISPLAY REAL DATABASE VALUES
        // ========================================

        document.getElementById("totalUsers").textContent =
            data.stats.totalUsers;


        document.getElementById("totalDonors").textContent =
            data.stats.totalDonors;


        document.getElementById("totalRequests").textContent =
            data.stats.totalRequests;


        document.getElementById("emergencyRequests").textContent =
            data.stats.emergencyRequests;


        console.log(
            "Dashboard statistics loaded successfully."
        );

    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}


// ========================================
// LOAD DASHBOARD
// ========================================

loadDashboardStats();