var express = require("express");
var router = express.Router();

const {
  signupUserController,
  loginUserController,
} = require("../controllers/UsersAuthanticationController");
const UserProtectionMiddleware = require("../middlewares/UserProtectionMiddleware");

const {
  getAllUsers,
  deleteUserById,
} = require("../controllers/userControllers");

/* GET users listing. */
router.get("/users", getAllUsers);
router.post("/login", loginUserController);
router.post("/signup", signupUserController);
router.delete("/deleteUser/:id", deleteUserById);

module.exports = router;
