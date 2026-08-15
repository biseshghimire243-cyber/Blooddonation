// ========================================
// ADMIN DASHBOARD
// ========================================

console.log("Admin Dashboard Loaded");


// ========================================
// GET LOGIN INFORMATION
// ========================================

const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");


// ========================================
// CHECK LOGIN
// ========================================

if (!token || !userData) {

    alert("Please login first.");

    window.location.href = "../login.html";

} else {

    const user = JSON.parse(userData);

    console.log("Logged in user:", user);


    // ========================================
    // CHECK ADMIN
    // ========================================

    if (user.role !== "admin") {

        alert("You are not an administrator.");

        window.location.href = "../dashboard.html";

    }

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

        console.log("Dashboard data:", data);


        if (!data.success) {

            console.error(
                "Dashboard error:",
                data.message
            );

            return;

        }


        document.getElementById("totalUsers").textContent =
            data.stats.totalUsers;

        document.getElementById("totalDonors").textContent =
            data.stats.totalDonors;

        document.getElementById("totalRequests").textContent =
            data.stats.totalRequests;

        document.getElementById("emergencyRequests").textContent =
            data.stats.emergencyRequests;


    } catch (error) {

        console.error(
            "Dashboard connection error:",
            error
        );

    }

}


loadDashboardStats();