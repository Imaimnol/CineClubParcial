const express = require("express");
const axios = require("axios");

const router = express.Router();

const reviewsRoutes = require("./reviews");

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

        // Obtener las reseñas de nuestra aplicación
        const reseñas = reviewsRoutes.obtenerReseñas(id);

        // Calcular el promedio de las reseñas
        let avgScore = 0;

        if (reseñas.length > 0) {
            const suma = reseñas.reduce(
                (total, reseña) => total + reseña.score,
                0
            );

            avgScore = suma / reseñas.length;
        }

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
            puntuacion: pelicula.vote_average,
            reseñas: reseñas,
            avgScore: avgScore
        });

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return res.status(404).json({
                mensaje: "Película no encontrada."
            });
        }

        res.status(500).json({
            mensaje: "Error al obtener la película."
        });
    }
});

module.exports = router;