const express = require("express");

const router = express.Router();

const reseñas = [];

router.post("/:id/reviews", (req, res) => {

    const movieId = req.params.id;
    const { author, score, comment } = req.body;

    if (!author || score === undefined || !comment) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios."
        });
    }

    if (typeof score !== "number" || score < 1 || score > 5) {
        return res.status(400).json({
            mensaje: "El score debe ser un número entre 1 y 5."
        });
    }

    const nuevaReseña = {
        id: Date.now(),
        movieId: movieId,
        author: author,
        score: score,
        comment: comment
    };

    reseñas.push(nuevaReseña);

    res.status(201).json(nuevaReseña);
});

router.get("/:id/reviews", (req, res) => {

    const movieId = req.params.id;

    const reseñasPelicula = reseñas.filter(
        (reseña) => reseña.movieId === movieId
    );

    res.json(reseñasPelicula);
});

router.delete("/:reviewId", (req, res) => {

    const reviewId = Number(req.params.reviewId);

    const indice = reseñas.findIndex(
        (reseña) => reseña.id === reviewId
    );

    if (indice === -1) {
        return res.status(404).json({
            mensaje: "Reseña no encontrada."
        });
    }

    const reseñaEliminada = reseñas.splice(indice, 1);

    res.json({
        mensaje: "Reseña eliminada correctamente.",
        reseña: reseñaEliminada[0]
    });
});

function obtenerReseñas(movieId) {
    return reseñas.filter(
        (reseña) => reseña.movieId === movieId
    );
}

module.exports = router;
module.exports.obtenerReseñas = obtenerReseñas;