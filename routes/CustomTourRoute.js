const CustomTourController = require("../controllers/CustomTourController");

const router = require("express").Router();

router.post("/create", CustomTourController.requestCustomTour);
module.exports = router;
