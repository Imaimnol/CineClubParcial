function ReviewList({ reseñas, onEliminar }) {
    if (reseñas.length === 0) {
        return <p>Todavía no hay reseñas para esta película.</p>;
    }

    return (
        <section className="reviews">
            <h3>Reseñas</h3>

            {reseñas.map((reseña) => (
                <article key={reseña.id} className="review">
                    <h4>{reseña.author}</h4>

                    <p>
                        <strong>Puntaje:</strong> {reseña.score}/5
                    </p>

                    <p>{reseña.comment}</p>

                    <button onClick={() => onEliminar(reseña.id)}>
                        Eliminar
                    </button>
                </article>
            ))}
        </section>
    );
}

export default ReviewList;