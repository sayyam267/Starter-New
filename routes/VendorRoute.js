const VendorController = require("../controllers/VendorController");
const router = require("express").Router();

router.post("/login", VendorController.login);
router.post("/signup", VendorController.signup);
module.exports = router;
