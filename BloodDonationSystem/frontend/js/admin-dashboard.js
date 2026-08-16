console.log("ADMIN DASHBOARD LOADED");


// ========================================
// SHOW CURRENT LOGIN DATA
// ========================================

const token = localStorage.getItem("token");
const userData = localStorage.getItem("user");

console.log("TOKEN:", token);
console.log("USER DATA:", userData);


// ========================================
// DO NOT REDIRECT ANYWHERE
// ========================================

if (userData) {

    try {

        const user = JSON.parse(userData);

        console.log("LOGGED IN USER:", user);

        console.log(
            "USER ROLE:",
            user.role
        );

    } catch (error) {

        console.error(
            "Could not read user data:",
            error
        );

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

        window.location.href =
            "../login.html";

    });

}


// ========================================
// LOAD DASHBOARD DATA
// ========================================

async function loadDashboardStats() {

    try {

        const response = await fetch(
            "/api/admin/dashboard"
        );

        const data = await response.json();

        console.log(
            "ADMIN API RESPONSE:",
            data
        );


        if (data.success) {

            const totalUsers =
                document.getElementById("totalUsers");

            const totalDonors =
                document.getElementById("totalDonors");

            const totalRequests =
                document.getElementById("totalRequests");

            const emergencyRequests =
                document.getElementById(
                    "emergencyRequests"
                );


            if (totalUsers) {

                totalUsers.textContent =
                    data.stats.totalUsers;

            }


            if (totalDonors) {

                totalDonors.textContent =
                    data.stats.totalDonors;

            }


            if (totalRequests) {

                totalRequests.textContent =
                    data.stats.totalRequests;

            }


            if (emergencyRequests) {

                emergencyRequests.textContent =
                    data.stats.emergencyRequests;

            }

        }

    } catch (error) {

        console.error(
            "ADMIN API ERROR:",
            error
        );

    }

}


loadDashboardStats();