import '../styles/brokerpage.css'
function CategoryProfile({ category, summary}){
    
    const totalSummary = summary.length

     function getAvgValue(company) {
        switch (category) {
            case "BUY":
                return company.avg_buy_upside

            case "HOLD":
                return company.avg_hold_upside

            case "SELL":
                return company.avg_sell_downside

            case "ACCUMULATE":
                return company.avg_accumulate_upside

            default:
                return "-"
        }
    }
         function getPerValue(company) {
        switch (category) {
            case "BUY":
                return company.buy_percent

            case "HOLD":
                return company.hold_percent

            case "SELL":
                return company.sell_percent

            case "ACCUMULATE":
                return company.accumulate_percent

            default:
                return "-"
        }
    }

    return (
        <div className="category-profile">
            <div className="profile-header">
                <h4 className={`${category} profile-title`}>{category}</h4>
            </div>
            <div className="profile-box">
                <small className="profile-box-title">Total Companies </small>
                <p className="profile-box-value">{totalSummary}</p>
            </div>
            <div className="profile-summary-table">
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>LTP</th>
                            <th>{category}</th>
                            <th>Avg{category === "SELL" ? "Downside" : "Upside"}</th>
                            <th>Latest Date Reco.</th>
                            <th>Latest Broker Reco.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {summary.map(company =>
                            <tr key={company.company_id}>
                            <td>{company.company_name ?? '-'}</td>
                            <td>{company.recommendations.map(r => r.current_price)[0]}</td>
                            <td>{getPerValue(company) ?? '-'}</td>
                            <td>{getAvgValue(company) ?? '-'}</td>
                            <td>{company.recommendations.map(r => r.date)[0]}</td>
                            <td>{company.recommendations.map(r => r.broker)[0]}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryProfile