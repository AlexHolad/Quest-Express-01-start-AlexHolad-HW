// Express is already installed
const express = require("express");
// Array of movies
const movies = require("./movies");
// In codesandbox we need to use the default port which is 8080
const port = 8080;

const server = express();

server.get("/", (req, res) => {
  res.send("Welcome to my favourite movie list");
});

server.get("/api/movies", (req, res) => {
  res.status(200).json(movies);
});

server.get("/api/movies/:id", (req, res) => {
  const selectedFilm = movies.find(
    (film) => req.params.id === film.id.toString()
  );
  if (selectedFilm) {
    res.status(200).json(selectedFilm);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
});

server.get("/api/search", (req, res) => {
  console.log(req.query.maxDuration);
  const selectedFilms = movies.filter(
    (film) => req.query.maxDuration === film.duration.toString()
  );
  if (selectedFilms) {
    res.status(200).json(selectedFilms);
  } else {
    res.status(404).json({ message: "no movies found for this duration" });
  }
});

server.get("/api/users", (req, res) => {
  res.status(401).json({ message: "unauthorized" });
});

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
