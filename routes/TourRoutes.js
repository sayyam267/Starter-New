const TourController = require("../controllers/TourController");
const authVendor = require("../middlewares/vendorAuth");
const path = require("path");
const router = require("express").Router();

const multer = require("multer");
const handleAuth = require("../middlewares/auth");
const { createTourCheck } = require("../validations/TourValidation");
const validation = require("../helpers/validation");
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
  // createTourCheck(),
  // validation,
  upload.fields([{ name: "multiImages", maxCount: 5 }]),
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
