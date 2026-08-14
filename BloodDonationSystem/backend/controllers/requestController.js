const db = require("../config/db");

const createBloodRequest = (req, res) => {

    const {
        patient_name,
        blood_group,
        units,
        hospital,
        location,
        contact_name,
        phone,
        urgency,
        message
    } = req.body;

    // Validation
    if (
        !patient_name ||
        !blood_group ||
        !units ||
        !hospital ||
        !location ||
        !contact_name ||
        !phone ||
        !urgency
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });
    }

    const sql = `
        INSERT INTO blood_requests
        (
            patient_name,
            blood_group,
            units,
            hospital,
            location,
            contact_name,
            phone,
            urgency,
            message
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        patient_name,
        blood_group,
        units,
        hospital,
        location,
        contact_name,
        phone,
        urgency,
        message || null
    ];

    db.query(sql, values, (err, result) => {

        if (err) {

            console.error(
                "Blood Request Error:",
                err.message
            );

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Blood request submitted successfully.",
            requestId: result.insertId
        });

    });
};

module.exports = {
    createBloodRequest
};