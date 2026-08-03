import { useState ,useEffect , Fragment } from "react"
import { getBrokerSummary } from "../services/api"
import Header from "../components/header"
import BrokerSidebar from "../components/BrokerSidebar"


function BrokerSummary(){
    const [brokers, SetBrokers] = useState([])
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
            <BrokerSidebar onSelectBroker={setSelectedBroker} />
        </div>
    )
}

export default BrokerSummary