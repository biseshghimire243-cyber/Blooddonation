const db = require("../config/db");


// ========================================
// FIND AVAILABLE DONORS
// ========================================

const getDonors = (req, res) => {

    const {
        blood_group,
        location
    } = req.query;


    let sql = `

        SELECT

            users.id,
            users.fullname,
            users.phone,

            donors.blood_group,
            donors.address,
            donors.availability

        FROM users

        INNER JOIN donors
            ON users.id = donors.user_id

        WHERE donors.availability = 'available'

    `;


    const values = [];


    // Blood group filter

    if (blood_group) {

        sql += `
            AND donors.blood_group = ?
        `;

        values.push(blood_group);

    }


    // Location filter

    if (location) {

        sql += `
            AND donors.address LIKE ?
        `;

        values.push(
            `%${location}%`
        );

    }


    sql += `
        ORDER BY users.fullname ASC
    `;


    db.query(
        sql,
        values,
        (err, results) => {

            if (err) {

                console.error(
                    "Find Donor Error:",
                    err.message
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Database error while finding donors."

                });

            }


            return res.status(200).json({

                success: true,

                count: results.length,

                donors: results

            });

        }
    );

};


module.exports = {
    getDonors
};