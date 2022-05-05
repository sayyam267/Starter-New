const TourController = require("../controllers/TourController");
const authVendor = require("../middlewares/vendorAuth");
const path = require("path");
const router = require("express").Router();

const multer = require("multer");
const handleAuth = require("../middlewares/auth");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("./public/images/tourpics"));
  },
  filename: (req, file, cb) => {
    // console.log(file);
    const filename = file.originalname.split(".jpg")[0];
    // console.log(filename);
    cb(null, Date.now() + " - " + filename + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

router.post(
  "/create",
  handleAuth,
  authVendor,
  // upload.array("multi-files"),
  upload.fields([{ name: "multiImages", maxCount: 5 }]),
  TourController.createTour
);
router.post("/delete", authVendor, TourController.deleteTours);
router.get("/get", TourController.getTour);
router.get("/get/:id", TourController.getTourByID);
router.get("/getmytours", handleAuth, authVendor, TourController.getmyTours);
router.get("/get/all", TourController.getAll);
//EDIT ROUTE
// router.post("/edit", TourController.edit);

module.exports = router;

// app.use(express.json());

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
