const express = require("express");
const router = express.Router();
const searchController = require("../controllers/searchController");
const authController = require("../controllers/authController");

router.use(authController.protect);
router.get("/:key", searchController.getSuggestion);

module.exports = router;
