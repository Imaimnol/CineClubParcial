const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/search", async (req, res) => {

    const query = req.query.q;

    if (!query) {
        return res.status(400).json({
            mensaje: "Debe ingresar un término de búsqueda."
        });
    }

    try {

        const response = await axios.get(
            "https://api.themoviedb.org/3/search/movie",
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    query: query,
                    language: "es-ES"
                }
            }
        );

        const peliculas = response.data.results.map((pelicula) => ({
            id: pelicula.id,
            titulo: pelicula.title,
            fechaEstreno: pelicula.release_date,
            imagen: pelicula.poster_path
                ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
                : null,
            puntuacion: pelicula.vote_average
        }));

        res.json(peliculas);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al consultar TMDB."
        });

    }

});

router.get("/:id", async (req, res) => {

    const id = req.params.id;

    try {

        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}`,
            {
                params: {
                    api_key: process.env.TMDB_API_KEY,
                    language: "es-ES"
                }
            }
        );

        const pelicula = response.data;

        res.json({
            id: pelicula.id,
            titulo: pelicula.title,
            descripcion: pelicula.overview,
            fechaEstreno: pelicula.release_date,
            duracion: pelicula.runtime,
            generos: pelicula.genres,
            imagen: pelicula.poster_path
                ? `https://image.tmdb.org/t/p/w500${pelicula.poster_path}`
                : null,
            puntuacion: pelicula.vote_average
        });

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener la película."
        });

    }

});

module.exports = router;