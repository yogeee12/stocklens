import { useState ,useEffect } from "react"
import { getCommonCompanies, getBrokerSummary } from "../services/api"
import Header from "../components/header"
import BrokerSidebar from "../components/BrokerSidebar"
import BrokerProfile from "../components/BrokerProfile"
import BrokerFilter from "../components/BrokerFilter"

function BrokerSummary(){
    const [brokers, SetBrokers] = useState([])
    const [selectedBroker, setSelectedBroker] = useState(null)
    const [selectedFilters, setSelectedFilters] = useState([])
    const [commonCompanies, setCommonCompanies] = useState([]);
    const [showFilter, setShowFilter] = useState(false);


    const sortedBrokers = [...brokers]
        .filter( brokers => brokers.active_recommendations > 0 )
        .sort((a, b) => new Date(b.last_recommendation_date) - new Date(a.last_recommendation_date))

    useEffect(() =>  {
        async function loadBrokers(){
            const data = await getBrokerSummary()
            SetBrokers(data)
            setSelectedBroker(data[0])
        }
        loadBrokers()
    }, [])

   async function handleCompare(){

        if(selectedFilters.length < 2){
            alert("Select at least 2 brokers");
            return;
        }

        const data = await getCommonCompanies(selectedFilters);
        setCommonCompanies(data);
    }
    console.log(handleCompare)

    return(
        <div>
            <Header />
            <div className="broker-layout">
            <BrokerSidebar brokers={sortedBrokers} onSelectBroker={setSelectedBroker} />
            <BrokerProfile broker={selectedBroker} showFilter={showFilter} setShowFilter={setShowFilter} commonCompany={commonCompanies}/>
            {showFilter && 
            <BrokerFilter brokers={sortedBrokers} 
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters} 
                onCompare={handleCompare}
                setShowFilter={setShowFilter}/>}
            </div>
        </div>
    )
}

export default BrokerSummary