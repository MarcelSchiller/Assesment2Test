import {useEffect, useState} from "react";

const GroupManagement = ({ tour, wanderer, gruppen, updateTourGroups, updateGruppen }) => {
    const [selectedGroupId, setSelectedGroupId] = useState(tour.gruppen[0] || null);
    const [newGroupName, setNewGroupName] = useState("");
    const [error, setError] = useState(null);

    // Hilfsfunktion: Gruppe aus gruppen-array
    const selectedGroup = gruppen.find((g) => g.id === selectedGroupId);

    // Neue Gruppe anlegen und Tour zuordnen
    const addGroup = () => {
        if (!newGroupName.trim()) return;

        const newGroup = {
            id: Date.now(),
            name: newGroupName.trim(),
            members: [],
        };

        // Gruppen state aktualisieren
        updateGruppen([...gruppen, newGroup]);

        // Tour Gruppen IDs aktualisieren
        updateTourGroups(tour.id, [...tour.gruppen, newGroup.id]);

        setSelectedGroupId(newGroup.id);
        setNewGroupName("");
    };

    // Wanderer zur Gruppe hinzufügen
    const addMemberToGroup = (wandererId) => {
        if (!selectedGroup) return;

        // Max Teilnehmer prüfen: Summe aller Mitglieder in allen Gruppen der Tour darf maxParticipants nicht überschreiten
        const totalMembers = gruppen
            .filter((g) => tour.gruppen.includes(g.id))
            .reduce((sum, g) => sum + g.members.length, 0);

        if (totalMembers >= tour.maxParticipants) {
            setError("Maximale Teilnehmeranzahl erreicht!");
            return;
        }

        if (selectedGroup.members.includes(wandererId)) return;

        setError(null);

        // Gruppe updaten
        const updatedGroup = {
            ...selectedGroup,
            members: [...selectedGroup.members, wandererId],
        };

        updateGruppen(
            gruppen.map((g) => (g.id === selectedGroup.id ? updatedGroup : g))
        );
    };

    // Wanderer aus Gruppe entfernen
    const removeMemberFromGroup = (wandererId) => {
        if (!selectedGroup) return;

        const updatedGroup = {
            ...selectedGroup,
            members: selectedGroup.members.filter((id) => id !== wandererId),
        };

        updateGruppen(
            gruppen.map((g) => (g.id === selectedGroup.id ? updatedGroup : g))
        );
    };

    // Verfügbare Wanderer (nicht in der Gruppe)
    const availableWanderer = wanderer.filter(
        (w) => !selectedGroup?.members.includes(w.id)
    );

    useEffect(() => {
        setSelectedGroupId(tour.gruppen[0] || null);
    }, [tour]);

    return (
        <div>
            <h3>{tour.title} - Gruppen verwalten</h3>

            {/* Gruppe wählen */}
            <div>
                <label>Gruppe wählen:</label>
                <select
                    value={selectedGroupId || ""}
                    onChange={(e) => setSelectedGroupId(Number(e.target.value))}
                >
                    {tour.gruppen.map((gid) => {
                        const g = gruppen.find((grp) => grp.id === gid);
                        return (
                            <option key={gid} value={gid}>
                                {g?.name || "Unbekannte Gruppe"}
                            </option>
                        );
                    })}
                </select>
            </div>


            <div>
                <input
                    type="text"
                    placeholder="Neue Gruppe"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}

                />
                <button
                    onClick={addGroup}
                >
                    Gruppe hinzufügen
                </button>
            </div>

            {/* Mitglieder */}
            <div>
                <h4 >Mitglieder</h4>
                {selectedGroup?.members.length === 0 ? (
                    <p >Keine Mitglieder in der Gruppe.</p>
                ) : (
                    <ul>
                        {selectedGroup.members.map((id) => {
                            const w = wanderer.find((w) => w.id === id);
                            if (!w) return null;
                            return (
                                <li key={id}>
                                    <span>{w.name}</span>
                                    <button onClick={() => removeMemberFromGroup(id)}>Entfernen</button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {/* Wanderer hinzufügen */}
            <div>
                <h4 >Wanderer hinzufügen</h4>
                {error && (<p>{error}</p>)}
                {availableWanderer.length === 0 ? (
                    <p >Alle Wanderer sind in dieser Gruppe.</p>
                ) : (
                    <ul>
                        {availableWanderer.map((w) => (
                            <li key={w.id} >
                                <span>{w.name}</span>
                                <button
                                    onClick={() => addMemberToGroup(w.id)}
                                >
                                    Hinzufügen
                                </button>

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GroupManagement;
