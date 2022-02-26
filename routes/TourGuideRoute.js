const TourGuideController = require("../controllers/TourGuideController");
const router = require("express").Router();

router.post("/login", TourGuideController.login);
router.post("/signup", TourGuideController.signup);
module.exports = router;
