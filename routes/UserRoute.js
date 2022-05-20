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
router.post("/forgot", UserController.forgotPassword);
router.put("/update/password", UserController.updatePassword);
// router.post("/block/", handleAuth, authAdmin, UserController.blockUser);

module.exports = router;
