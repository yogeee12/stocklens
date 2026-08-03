import {useState, useEffect} from "react";
import { getBrokerSummary } from "../services/api";
import "../styles/brokerpage.css";

function BrokerSidebar({ onSelectBroker }) {
    const [brokers, setBrokers] = useState([]);

    useEffect(() => {
        async function loadBrokers(){
            const data = await getBrokerSummary()
            setBrokers(data)
        }
        loadBrokers()
    }, [])
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