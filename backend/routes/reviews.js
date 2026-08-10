const express = require("express");

const router = express.Router();

const reseñas = [];

router.post("/:id/reviews", (req, res) => {

    const movieId = req.params.id;
    const { usuario, puntaje, comentario } = req.body;

    if (!usuario || !puntaje || !comentario) {
        return res.status(400).json({
            mensaje: "Todos los campos son obligatorios."
        });
    }

    if (puntaje < 1 || puntaje > 5) {
        return res.status(400).json({
            mensaje: "El puntaje debe estar entre 1 y 5."
        });
    }

    const nuevaReseña = {
        id: reseñas.length + 1,
        movieId: movieId,
        usuario: usuario,
        puntaje: puntaje,
        comentario: comentario
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

router.delete("/reviews/:reviewId", (req, res) => {

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

module.exports = router;