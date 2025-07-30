import { useState } from "react";

const CreateTour = ({ addTour }) => {
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState("Leicht");
    const [maxParticipants, setMaxParticipants] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Bitte gib einen Namen für die Tour ein.");
            return;
        }

        if (maxParticipants < 1) {
            alert("Maximale Teilnehmerzahl muss mindestens 1 sein.");
            return;
        }

        addTour({
            title: title.trim(),
            difficulty,
            maxParticipants,
            participants: [], // leer initial
        });

        // Formular zurücksetzen
        setTitle("");
        setDifficulty("Leicht");
        setMaxParticipants(1);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Neue Tour erstellen</h2>

            <input
                type="text"
                placeholder="Tour-Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            >
                <option value="Leicht">Leicht</option>
                <option value="Mittel">Mittel</option>
                <option value="Schwer">Schwer</option>
            </select>

            <input
                type="number"
                min="1"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                required
            />

            <button type="submit">Tour erstellen</button>
        </form>
    );
};

export default CreateTour;
