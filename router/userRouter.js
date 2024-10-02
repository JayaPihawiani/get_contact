const express = require("express");
const { register, login, current } = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/current").get(validateToken, current);

module.exports = router;
