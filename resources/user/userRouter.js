const router = require("express").Router();
const controller = require("./userController");

router.get("/", controller.getAll);
// router.get("/doctor", controller.getByDoctor);
// router.get("/admin", controller.getByAdmin);
// router.get("/accountant", controller.getByAccountant);
router.post("/", controller.createUser);
router.put("/:id", controller.editUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;
