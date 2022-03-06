const TourController = require("../controllers/TourController");
const authVendor = require("../middlewares/vendorAuth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });
const router = require("express").Router();

router.post(
  "/create",
  authVendor,
  upload.array("multi-files"),
  TourController.createTours
);
router.post("/delete", authVendor, TourController.deleteTours);
router.get("/get", TourController.getTour);
module.exports = router;
