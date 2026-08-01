import { useState ,useEffect } from "react"
import { getBrokerSummary } from "../services/api"
import Header from "../components/header"

function BrokerSummary(){
    const [brokers, SetBrokers] = useState([])
    const [open, setOpen] = useState(false)
    const [selectedBroker, setSelectedBroker] = useState(null)

    const sortedBrokers = [...brokers]
        .filter( brokers => brokers.active_recommendations > 0 )
        .sort((a, b) => new Date(b.last_recommendation_date) - new Date(a.last_recommendation_date))

    useEffect(() =>  {
        async function loadBrokers(){
            const data = await getBrokerSummary()
            SetBrokers(data)
        }
        loadBrokers()
    }, [])

    return(
        <div>
            <Header />
            <h1>Broker Summary</h1>

            <table>
                <thead> 
                    <tr>
                    <th>Broker</th>
                    <th>Total recommendations</th>
                    <th>Active</th>
                    <th>Postitive</th>
                    <th>Negative</th>
                    <th>Target met</th>
                    <th>Expired</th>
                    <th>Pre-Bonus/Split</th>
                    <th>Postive %</th>
                    <th>Success %</th>
                    <th>Last Recommendation Date</th>
                    </tr>
                </thead>
                <tbody >
                    {sortedBrokers.map(broker => (
                        <tr key={broker.broker_id}>
                            <td>{broker.broker_name}</td>
                            <td>{broker.total_recommendations}</td>
                            <td>{broker.active_recommendations}</td>
                            <td>{broker.company_in_positive}</td>
                            <td>{broker.company_in_negative}</td>
                            <td>{broker.target_met}</td>
                            <td>{broker.expired}</td>
                            <td>{broker.bonus_split}</td>
                            <td>%{broker.positive_ratio}</td>
                            <td>%{broker.success_ratio}</td>
                            <td>{broker.last_recommendation_date || "-"}</td>
                            <td>
                            <span className="arrow" onClick={() => 
                            setSelectedBroker(selectedBroker === broker.broker_id 
                                ? null 
                                : broker.broker_id)>
                                setOpen(!open)}>
                                {open ? "▲" : "▼"}
                            </span>
                            </td>
                        </tr>
                    ))}
                </tbody >
                    {open &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Call Type</th>
                                    <th>Current Price</th>
                                    <th>Target Price</th>   
                                    <th>Upside</th>
                                    <th>Change Since Reco</th>
                                    <th>Reco Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedBrokers?.company_list?.map((company, index) =>
                                    <tr key={index}>
                                        <td>{company.company_name}</td>
                                        <td>{company.call_type}</td>
                                        <td>₹{company.current_price}</td>
                                        <td>₹{company.target_price}</td>
                                        <td>{company.upside}%</td>
                                        <td>{company.change_since_reco}%</td>
                                        <td>{company.reco_date}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
            </table>
        </div>
    )
}

export default BrokerSummary