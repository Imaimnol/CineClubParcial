import { useState } from "react";

function SearchBar({ onBuscar }) {
    const [texto, setTexto] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!texto.trim()) {
            return;
        }

        onBuscar(texto);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                placeholder="Buscar una película..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
            />

            <button type="submit">
                Buscar
            </button>
        </form>
    );
}

export default SearchBar;