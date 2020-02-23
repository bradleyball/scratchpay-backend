const router = require("express").Router();
const controller = require("./authController");

router.post("/login", controller.signIn);
router.post("/signup", controller.signUp);

module.exports = router;
