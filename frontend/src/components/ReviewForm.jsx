import { useState } from "react";

function ReviewForm({ movieId, onReseñaCreada }) {
    const [author, setAuthor] = useState("");
    const [score, setScore] = useState(5);
    const [comment, setComment] = useState("");

    const enviarReseña = async (e) => {
        e.preventDefault();

        if (!author.trim() || !comment.trim()) {
            alert("El nombre y el comentario son obligatorios.");
            return;
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/movies/${movieId}/reviews`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        author: author.trim(),
                        score: Number(score),
                        comment: comment.trim(),
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error al crear la reseña.");
            }

            const nuevaReseña = await response.json();

            onReseñaCreada(nuevaReseña);

            setAuthor("");
            setScore(5);
            setComment("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="review-form">
            <h3>Dejá tu reseña</h3>

            <form onSubmit={enviarReseña}>
                <div>
                    <label>Nombre:</label>

                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Tu nombre"
                    />
                </div>

                <div>
                    <label>Puntaje:</label>

                    <select
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>

                <div>
                    <label>Comentario:</label>

                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Escribí tu opinión..."
                    />
                </div>

                <button type="submit">
                    Publicar reseña
                </button>
            </form>
        </section>
    );
}

export default ReviewForm;