const WandererList = ({ wanderer }) => {
    if (wanderer.length === 0) {
        return <p>Keine Wanderer gefunden.</p>;
    }

    return (
        <ul>
            {wanderer.map((w) => (
                <li key={w.id}>
                    {w.name}
                </li>
            ))}
        </ul>
    );
};

export default WandererList;