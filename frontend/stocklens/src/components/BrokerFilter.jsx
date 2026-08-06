
function BrokerFilter({brokers, selectedFilters, setSelectedFilters, onCompare, setShowFilter}){

    function toggleBroker(id){

        if(selectedFilters.includes(id)){
            setSelectedFilters(
                selectedFilters.filter(x => x !== id)
            )
        }
        else{
            setSelectedFilters([
                ...selectedFilters,
                id
            ])
        }
    }
    function compare() {
    if (selectedFilters.length < 2) {
        alert("Select at least 2 brokers");
        return;
    }

    onCompare();
    }
    console.log(selectedFilters)
    return (
        <div className="broker-filter">

    <div className="broker-list">

        {brokers.map(broker => (
            <label
                key={broker.broker_id}
                className="broker-option"
            >
                <input
                    type="checkbox"
                    checked={selectedFilters.includes(broker.broker_id)}
                    disabled={
                        selectedFilters.length >= 5 &&
                        !selectedFilters.includes(broker.broker_id)
                    }
                    onChange={() => toggleBroker(broker.broker_id)}
                />

                {broker.broker_name}

            </label>
        ))}

    </div>

    <button
        className="compare-btn"
        onClick={() => {
            compare();
            setShowFilter(false);
        }}>
        Apply
    </button>

</div>
    )
}

export default BrokerFilter