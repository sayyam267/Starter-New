const AdminController = require("../controllers/AdminController");
const router = require("express").Router();

router.post("/login", AdminController.login);
router.post("/signup", AdminController.signup);
module.exports = router;
