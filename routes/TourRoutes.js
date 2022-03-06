const TourController = require("../controllers/TourController");
const authVendor = require("../middlewares/vendorAuth");

const router = require("express").Router();

router.post("/create", authVendor, TourController.createTours);
router.post("/delete", authVendor, TourController.deleteTours);
router.get("/get", TourController.getTour);
module.exports = router;
