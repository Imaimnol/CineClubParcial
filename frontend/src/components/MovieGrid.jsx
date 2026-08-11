import MovieCard from "./MovieCard";

function MovieGrid({ peliculas, onSeleccionar }) {
    if (peliculas.length === 0) {
        return <p>No se encontraron películas.</p>;
    }

    return (
        <section className="movie-grid">
            {peliculas.map((pelicula) => (
                <MovieCard
                    key={pelicula.id}
                    pelicula={pelicula}
                    onSeleccionar={onSeleccionar}
                />
            ))}
        </section>
    );
}

export default MovieGrid;