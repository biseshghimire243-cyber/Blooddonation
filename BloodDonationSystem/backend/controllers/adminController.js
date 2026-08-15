const db = require("../config/db");

// ========================================
// ADMIN DASHBOARD STATISTICS
// ========================================

const getDashboardStats = (req, res) => {

    const stats = {};

    // ----------------------------------------
    // TOTAL USERS
    // ----------------------------------------

    db.query(
        "SELECT COUNT(*) AS totalUsers FROM users",
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            stats.totalUsers = result[0].totalUsers;


            // ----------------------------------------
            // TOTAL DONORS
            // ----------------------------------------

            db.query(
                "SELECT COUNT(*) AS totalDonors FROM donors",
                (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    stats.totalDonors = result[0].totalDonors;


                    // ----------------------------------------
                    // TOTAL BLOOD REQUESTS
                    // ----------------------------------------

                    db.query(
                        "SELECT COUNT(*) AS totalRequests FROM blood_requests",
                        (err, result) => {

                            if (err) {

                                // If blood_requests doesn't
                                // exist yet, return 0.
                                stats.totalRequests = 0;

                                stats.emergencyRequests = 0;

                                return res.status(200).json({
                                    success: true,
                                    stats
                                });
                            }

                            stats.totalRequests =
                                result[0].totalRequests;


                            // ----------------------------------------
                            // EMERGENCY REQUESTS
                            // ----------------------------------------

                            db.query(
                                `SELECT COUNT(*) AS emergencyRequests
                                 FROM blood_requests
                                 WHERE urgency = 'Emergency'`,
                                (err, result) => {

                                    if (err) {

                                        stats.emergencyRequests = 0;

                                    } else {

                                        stats.emergencyRequests =
                                            result[0].emergencyRequests;

                                    }


                                    return res.status(200).json({

                                        success: true,

                                        stats

                                    });

                                }
                            );

                        }
                    );

                }
            );

        }
    );

};


module.exports = {
    getDashboardStats
};