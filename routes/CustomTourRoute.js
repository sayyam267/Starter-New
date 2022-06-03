const CustomTourController = require("../controllers/CustomTourController");
const handleAuth = require("../middlewares/auth");
const userauth = require("../middlewares/userAuth");
const router = require("express").Router();

router.post(
  "/create",
  handleAuth,
  userauth,
  CustomTourController.requestCustomTour
);
router.get("/get/:id", CustomTourController.getCustomTourByID);
router.get("/all", CustomTourController.getCustomTourRequests);
router.get("/mine", handleAuth, CustomTourController.getMYCustomTourRequests);
router.put("/delete", handleAuth, CustomTourController.deleteCustomTourRequest);
router.put(
  "/accept/",
  handleAuth,
  CustomTourController.acceptCustomTourRequest
);
router.get(
  "/vendor/",
  handleAuth,
  CustomTourController.getCustomTourByVendorID
);
router.post("/offer/give", handleAuth, CustomTourController.giveOffer);
router.post("/offer/accept", handleAuth, CustomTourController.acceptOffer);
module.exports = router;
