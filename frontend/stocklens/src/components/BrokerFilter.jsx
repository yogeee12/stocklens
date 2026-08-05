
function BrokerFilter({brokers, selectedFilters, setSelectedFilters, onCompare}){

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

    onCompare(selectedFilters);
    }
    console.log(selectedFilters)
    return (
        <div className="broker-filter">

    {/* <h3>Compare Brokers</h3> */}

    <div className="broker-list">

        {brokers.map(broker => (
            <label
                key={broker.broker_id}
                className="broker-option"
            >
                <input
                    type="checkbox"
                    checked={selectedFilters.includes(broker.broker_id)}
                    onChange={() => toggleBroker(broker.broker_id)}
                />

                {broker.broker_name}

            </label>
        ))}

    </div>

    <button
        className="compare-btn"
        onClick={compare}
    >
        Apply
    </button>

</div>
    )
}

export default BrokerFilter