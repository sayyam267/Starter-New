const TouristController = require("../controllers/TouristController");
const handleAuth = require("../middlewares/auth");

const router = require("express").Router();
// router.post();
router.get("/dashboard", handleAuth, TouristController.getDashboard);
router.get("/tours", handleAuth, TouristController.getMyTours);
// router.get("/",handleAuth,TouristController.buyTBCredits)
module.exports = router;
