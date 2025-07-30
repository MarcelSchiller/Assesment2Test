import { useState } from "react";
import WandererSearch from "./WandererSearch.jsx";

const GruppenOrganisation = ({ wanderer, gruppen, updateGruppen, search, setSearch }) => {
    const [selectedGroupId, setSelectedGroupId] = useState(gruppen[0]?.id || null);
    const [newGroupName, setNewGroupName] = useState("");

    const selectedGroup = gruppen.find((g) => g.id === selectedGroupId);



    // Neue Gruppe anlegen
    const addGroup = () => {
        if (!newGroupName.trim()) return;

        const newGroup = {
            id: Date.now(),
            name: newGroupName.trim(),
            members: [],
        };

        updateGruppen([...gruppen, newGroup]);
        setSelectedGroupId(newGroup.id);
        setNewGroupName("");
    };

    // Wanderer zur Gruppe hinzufügen
    const addMemberToGroup = (wandererId) => {
        if (!selectedGroup || selectedGroup.members.includes(wandererId)) return;

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

    const availableWanderer = wanderer.filter(
        (w) => !selectedGroup?.members.includes(w.id)
    );

    const filteredWanderer = availableWanderer.filter(wanderer =>
        wanderer.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h3>Gruppenübersicht</h3>
            <ul>
                {gruppen.map((g) => (
                    <li key={g.id}>
                        {g.name} — {g.members.length} {g.members.length === 1 ? "Mitglied" : "Mitglieder"}
                    </li>
                ))}
            </ul>
            <h3>Gruppen verwalten</h3>

            {/* Gruppe wählen */}
            <div>
                <label>Gruppe wählen:</label>
                <select
                    value={selectedGroupId || ""}
                    onChange={(e) => setSelectedGroupId(Number(e.target.value))}
                >
                    {gruppen.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Neue Gruppe anlegen */}
            <div>
                <input
                    type="text"
                    placeholder="Neue Gruppe"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                />
                <button onClick={addGroup}>Gruppe hinzufügen</button>
            </div>

            {/* Mitgliederliste */}
            <div>
                <h4>Mitglieder ({selectedGroup?.members.length})</h4>
                {selectedGroup?.members.length === 0 ? (
                    <p>Keine Mitglieder in der Gruppe.</p>
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

            {/* Hinzufügen */}
            <div>
                <h4>Wanderer hinzufügen</h4>
                <WandererSearch search={search} setSearch={setSearch} />
                {filteredWanderer.length === 0 ? (
                    <p>Alle Wanderer sind in dieser Gruppe.</p>
                ) : (
                    <ul>
                        {filteredWanderer.map((w) => (
                            <li key={w.id}>
                                <span>{w.name}</span>
                                <button onClick={() => addMemberToGroup(w.id)}>Hinzufügen</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default GruppenOrganisation;
