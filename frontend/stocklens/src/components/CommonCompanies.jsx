import { useState } from "react"

function CommonCompanies({ companies }){
    const [filter, setFilter] = useState("ACTIVE")
    const [nonNumeric , setNumeric] = useState(false)
    const [title , setTitle] = useState('Active Recommendations')
    
    const totalRecommendations = companies.length
    const totalCompanies = new Set(companies.map (r => r.company_name)).size
    const activeCompanies = companies.filter(r => typeof r.upside === "number").length
    const targetMet = companies.filter(r => r.upside_status === "Target met").length
    const bonusSplit = companies.filter(r => r.upside_status === "Pre-Bonus/Split").length
    const expired = companies.filter(r => r.upside_status === "").length
    const latestRecommendations = Object.values(

    companies.reduce((acc, row) => {

        if (
            !acc[row.broker_id] ||
            new Date(row.recommendation_date) >
            new Date(acc[row.broker_id].recommendation_date)
        ) {
            acc[row.broker_id] = row;
        }

        return acc;

        }, {})

    );

    const rows = companies.filter(row => {
        switch(filter){

            case "ALL":
                return row.upside_status
            
            case "LATEST":
                return latestRecommendations.some(
            latest =>
            latest.broker_id === row.broker_id &&
            latest.company_id === row.company_id &&
            latest.recommendation_date === row.recommendation_date
    );

            case "ACTIVE":
                return typeof row.upside === "number"

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
    return (
        <div className="common-company-profile"> 
            <div className="broker-profile-boxes">
                    <div className="broker-box total-recommendation" onClick={ () => {
                        setFilter("ALL"); 
                        setNumeric(false);
                        setTitle('Total Recommendations');}}>
                        <small className="broker-box-title">Total Reommendation</small>
                        <p className="broker-box-value">{totalRecommendations}</p>
                        </div>
                    <div className="broker-box total-company" onClick={ () => {
                        setFilter("COMPANIES"); 
                        setNumeric(false);
                        setTitle('Total Recommendations');}}>
                        <small className="broker-box-title">Total Companies</small>
                        <p className="broker-box-value">{totalCompanies}</p>
                        </div>
                    <div className="broker-box active_recommendations " onClick={() => {
                        setFilter('ACTIVE'); 
                        setNumeric(true);
                        setTitle("Active Recommendations")}}>
                        <small className="broker-box-title">Active Recommendations</small>
                        <p className="broker-box-value">{activeCompanies}</p>
                        </div>
                    <div className="broker-box expired" onClick={() => {
                        setFilter('EXPIRED'); 
                        setNumeric(false); 
                        setTitle("Recommedations with no values");}}>
                        <small className="broker-box-title">Expired</small>
                        <p className="broker-box-value">{expired}</p>
                        </div>
                    <div className="broker-box target-met" onClick={() => {
                        setFilter('TARGET_MET'); 
                        setNumeric(false);
                        setTitle("Recommendations Target Met");}}>
                        <small className="broker-box-title">Target Met</small>
                        <p className="broker-box-value">{targetMet}</p>
                        </div>
                    <div className="broker-box pre-bonus-split" onClick={() => {
                        setFilter('BONUS_SPLIT'); 
                        setNumeric(false);
                        setTitle("Recommendations Pre-Bonus/Split");}}>
                        <small className="broker-box-title">Pre-Bonus/Split</small>
                        <p className="broker-box-value">{bonusSplit}</p>
                        </div>
                    <div className="broker-box pre-bonus-split" onClick={() => {
                        setFilter('LATEST'); 
                        setNumeric(false);
                        setTitle("Latest Recommendations");}}>
                        <small className="broker-box-title">Latest Recommendations</small>
                        <p className="broker-box-value">{latestRecommendations.length}</p>
                        </div>
                    </div>
            <h4 className="table-title">{title}</h4>
            <div className="common-profile-tabel broker-summary-table">
                <table>
                    <thead>
                                <tr>
                                    <th>Company</th>
                                    <th>Broker Name</th>
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
                                    <td className="company-name">{company.broker_name}</td>
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
    )
}

export default CommonCompanies