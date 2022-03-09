const router = require("express").Router();

const RatingController = require("../controllers/RatingController");
const authTourist = require("../middlewares/userAuth");

// router.get("/get", RatingController.getRating);
// router.post("/edit", authTourist, RatingController.editRating);
// router.post("/add", authTourist, RatingController.addNewRating);

module.exports = router;
