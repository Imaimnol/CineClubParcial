import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MovieGrid from "./components/MovieGrid";
import "./App.css";

function App() {
    const [vista, setVista] = useState("inicio");
    const [peliculas, setPeliculas] = useState([]);

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

    const seleccionarPelicula = (id) => {
        console.log("Película seleccionada:", id);
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
            </main>
        </div>
    );
}

export default App;