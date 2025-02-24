const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    director: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: false,
    },
    releasedYear: {
      type: Number,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      minlength: 0,
      maxlength: 10,
      default: 0,
    },
    duration: {
      type: Number,
      required: false,
      maxlength: 255,
    },
    actors: [
      {
        type: String,
        required: false,
      },
    ],
    description: {
      type: String,
      required: false,
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [], // default empty array for comments array in movie schema. This will be updated with new comments in movieController.js file.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments functionality.  // TODO: Add comments
    },
  },
  {
    timestamps: true,
  }
);

// try to use "trim" for whitespaces  trim:true

const Movie = mongoose.model("Movie", movieSchema);
exports.Movie = Movie;
