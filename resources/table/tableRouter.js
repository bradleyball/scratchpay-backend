const router = require("express").Router();
const controller = require("./tableController");

router.post("/", controller.createTable);
router.get("/", controller.getTable);

module.exports = router;
