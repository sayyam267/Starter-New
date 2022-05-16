const router = require("express").Router();
const UserTypeController = require("../controllers/UserTypeController");

router.get("/", UserTypeController.getTypes);
router.get("/:id", UserTypeController.getTypeByID);
router.post("/create", UserTypeController.create);

module.exports = router;
