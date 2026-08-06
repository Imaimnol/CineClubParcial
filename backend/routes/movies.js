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

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al consultar TMDB."
        });

    }

});

module.exports = router;