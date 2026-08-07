import "../styles/brokerpage.css";
import "../styles/sidebar.css"

function BrokerSidebar({ brokers ,onSelectBroker }) {
    return(
        <div className="sidebar"> 
            <h2 className="sidebar-title">Brokers</h2>
            <div className="sidebar-content">
                {brokers.map(broker => (
                    <div key={broker.broker_id} onClick={() => onSelectBroker(broker)}>
                        <ul className="sidebar-list">
                        <li className="sidebar-item">
                            {broker.broker_name}
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>    
        )
}

export default BrokerSidebar;