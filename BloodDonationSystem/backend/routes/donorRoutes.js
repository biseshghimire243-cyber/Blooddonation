const express = require("express");

const router = express.Router();

const {
    getDonors
} = require("../controllers/donorController");


// Find available donors

router.get("/", getDonors);


module.exports = router;