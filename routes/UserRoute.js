const UserController = require("../controllers/UserController");
const router = require("express").Router();
router.post("/login", UserController.login);
router.post("/signup", UserController.signup);
router.get("/get", UserController.getUser);

module.exports = router;
