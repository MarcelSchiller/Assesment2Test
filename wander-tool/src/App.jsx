import { useState } from "react";
import { testWanderer, testGruppen, testWanderungen } from "./data/testDaten.jsx";
import WandererList from "./components/WandererList";
import WandererSearch from "./components/WandererSearch.jsx";
import TourList from "./components/TourList";
import CreateTour from "./components/CreateTour.jsx";
import GruppenVerwaltung from "./components/GruppenVerwaltung.jsx";
import FreieTouren from "./components/FreieTouren.jsx";


function App() {
    const [search, setSearch] = useState("");
    const [wanderer] = useState(testWanderer);
    const [touren, setTouren] = useState(testWanderungen);
    const [gruppen, setGruppen] = useState(testGruppen);
    const [selectedTourId, setSelectedTourId] = useState(1);


    const selectedTour = touren.find((w) => w.id === selectedTourId);

    const filteredWanderer = wanderer.filter(wanderer =>
        wanderer.name.toLowerCase().includes(search.toLowerCase())
    );
    const updateTourGroups = (tourId, newGroupIds) => {
        setTouren((prev) =>
            prev.map((t) => (t.id === tourId ? { ...t, gruppen: newGroupIds } : t))
        );
    };

    const addTour = (newTour) => {
        setTouren((prev) => [...prev, { ...newTour, id: Date.now() }]);
    };

    const updateGruppen = (newGruppen) => {
        setGruppen(newGruppen);
    };

    return (
        <div>
            <div>
                <h1>🥾 Wanderer</h1>
                <WandererSearch search={search} setSearch={setSearch} />
                <WandererList wanderer={filteredWanderer} />
            </div>
            <div>
                <h1>🥾 Touren</h1>

                <CreateTour addTour={addTour} />

                <section>
                    <h2 >Aktuelle Touren</h2>
                    <TourList touren={touren} />
                </section>
            </div>

            <div>
                <div>
                    <h1 >Wanderplanungs-Tool</h1>
                    <FreieTouren wanderungen={touren} gruppen={gruppen} />
                    {/* Tour Auswahl */}
                    <div>
                        <label>Tour auswählen:</label>
                        <select
                            value={selectedTourId}
                            onChange={(e) => setSelectedTourId(Number(e.target.value))}
                        >
                            {touren.map((tour) => (
                                <option key={tour.id} value={tour.id}>
                                    {tour.title} ({tour.difficulty})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Gruppen Verwaltung für ausgewählte Tour */}
                    {selectedTour && (
                        <GruppenVerwaltung
                            tour={selectedTour}
                            wanderer={wanderer}
                            gruppen={gruppen}
                            updateTourGroups={updateTourGroups}
                            updateGruppen={updateGruppen}
                        />
                    )}
                </div>
            </div>

        </div>

    );
}

export default App;
