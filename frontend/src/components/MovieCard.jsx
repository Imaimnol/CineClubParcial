function MovieCard({ pelicula, onSeleccionar }) {
    return (
        <article className="movie-card">
            {pelicula.imagen && (
                <img
                    src={pelicula.imagen}
                    alt={pelicula.titulo}
                />
            )}

            <h3>{pelicula.titulo}</h3>

            <p>
                Año: {pelicula.fechaEstreno || "Sin fecha"}
            </p>

            <p>
                ★ {pelicula.puntuacion || "Sin puntuación"}
            </p>

            <button onClick={() => onSeleccionar(pelicula.id)}>
                Ver detalles
            </button>
        </article>
    );
}

export default MovieCard;