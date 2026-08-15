// ========================================
// ADMIN DASHBOARD
// ========================================

console.log("Admin Dashboard Loaded");


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
// TEMPORARY DASHBOARD VALUES
// ========================================

// For now these are 0.
// In the next step we will replace them
// with real MySQL data.

document.getElementById("totalUsers").textContent = "0";

document.getElementById("totalDonors").textContent = "0";

document.getElementById("totalRequests").textContent = "0";

document.getElementById("emergencyRequests").textContent = "0";