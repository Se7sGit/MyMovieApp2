var express = require("express");
var router = express.Router();

const {
  signupUserController,
  loginUserController,
} = require("../controllers/authanticationController");
const ProtectionMiddleware = require("../middlewares/ProtectionMiddleware");

const {
  getAllUsers,
  deleteUserById,
} = require("../controllers/userControllers");

/* GET users listing. */
router.get("/users", ProtectionMiddleware, getAllUsers);
router.post("/login", loginUserController);
router.post("/signup", signupUserController);
router.delete("/deleteUser/:id", deleteUserById);

module.exports = router;
