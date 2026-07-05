const bcrypt = require("bcrypt");
const db = require("../config/db");

// Register User
const registerUser = async (req, res) => {
    try {
        // Get data from request body
        const { fullname, email, phone, password } = req.body;

        // Validate input
        if (!fullname || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Check if email already exists
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                if (result.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: "Email already exists."
                    });
                }

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Insert new user
                const sql = `
                    INSERT INTO users(fullname, email, phone, password)
                    VALUES (?, ?, ?, ?)
                `;

                db.query(
                    sql,
                    [fullname, email, phone, hashedPassword],
                    (err, result) => {

                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }

                        return res.status(201).json({
                            success: true,
                            message: "User registered successfully."
                        });

                    }
                );

            }
        );

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    registerUser
};