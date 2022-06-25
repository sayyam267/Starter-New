const TourController = require("../controllers/TourController");
const authVendor = require("../middlewares/vendorAuth");
const path = require("path");
const router = require("express").Router();
const handleAuth = require("../middlewares/auth");
// const { createTourCheck } = require("../validations/TourValidation");
const validation = require("../helpers/validation");
const multer_middleware = require("../middlewares/multer");

router.post(
  "/create",
  handleAuth,
  authVendor,
  multer_middleware,
  TourController.createTour
);
router.post("/delete", handleAuth, authVendor, TourController.deleteTours);
router.get("/get", TourController.getTour);
router.get("/get/:id", TourController.getTourByID);
router.get("/getmytours", handleAuth, authVendor, TourController.getmyTours);
router.get("/all", TourController.getAll);
router.get("/home/", handleAuth, TourController.home);
//EDIT ROUTE
// router.put("/edit", TourController.edit);

module.exports = router;
