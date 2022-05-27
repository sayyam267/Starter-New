const validation = require("../helpers/validation");
const userRules = require("../validations/UserValidation");
const UserController = require("../controllers/UserController");
const router = require("express").Router();
const handleSingupAuth = require("../middlewares/signUpauth");
const authAdmin = require("../middlewares/adminAuth");
const handleAuth = require("../middlewares/auth");
router.post(
  "/login",
  handleSingupAuth,
  userRules.loginUserRules(),
  validation,
  // UserController.login
  UserController.loginUser
);
router.post(
  "/signup",
  handleSingupAuth,
  userRules.signUpUserRules(),
  validation,
  UserController.createUser
  // UserController.signup
);
router.get("/validate", UserController.verifyUser);
router.get("/get", UserController.getUser);
router.get("/get/:id", UserController.getUserByID);
router.get("/all", handleAuth, authAdmin, UserController.getAll);
router.post("/forgot", UserController.forgotPassword);
router.put(
  "/update/password",
  handleSingupAuth,
  userRules.updatePassword(),
  validation,
  UserController.updatePassword
);
router.get("/mydetails", handleAuth, UserController.getUserByID);
router.put("/verify/otp", UserController.verifyOTP);
router.put("/block", handleAuth, authAdmin, UserController.blockUser);
router.put("/delete", handleAuth, UserController.deleteUser);
router.put("/update/profile", handleAuth, UserController.updateProfile);
router.get("/balance", handleAuth, UserController.getBalance);
// router.post("/block/", handleAuth, authAdmin, UserController.blockUser);
module.exports = router;
