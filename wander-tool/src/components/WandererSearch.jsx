const WandererSearch = ({ search, setSearch }) => (
    <input
        type="text"
        placeholder="Wanderer suchen..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
);

export default WandererSearch;
