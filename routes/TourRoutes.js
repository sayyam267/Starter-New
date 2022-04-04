const TourController = require("../controllers/TourController");
const authVendor = require("../middlewares/vendorAuth");
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./public/images/tourpics"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
app.use(express.json());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "images/tourpics/");
//   },

//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// var upload = multer({ storage: storage });
const router = require("express").Router();

router.post(
  "/create",
  authVendor,
  // upload.array("multi-files"),
  upload.fields([{ name: "multiImages", maxCount: 5 }]),
  TourController.createTours
);
router.post("/delete", authVendor, TourController.deleteTours);
router.get("/get", TourController.getTour);
module.exports = router;
