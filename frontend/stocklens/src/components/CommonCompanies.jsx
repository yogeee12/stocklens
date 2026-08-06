function CommonCompanies({ companies }){
    return (
        <div className="common-company-profile"> 
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
                                {companies.map(company => 
                                <tr key={company.company_id}>
                                    <td className="company-name">{company.company_name}</td>
                                    <td className="company-name">{company.broker_name}</td>
                                    <td>{company.call_type}</td>
                                    <td>₹{company.current_price}</td>
                                    <td>₹{company.target_price}</td>
                                    <td>{company.upside}</td>
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