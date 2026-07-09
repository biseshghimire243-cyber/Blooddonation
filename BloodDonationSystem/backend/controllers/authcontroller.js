const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// ================= REGISTER =================

const registerUser = async (req, res) => {

    const {
        fullname,
        email,
        phone,
        password,
        blood_group,
        address,
        availability
    } = req.body;

    if (
        !fullname ||
        !email ||
        !phone ||
        !password ||
        !blood_group ||
        !address
    ) {

        return res.status(400).json({
            success: false,
            message: "Please fill all required fields."
        });

    }

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

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(

                `INSERT INTO users
                (fullname,email,phone,password)
                VALUES(?,?,?,?)`,

                [
                    fullname,
                    email,
                    phone,
                    hashedPassword
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
                        (user_id,blood_group,address,availability)
                        VALUES(?,?,?,?)`,

                        [
                            userId,
                            blood_group,
                            address,
                            availability || "available"
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

};

// ================= LOGIN =================

const loginUser = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({

            success: false,
            message: "Please enter email and password."

        });

    }

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

            if (result.length === 0) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password."
                });

            }

            const user = result[0];

            const match = await bcrypt.compare(password, user.password);

            if (!match) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password."
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
                    fullname: user.fullname,
                    email: user.email,
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