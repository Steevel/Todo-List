const express = require("express");
const router = express.Router();
const { signUp, login } = require("../Controllers/AuthController");

router.post("/signup", signUp);
router.post("/login", login);

// Export the router
module.exports = router;
