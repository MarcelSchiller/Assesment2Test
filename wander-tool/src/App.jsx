import { useState } from "react";
import { testWanderer, testGruppen, testWanderungen } from "./data/testDaten.jsx";
import WandererList from "./components/WandererList";
import WandererSearch from "./components/WandererSearch.jsx";
import TourList from "./components/TourList";
import CreateTour from "./components/CreateTour.jsx";
import FreieTouren from "./components/FreieTouren.jsx";
import GruppenOrganisation from "./components/GruppenOrganisation.jsx";


function App() {
    const [search, setSearch] = useState("");
    const [wanderer] = useState(testWanderer);
    const [touren, setTouren] = useState(testWanderungen);
    const [gruppen, setGruppen] = useState(testGruppen);
    const [selectedTourId] = useState(1);
    const [activeTab, setActiveTab] = useState("wanderer");

    const selectedTour = touren.find((w) => w.id === selectedTourId);

    const filteredWanderer = wanderer.filter(wanderer =>
        wanderer.name.toLowerCase().includes(search.toLowerCase())
    );
    const updateTourGroups = (tourId, newGroupIds) => {
        setTouren((prevTouren) =>
            prevTouren.map((tour) =>
                tour.id === tourId ? { ...tour, gruppen: newGroupIds } : tour
            )
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
            <nav className="mb-6 flex space-x-4">
                <button
                    onClick={() => setActiveTab("wanderer")}
                >
                    Wanderer
                </button>
                <button
                    onClick={() => setActiveTab("touren")}
                >
                    Touren
                </button>
                <button
                    onClick={() => setActiveTab("gruppen")}
                >
                    Gruppen
                </button>
                <button
                    onClick={() => setActiveTab("freieTouren")}
                >
                    Freie Touren
                </button>
            </nav>

            <main>
                {activeTab === "wanderer" && (
                    <div>
                        <h1>🥾 Wanderer</h1>
                        <WandererSearch search={search} setSearch={setSearch} />
                        <WandererList wanderer={filteredWanderer} />
                    </div>
                )}
                {activeTab === "touren" && (
                    <div>
                        <h1>🥾 Touren</h1>

                        <CreateTour addTour={addTour} />

                        <section>
                            <h2 >Aktuelle Touren</h2>
                            <TourList touren={touren} gruppen={gruppen} updateTourGroups={updateTourGroups} />
                        </section>
                    </div>
                )}

                {activeTab === "gruppen" && (
                    <div>
                        <h1 >Gruppen</h1>

                        {/* Gruppen Verwaltung für ausgewählte Tour */}
                        {selectedTour && (
                            <GruppenOrganisation
                                tour={selectedTour}
                                wanderer={wanderer}
                                gruppen={gruppen}
                                updateGruppen={updateGruppen}
                                search={search}
                                setSearch={setSearch}
                            />
                        )}
                    </div>
                )}

                {activeTab === "freieTouren" && (
                    <FreieTouren wanderungen={touren} gruppen={gruppen} />
                )}

            </main>
        </div>

    );
}

export default App;
