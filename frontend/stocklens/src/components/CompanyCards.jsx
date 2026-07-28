import { useState } from "react";

function CompanyCards({ summary, recommendations=[], category}) {

    const [open, setOpen] = useState(false);

    let avgValue;

    switch (category) {
        case "BUY":
            avgValue = summary.avg_buy_upside;
            break;

        case "HOLD":
            avgValue = summary.avg_hold_upside;
            break;

        case "SELL":
            avgValue = summary.avg_sell_downside;
            break;

        case "ACCUMULATE":
            avgValue = summary.avg_accumulate_upside;
            break;

        default:
            avgValue = "-";
         }

    return (
        <div className="company-card">

            <div className="company-header">
                <h3>{summary.company_name}</h3>

                <div className={`call ${category}`}>
                    {category}
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
                    <small>Avg {category === "SELL" ? "Downside" : "Upside"}</small>
                    <h4>{avgValue ?? "-" }%</h4>
                </div>

            </div>

            <hr />

            <div
                className="recommendation-preview"
                onClick={() => setOpen(!open)}>
                <span>{recommendations[0]?.date || "-"}</span>

                <span>{recommendations[0]?.broker || "-"}</span>

                <span>
                    ₹{recommendations[0]?.target || "-"}
                </span>

                <span>
                    {recommendations[0]?.call || "-"}
                </span>

                <span>
                    {recommendations[0]?.upside || "-"}%
                </span>

                <span className="arrow">
                    {open ? "▲" : "▼"}
                </span>

            </div>

            {open && recommendations &&(

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
                        {recommendations.map((reco, index) => 
                        <tr key={index}>
                            <td>{reco.date}</td>
                            <td>{reco.broker}</td>
                            <td>₹{reco.target}</td>
                            <td>₹{reco.price_at_reco}</td>
                            <td>₹{reco.current_price}</td>
                            <td>{reco.call}</td>
                            <td>{reco.upside}%</td>
                            <td>{reco.change_at_reco}%</td>
                        </tr>
                        )}

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default CompanyCards;