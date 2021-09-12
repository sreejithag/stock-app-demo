const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const searchController = require("../controllers/searchController");

router.use(authController.protect);
router.get("/:company", searchController.getData);

module.exports = router;
