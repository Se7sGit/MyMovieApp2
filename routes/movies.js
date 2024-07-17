var express = require("express");
const {
  getAllMovies,
  getMovieByTitle,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  addMovie,
} = require("../controllers/movies.Controllers");
const ProtectionMiddleware = require("../middlewares/ProtectionMiddleware");
var router = express.Router();

router.get("/allMovies", getAllMovies);
router.get("/Movie/:title", getMovieByTitle);
router.get("/Movie/:id", getMovieById);
router.post("/addMovie", ProtectionMiddleware, addMovie);
router.patch("/updateMovie/:id", ProtectionMiddleware, updateMovieById);
router.delete("/deleteMovie/:id", ProtectionMiddleware, deleteMovieById);

module.exports = router;
