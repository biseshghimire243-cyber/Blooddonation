const express = require("express");

const router = express.Router();

const {
    getDashboardStats
} = require("../controllers/adminController");


// Admin Dashboard Statistics

router.get(
    "/dashboard",
    getDashboardStats
);


module.exports = router;