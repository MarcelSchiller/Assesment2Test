const TourList = ({ touren }) => {
    if (touren.length === 0) {
        return <p>Noch keine Touren angelegt.</p>;
    }

    return (
        <ul>
            {touren.map((t) => (
                <li key={t.id}>
                    <strong>{t.title}</strong>, Schwierigkeit: <strong>{t.difficulty}</strong>, Max Teilnehmer: <strong>{t.maxParticipants}</strong>
                </li>
            ))}
        </ul>
    );
};

export default TourList;
