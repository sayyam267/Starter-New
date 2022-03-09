const validation = require("../helpers/validation");
const userRules = require("../validations/UserValidation");
const UserController = require("../controllers/UserController");
const router = require("express").Router();
const handleSingupAuth = require("../middlewares/signUpauth");
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
router.get("/get", UserController.getUser);

module.exports = router;
