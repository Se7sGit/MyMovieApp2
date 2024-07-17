const { Movie } = require("../models/movie");

async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find({});
    if (!movies[0]) {
      return res.status(404).json("NO MOVIES AVAILABLE!");
    }
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getMovieByTitle(req, res) {
  try {
    const title = req.params.title.trim();
    const regex = new RegExp(`^${title}$`, "i");
    const movie = await Movie.findOne({ title: regex });

    if (!movie) {
      return res.status(404).json("Movie Not Found!!");
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getMovieById(req, res) {
  try {
    // if (req.user.isAdmin === false) {
    //
    const { id } = req.params;
    const movie = await Movie.findOne(id);

    if (!movie) {
      return res.status(404).json("Movie Not Found!!");
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function addMovie(req, res) {
  try {
    const title = req.body.title.trim();
    if (!title) {
      return res.status(400).json("Enter a Valid Title!!");
    }
    const movie = await Movie.findOne({ title: title });
    if (movie) {
      return res.status(400).json("Movie Already Exists!!");
    }
    const newMovie = await Movie.create(req.body);
    return res.status(201).json({ "Movie Added": newMovie });

    // const movie = await new Movie({
    //     title: req.body.title,
    //     director: req.body.director,
    // await movie.save();
    // return res.status(201).json({ "Movie Added": movie })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function updateMovieById(req, res) {
  try {
    const id = req.params.id;
    const movie = await Movie.findByIdAndUpdate(id, req.body);
    if (!movie) {
      return res.status(404).json("Movie Not Found!!");
    }
    const updatedMovie = await Movie.findById(id);
    return res.status(203).json({ Updated: updatedMovie });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}

async function deleteMovieById(req, res) {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json("Movie Not Found!!");
    }
    await Movie.findByIdAndDelete(id);
    return res.status(200).json("Movie Deleted");
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
}

module.exports = {
  getAllMovies,
  getMovieByTitle,
  addMovie,
  updateMovieById,
  deleteMovieById,
  getMovieById,
};
