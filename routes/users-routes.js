const express = require("express");

const usersController = require("../controllers/users-controller");

const router = express.Router();

/* --------------------------------- ROUTES --------------------------------- */
router.get("/", usersController.getUsers);

router.post("/login", usersController.login);

router.post("/signup", usersController.signup);

module.exports = router;
