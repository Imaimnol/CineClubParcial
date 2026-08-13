import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import "./App.css";

function App() {
    const [vista, setVista] = useState("inicio");
    const [peliculas, setPeliculas] = useState([]);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
    const [reseñas, setReseñas] = useState([]);

    const buscarPeliculas = async (texto) => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/movies/search?q=${encodeURIComponent(texto)}`
            );

            if (!response.ok) {
                throw new Error("Error al buscar películas.");
            }

            const data = await response.json();

            setPeliculas(data);
            setVista("buscar");
        } catch (error) {
            console.error(error);
        }
    };

    const seleccionarPelicula = async (id) => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/movies/${id}`
            );

            if (!response.ok) {
                throw new Error("Error al obtener los detalles.");
            }

            const data = await response.json();

            const reviewsResponse = await fetch(
                `http://localhost:3001/api/movies/${id}/reviews`
            );

            if (!reviewsResponse.ok) {
                throw new Error("Error al obtener las reseñas.");
            }

            const reviewsData = await reviewsResponse.json();

            setPeliculaSeleccionada(data);
            setReseñas(reviewsData);
            setVista("detalle");
        } catch (error) {
            console.error(error);
        }
    };

    const eliminarReseña = async (reviewId) => {
        try {
            const response = await fetch(
                `http://localhost:3001/api/movies/${reviewId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Error al eliminar la reseña.");
            }

            setReseñas((reseñasActuales) =>
                reseñasActuales.filter(
                    (reseña) => reseña.id !== reviewId
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="app">
            <header className="header">
                <h1>CineClub</h1>

                <nav>
                    <button onClick={() => setVista("inicio")}>
                        Inicio
                    </button>

                    <button onClick={() => setVista("buscar")}>
                        Buscar películas
                    </button>
                </nav>
            </header>

            <main>
                {vista === "inicio" && (
                    <section className="inicio">
                        <h2>Bienvenido a CineClub</h2>

                        <p>
                            Buscá películas, consultá sus detalles y dejá
                            reseñas.
                        </p>

                        <SearchBar onBuscar={buscarPeliculas} />
                    </section>
                )}

                {vista === "buscar" && (
                    <section className="buscar">
                        <h2>Buscar películas</h2>

                        <SearchBar onBuscar={buscarPeliculas} />

                        <MovieGrid
                            peliculas={peliculas}
                            onSeleccionar={seleccionarPelicula}
                        />
                    </section>
                )}

                {vista === "detalle" && peliculaSeleccionada && (
                    <section className="detalle">
                        <button onClick={() => setVista("buscar")}>
                            ← Volver a resultados
                        </button>

                        <h2>{peliculaSeleccionada.titulo}</h2>

                        {peliculaSeleccionada.imagen && (
                            <img
                                src={peliculaSeleccionada.imagen}
                                alt={peliculaSeleccionada.titulo}
                            />
                        )}

                        <p>
                            <strong>Descripción:</strong>{" "}
                            {peliculaSeleccionada.descripcion ||
                                "Sin descripción disponible."}
                        </p>

                        <p>
                            <strong>Fecha de estreno:</strong>{" "}
                            {peliculaSeleccionada.fechaEstreno ||
                                "Sin fecha disponible."}
                        </p>

                        <p>
                            <strong>Duración:</strong>{" "}
                            {peliculaSeleccionada.duracion
                                ? `${peliculaSeleccionada.duracion} minutos`
                                : "Sin información."}
                        </p>

                        <p>
                            <strong>Puntuación:</strong>{" "}
                            {peliculaSeleccionada.puntuacion}
                        </p>

                        <div>
                            <strong>Géneros:</strong>

                            {peliculaSeleccionada.generos &&
                                peliculaSeleccionada.generos.map((genero) => (
                                    <span key={genero.id}>
                                        {" "}
                                        {genero.name}
                                    </span>
                                ))}
                        </div>

                        <ReviewList
                            reseñas={reseñas}
                            onEliminar={eliminarReseña}
                        />

                        <ReviewForm
                            movieId={peliculaSeleccionada.id}
                            onReseñaCreada={(nuevaReseña) => {
                                setReseñas((reseñasActuales) => [
                                    ...reseñasActuales,
                                    nuevaReseña,
                                ]);
                            }}
                        />
                    </section>
                )}
            </main>
        </div>
    );
}

export default App;