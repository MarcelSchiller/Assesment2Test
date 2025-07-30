const TourList = ({ touren, gruppen, updateTourGroups }) => {
    if (touren.length === 0) {
        return <p>Noch keine Touren angelegt.</p>;
    }

    // Hilfsfunktion: Prüft, ob Gruppe für Tour geeignet ist
    const isGroupEligible = (group, tour) => {
        return group.members.length < tour.maxParticipants;
    };

    const handleGroupChange = (tourId, groupId) => {
        updateTourGroups(tourId, [groupId]); // Ersetzt die gruppen mit nur der neuen Gruppe; bei Bedarf anpassen
    };

    return (
        <ul>
            {touren.map((t) => {
                const eligibleGroups = gruppen.filter((g) => isGroupEligible(g, t));
                const selectedGroupId = t.gruppen.length > 0 ? t.gruppen[0] : "";

                return (
                    <li key={t.id} style={{ marginBottom: "1rem" }}>
                        <strong>{t.title}</strong>, Schwierigkeit: <strong>{t.difficulty}</strong>, Max Teilnehmer: <strong>{t.maxParticipants}</strong>

                        <div style={{ marginTop: "0.5rem" }}>
                            <label>
                                Gruppe zuordnen:{" "}
                                <select
                                    value={selectedGroupId}
                                    onChange={(e) => handleGroupChange(t.id, Number(e.target.value))}
                                >
                                    <option value="">-- Keine Gruppe --</option>
                                    {eligibleGroups.map((g) => (
                                        <option key={g.id} value={g.id}>
                                            {g.name} ({g.members.length} Mitglieder)
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default TourList;
