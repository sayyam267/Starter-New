const PromoController = require("../controllers/PromoController");
const router = require("express").Router();
const authVendor = require("../middlewares/vendorAuth");

router.post("/create", authVendor, PromoController.createPromo);
router.post("/edit", authVendor, PromoController.editPromo);
router.get("/get", PromoController.getPromo);

module.exports = router;
