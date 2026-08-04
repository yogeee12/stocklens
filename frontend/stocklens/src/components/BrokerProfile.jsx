import { useState } from "react"

function BrokerProfile({ broker }){

    const [filter, setFilter] = useState("ACTIVE")

    const rows = broker.recommendation.filter(row => {
        switch(filter){
            
            case "ACTIVE":
                return row.upside !== null
            
            case "POSITIVE":
                return row.upside > 0

            case "NEGATIVE":
                return row.upside < 0

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

    if(!broker){
        return <p>Loading...</p>
    }
    
    return (
        <div className="broker-profile">
                    <h3 className="broker-title">{broker.broker_name}</h3>
                    <div className="broker-profile-boxes">   
                    <div className="broker-box total-recommendation">
                        <small className="broker-box-title">Total Reommendation</small>
                        <p className="broker-box-value">{broker.total_recommendations}</p>
                        </div>
                    <div className="broker-box active_recommendations " onClick={setFilter('ACTIVE')}>
                        <small className="broker-box-title">Active Recommendations</small>
                        <p className="broker-box-value">{broker.active_recommendations}</p>
                        </div>
                    <div className="broker-box company-in-positive" onClick={'POSITIVE'}>
                        <small className="broker-box-title">Positive</small>
                        <p className="broker-box-value">{broker.company_in_positive}</p>
                        </div>
                    <div className="broker-box company-in-negative" onClick={'NEGATIVE'}>
                        <small className="broker-box-title">Negative</small>
                        <p className="broker-box-value">{broker.company_in_negative}</p>
                        </div>
                    <div className="broker-box success-ratio">
                        <small className="broker-box-title ">Success Ratio</small>
                        <p className="broker-box-value">{broker.success_ratio}</p>
                        </div>
                    <div className="broker-box positive-ratio">
                        <small className="broker-box-title">Positive Ratio</small>
                        <p className="broker-box-value">{broker.positive_ratio}</p>
                        </div>
                    <div className="broker-box target-met" onClick={'TARGET_MET'}>
                        <small className="broker-box-title">Target Met</small>
                        <p className="broker-box-value">{broker.target_met}</p>
                        </div>
                    <div className="broker-box pre-bonus-split" onClick={'BONUS_SPLIT'}>
                        <small className="broker-box-title">Pre-Bonus/Split</small>
                        <p className="broker-box-value">{broker.bonus_split}</p>
                        </div>
                    <div className="broker-box expired" onClick={'EXPIRED'}>
                        <small className="broker-box-title">Expired</small>
                        <p className="broker-box-value">{broker.expired}</p>
                        </div>
                    </div>
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
                                <tr>
                                    <td className="company-name">{company.company_name}</td>
                                    <td>{company.call_type}</td>
                                    <td>₹{company.current_price}</td>
                                    <td>₹{company.target_price}</td>
                                    <td>%{company.upside}</td>
                                    <td>%{company.change_at_reco}</td>
                                    <td>{company.recommendation_date}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                </div>
        </div>
    )
}

export default BrokerProfile