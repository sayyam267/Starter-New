const validation = require("../helpers/validation");
const userRules = require("../validations/UserValidation");
const UserController = require("../controllers/UserController");
const router = require("express").Router();
router.post(
  "/login",
  // userRules.loginUserRules,
  validation,
  UserController.login
);
router.post(
  "/signup",
  // userRules.signUpUserRules,
  validation,
  UserController.signup
);
router.get("/get", UserController.getUser);

module.exports = router;
