function BrokerProfile({ broker }){

    if(!broker){
        return <p>Loading...</p>
    }
    
    return (
        <div className="broker-profile">
                    <div className="broker-profile">   
                    <h3 className="broker-title">{broker.broker_name}</h3>
                    <div className="broker-box total-recommendation">
                        <small className="broker-box-title">Total Reommendation</small>
                        <p className="broker-box-value">{broker.total_recommendations}</p>
                        </div>
                    <div className="broker-box active_recommendations">
                        <small className="broker-box-title">Active Recommendations</small>
                        <p className="broker-box-value">{broker.acitve_recommendations}</p>
                        </div>
                    <div className="broker-box company-in-positive">
                        <small className="broker-box-title">Positive</small>
                        <p className="broker-box-value">{broker.company_in_positive}</p>
                        </div>
                    <div className="broker-box company-in-negative">
                        <small className="broker-box-title">Negative</small>
                        <p className="broker-box-value">{broker.company_in_negative}</p>
                        </div>
                    <div className="broker-box ">
                        <small className="broker-box-title success-ratio">Success Ratio</small>
                        <p className="broker-box-value">{broker.success_ratio}</p>
                        </div>
                    <div className="broker-box positive-ratio">
                        <small className="broker-box-title">Positive Ratio</small>
                        <p className="broker-box-value">{broker.positive_ratio}</p>
                        </div>
                    <div className="broker-box target-met">
                        <small className="broker-box-title">Target Met</small>
                        <p className="broker-box-value">{broker.target_met}</p>
                        </div>
                    <div className="broker-box pre-bonus-split">
                        <small className="broker-box-title">Pre-Bonus/Split</small>
                        <p className="broker-box-value">{broker.bonus_split}</p>
                        </div>
                    <div className="broker-box expired">
                        <small className="broker-box-title">Expired</small>
                        <p className="broker-box-value">{broker.expired}</p>
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
                                {broker.company_list.map(company => 
                                <tr>
                                    <td>{company.company_name}</td>
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
        </div>
    )
}

export default BrokerProfile