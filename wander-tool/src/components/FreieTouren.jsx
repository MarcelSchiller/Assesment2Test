import React from "react";

const FreieTouren = ({ wanderungen, gruppen }) => {
    // Hilfsfunktion: Anzahl Teilnehmer einer Tour berechnen
    const countParticipants = (tour) => {
        const tourGroups = gruppen.filter((g) => tour.gruppen.includes(g.id));
        return tourGroups.reduce((sum, g) => sum + g.members.length, 0);
    };

    // Filter für freie Touren
    const availableTours = wanderungen.filter(
        (tour) => countParticipants(tour) < tour.maxParticipants
    );

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Freie Touren</h2>
            {availableTours.length === 0 ? (
                <p>Keine freien Touren verfügbar.</p>
            ) : (
                <ul>
                    {availableTours.map((tour) => (
                        <li key={tour.id}>
                            {tour.title} ({tour.difficulty}) — Plätze frei:{" "}
                            {tour.maxParticipants - countParticipants(tour)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FreieTouren;
