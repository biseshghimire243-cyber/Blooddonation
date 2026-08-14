const express = require("express");

const router = express.Router();

const {
    createBloodRequest
} = require("../controllers/requestController");


// Create blood request
router.post("/", createBloodRequest);


module.exports = router;