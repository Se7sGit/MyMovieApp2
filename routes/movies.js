var express = require("express");
const {
  getAllMovies,
  getMovieByTitle,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  addMovie,
} = require("../controllers/movies.Controllers");
const UserProtectionMiddleware = require("../middlewares/UserProtectionMiddleware");
var router = express.Router();

router.get("/allMovies", getAllMovies);
router.get("/Movie/:title", getMovieByTitle);
router.get("/Movie/:id", getMovieById);
router.post("/addMovie", UserProtectionMiddleware, addMovie);
router.patch("/updateMovie/:id", UserProtectionMiddleware, updateMovieById);
router.delete("/deleteMovie/:id", UserProtectionMiddleware, deleteMovieById);

module.exports = router;
