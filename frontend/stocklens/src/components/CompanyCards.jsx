import { useState } from "react";

function CompanyCards({ summary, recommendation=null}) {

    const [open, setOpen] = useState(false);

    return (
        <div className="company-card">

            <div className="company-header">
                <h3>{summary.company_name}</h3>

                <div className="call buy">
                    BUY
                </div>
            </div>

            <div className="summary-grid">

                <div>
                    <small>Buy</small>
                    <h4>{summary.buy_percent}%</h4>
                </div>

                <div>
                    <small>Hold</small>
                    <h4>{summary.hold_percent}%</h4>
                </div>

                <div>
                    <small>Sell</small>
                    <h4>{summary.sell_percent}%</h4>
                </div>

                <div>
                    <small>Accumulate</small>
                    <h4>{summary.accumulate_percent}%</h4>
                </div>

                <div>
                    <small>Avg Target</small>
                    <h4>₹{summary.avg_target}</h4>
                </div>

                <div>
                    <small>Avg Upside</small>
                    <h4>{summary.avg_buy_upside}%</h4>
                </div>

            </div>

            <hr />

            <div
                className="recommendation-preview"
                onClick={() => setOpen(!open)}>
                <span>{recommendation?.date || "-"}</span>

                <span>{recommendation?.broker || "-"}</span>

                <span>
                    ₹{recommendation?.target || "-"}
                </span>

                <span>
                    {recommendation?.call || "-"}
                </span>

                <span>
                    {recommendation?.upside || "-"}%
                </span>

                <span className="arrow">
                    {open ? "▲" : "▼"}
                </span>

            </div>

            {open && recommendation &&(

                <table>

                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Broker</th>
                            <th>Target</th>
                            <th>At Reco</th>
                            <th>Today</th>
                            <th>Call</th>
                            <th>Upside</th>
                            <th>Change</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>{recommendation?.date || "-"}</td>
                            <td>{recommendation?.broker || "-"}</td>
                            <td>₹{recommendation?.target || "-"}</td>
                            <td>₹{recommendation?.price_at_reco || "-"}</td>
                            <td>₹{recommendation?.current_price || "-"}</td>
                            <td>{recommendation?.call || "-"}</td>
                            <td>{recommendation?.upside || "-"}%</td>
                            <td>{recommendation?.change_at_reco || "-"}%</td>
                        </tr>

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default CompanyCards;