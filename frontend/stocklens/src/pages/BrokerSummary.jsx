import { useState ,useEffect } from "react"
import { getBrokerSummary } from "../services/api"
import Header from "../components/header"

function BrokerSummary(){
    const [brokers, SetBrokers] = useState([])

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
                    </tr>
                </thead>
                <tbody>
                    {brokers.map(broker => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default BrokerSummary