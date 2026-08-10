require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const moviesRoutes = require("./routes/movies");
const reviewsRoutes = require("./routes/reviews");

const app = express();

const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/movies", moviesRoutes);
app.use("/api/movies", reviewsRoutes);

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

console.log("TMDB API KEY:", process.env.TMDB_API_KEY);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});