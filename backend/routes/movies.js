const express = require("express");

const router = express.Router();

router.get("/search", (req, res) => {
    res.json({
        mensaje: "Ruta de búsqueda funcionando"
    });
});

module.exports = router;