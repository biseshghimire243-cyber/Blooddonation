const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

// ================= Register =================

const registerUser = async (req, res) => {

    const {
        username,
        password,
        blood_group,
        phone,
        address,
        availability
    } = req.body;

    if (
        !username ||
        !password ||
        !blood_group ||
        !phone ||
        !address
    ) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields."
        });
    }

    try {

        db.query(
            "SELECT * FROM users WHERE username = ?",
            [username],
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
                        message: "Username already exists."
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                db.query(

                    "INSERT INTO users(username,password,role) VALUES(?,?,?)",

                    [
                        username,
                        hashedPassword,
                        "user"
                    ],

                    (err, userResult) => {

                        if (err) {
                            return res.status(500).json({
                                success: false,
                                message: err.message
                            });
                        }

                        const userId = userResult.insertId;

                        db.query(

                            `INSERT INTO donors
                            (user_id,blood_group,phone,address,availability)
                            VALUES(?,?,?,?,?)`,

                            [
                                userId,
                                blood_group,
                                phone,
                                address,
                                availability
                            ],

                            (err) => {

                                if (err) {
                                    return res.status(500).json({
                                        success: false,
                                        message: err.message
                                    });
                                }

                                return res.status(201).json({

                                    success: true,
                                    message: "Registration Successful"

                                });

                            }

                        );

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


// ================= LOGIN =================

const loginUser = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {

        return res.status(400).json({
            success: false,
            message: "Please enter username and password."
        });

    }

    db.query(

        "SELECT * FROM users WHERE username = ?",

        [username],

        async (err, result) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            }

            if (result.length === 0) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password."
                });

            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password."
                });

            }

            const token = jwt.sign(

                {
                    id: user.id,
                    role: user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn: "1d"
                }

            );

            return res.status(200).json({

                success: true,
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role
                }

            });

        }

    );

};
module.exports = {
    registerUser,
    loginUser
};