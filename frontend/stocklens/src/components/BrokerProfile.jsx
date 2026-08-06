import { useState } from "react"

function BrokerProfile({ broker, showFilter, setShowFilter, commonCompany }){  
    const [filter, setFilter] = useState("ACTIVE")
    const [nonNumeric , setNumeric] = useState(false)
    const [title , setTitle] = useState('Active Recommendations')
    
    if(!broker){
        return <p>Loading...</p>
    }
    console.log(broker)
    const rows = broker.company_list.filter(row => {
        switch(filter){

            case "ALL":
                return row.upside_status
            
            case "ACTIVE":
                return typeof row.upside === "number"
            
            case "POSITIVE":
                return row.change_at_reco > 0 && typeof row.upside === "number"

            case "NEGATIVE":
                return row.change_at_reco < 0 && typeof row.upside === "number"

            case "TARGET_MET":
                return row.upside_status === "Target met"

            case "BONUS_SPLIT":
                return row.upside_status === "Pre-Bonus/Split"

            case "EXPIRED":
                return row.upside_status === ""

            default:
                return true
        }
    })
        console.log(commonCompany)
    return (
        <div className="broker-profile">
                <div className="profile-header">
                    {commonCompany.length === 0 &&<h3 className="broker-title">{broker.broker_name}</h3>}
                    <div className="brokerfilter">
                        <button className="filter=btn" onClick={() => { setShowFilter(!showFilter) }}>
                            ≡
                        </button>
                    </div>
                </div>
            {commonCompany.length === 0 && 
                    <div className="broker-profile-boxes">   
                    <div className="broker-box total-recommendation" onClick={ () => {
                        setFilter("ALL"); 
                        setNumeric(false);
                        setTitle('Total Recommendations');}}>
                        <small className="broker-box-title">Total Reommendation</small>
                        <p className="broker-box-value">{broker.total_recommendations}</p>
                        </div>
                    <div className="broker-box active_recommendations " onClick={() => {
                        setFilter('ACTIVE'); 
                        setNumeric(true);
                        setTitle("Active Recommendations")}}>
                        <small className="broker-box-title">Active Recommendations</small>
                        <p className="broker-box-value">{broker.active_recommendations}</p>
                        </div>
                    <div className="broker-box expired" onClick={() => {
                        setFilter('EXPIRED'); 
                        setNumeric(false); 
                        setTitle("Recommedations with no values");}}>
                        <small className="broker-box-title">Expired</small>
                        <p className="broker-box-value">{broker.expired}</p>
                        </div>
                    <div className="broker-box company-in-positive" onClick={() => {
                        setFilter('POSITIVE'); 
                        setNumeric(true);
                        setTitle("Active Positive Recommendations")}}>
                        <small className="broker-box-title">Positive</small>
                        <p className="broker-box-value">{broker.company_in_positive}</p>
                        </div>
                    <div className="broker-box company-in-negative" onClick={() => {
                        setFilter('NEGATIVE'); 
                        setNumeric(true);
                        setTitle("Active Negative Recommendations");}}>
                        <small className="broker-box-title">Negative</small>
                        <p className="broker-box-value">{broker.company_in_negative}</p>
                        </div>
                    <div className="broker-box target-met" onClick={() => {
                        setFilter('TARGET_MET'); 
                        setNumeric(false);
                        setTitle("Recommendations Target Met");}}>
                        <small className="broker-box-title">Target Met</small>
                        <p className="broker-box-value">{broker.target_met}</p>
                        </div>
                    <div className="broker-box pre-bonus-split" onClick={() => {
                        setFilter('BONUS_SPLIT'); 
                        setNumeric(false);
                        setTitle("Recommendations Pre-Bonus/Split");}}>
                        <small className="broker-box-title">Pre-Bonus/Split</small>
                        <p className="broker-box-value">{broker.bonus_split}</p>
                        </div>
                    <div className="broker-box success-ratio">
                        <small className="broker-box-title ">Success Perc.</small>
                        <p className="broker-box-value">%{broker.success_ratio}</p>
                        </div>
                    <div className="broker-box positive-ratio">
                        <small className="broker-box-title">Positive Perc.</small>
                        <p className="broker-box-value">%{broker.positive_ratio}</p>
                        </div>
                    </div>
                    }
                    {commonCompany.length === 0 && ( 
                    <div>
                    <h4 className="table-title">{title}</h4>
                    <div className="broker-summary-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Call Type</th>
                                    <th>Current Price</th>
                                    <th>Target Price</th>
                                    <th>Upside</th>
                                    <th>Change Sine Reco.</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(company => 
                                <tr key={company.company_id}>
                                    <td className="company-name">{company.company_name}</td>
                                    <td>{company.call_type}</td>
                                    <td>₹{company.current_price}</td>
                                    <td>₹{company.target_price}</td>
                                    <td>{nonNumeric === true
                                            ? company.upside
                                            : company.upside_status
                                        }</td>
                                    <td>%{company.change_at_reco}</td>
                                    <td>{company.recommendation_date}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                        </div>
                        )}
                        {commonCompany.length !== 0 && (
                            <div className="common-company-table">
                        <h3>Common Recommendations</h3>
                        <div></div>
                        <table>
                        <thead>
                        <tr>
                        <th>Company</th>
                        {/* dynamic broker names */}
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                        </table>
                        </div>
                        )}
        </div>
    )
}

export default BrokerProfile