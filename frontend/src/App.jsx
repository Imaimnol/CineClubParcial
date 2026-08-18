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
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const buscarPeliculas = async (texto) => {
        setCargando(true);
        setError("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/movies/search?q=${encodeURIComponent(texto)}`
            );

            if (!response.ok) {
                throw new Error("Error al buscar películas.");
            }

            const data = await response.json();

            setPeliculas(data);
            setVista("buscar");
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar las películas. Intentá nuevamente.");
        } finally {
            setCargando(false);
        }
    };

    const seleccionarPelicula = async (id) => {
        setCargando(true);
        setError("");
        setVista("detalle");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/movies/${id}`
            );

            if (!response.ok) {
                throw new Error("Error al obtener los detalles.");
            }

            const data = await response.json();

            const reviewsResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/api/movies/${id}/reviews`
            );

            if (!reviewsResponse.ok) {
                throw new Error("Error al obtener las reseñas.");
            }

            const reviewsData = await reviewsResponse.json();

            setPeliculaSeleccionada(data);
            setReseñas(reviewsData);
        } catch (error) {
            console.error(error);
            setError(
                "No se pudieron cargar los detalles de la película. Intentá nuevamente."
            );
        } finally {
            setCargando(false);
        }
    };

    const actualizarPromedio = (listaReseñas) => {
        if (listaReseñas.length === 0) {
            return 0;
        }

        const suma = listaReseñas.reduce(
            (total, reseña) => total + reseña.score,
            0
        );

        return suma / listaReseñas.length;
    };

    const eliminarReseña = async (reviewId) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/reviews/${reviewId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Error al eliminar la reseña.");
            }

            const nuevasReseñas = reseñas.filter(
                (reseña) => reseña.id !== reviewId
            );

            setReseñas(nuevasReseñas);

            setPeliculaSeleccionada((peliculaActual) => ({
                ...peliculaActual,
                avgScore: actualizarPromedio(nuevasReseñas),
            }));
        } catch (error) {
            console.error(error);
            setError("No se pudo eliminar la reseña. Intentá nuevamente.");
        }
    };

    const agregarReseña = (nuevaReseña) => {
        const nuevasReseñas = [
            ...reseñas,
            nuevaReseña,
        ];

        setReseñas(nuevasReseñas);

        setPeliculaSeleccionada((peliculaActual) => ({
            ...peliculaActual,
            avgScore: actualizarPromedio(nuevasReseñas),
        }));
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

                        {cargando ? (
                            <p>Buscando películas...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <MovieGrid
                                peliculas={peliculas}
                                onSeleccionar={seleccionarPelicula}
                            />
                        )}
                    </section>
                )}

                {vista === "detalle" && (
                    <section className="detalle">
                        {cargando ? (
                            <p>Cargando detalles...</p>
                        ) : error ? (
                            <>
                                <button onClick={() => setVista("buscar")}>
                                    ← Volver a resultados
                                </button>

                                <p>{error}</p>
                            </>
                        ) : peliculaSeleccionada ? (
                            <>
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
                                    <strong>Puntuación TMDB:</strong>{" "}
                                    {peliculaSeleccionada.puntuacion}
                                </p>

                                <p>
                                    <strong>Promedio CineClub:</strong>{" "}
                                    {peliculaSeleccionada.avgScore > 0
                                        ? peliculaSeleccionada.avgScore.toFixed(1)
                                        : "Todavía no hay puntuaciones"}
                                </p>

                                <div>
                                    <strong>Géneros:</strong>

                                    {peliculaSeleccionada.generos &&
                                        peliculaSeleccionada.generos.map(
                                            (genero) => (
                                                <span key={genero.id}>
                                                    {" "}
                                                    {genero.name}
                                                </span>
                                            )
                                        )}
                                </div>

                                <ReviewList
                                    reseñas={reseñas}
                                    onEliminar={eliminarReseña}
                                />

                                <ReviewForm
                                    movieId={peliculaSeleccionada.id}
                                    onReseñaCreada={agregarReseña}
                                />
                            </>
                        ) : null}
                    </section>
                )}
            </main>
        </div>
    );
}

export default App;