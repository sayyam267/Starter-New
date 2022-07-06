const TourController = require("../controllers/TourController");
const authVendor = require("../middlewares/vendorAuth");
const path = require("path");
const router = require("express").Router();
const handleAuth = require("../middlewares/auth");
// const { createTourCheck } = require("../validations/TourValidation");
const validation = require("../helpers/validation");
const cors = require("cors");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./public/images/tourpics"));
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.split(".jpg")[0];
    cb(null, Date.now() + " - " + filename + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post(
  "/create",
  handleAuth,
  authVendor,
  cors(),
  upload.fields([{ name: "multiImages", maxCount: 5 }]),
  TourController.createTour
);
router.post("/delete", handleAuth, authVendor, TourController.deleteTours);
router.get("/get", TourController.getTour);
router.get("/get/:id", TourController.getTourByID);
router.get("/getmytours", handleAuth, authVendor, TourController.getmyTours);
router.get("/all", TourController.getAll);
router.get("/home/", handleAuth, TourController.home);
router.put("/done", handleAuth, TourController.markAsDone);
//EDIT ROUTE
// router.put("/edit", TourController.edit);

module.exports = router;
