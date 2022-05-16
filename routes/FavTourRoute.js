const FavTourController = require("../controllers/FavTourController");
const handleAuth = require("../middlewares/auth");
const authTourist = require("../middlewares/userAuth");

const router = require("express").Router();

router.post("/add", handleAuth, FavTourController.addFavTour);
module.exports = router;
