function CategoryCards({ setCategory }){
    return(
        <div className="category-container">
            <div className="category-card buy" onClick={() => setCategory("BUY")}>
                <h2>BUY</h2>
            </div>
            <div className="category-card Hold" onClick={() => setCategory("HOLD")}>
                <h2>HOLD</h2>
            </div>
            <div className="category-card Sell" onClick={() => setCategory("SELL")}>
                <h2>SELL</h2>
            </div>
            <div className="category-card Accumulate" onClick={() => setCategory("ACCUMULATE")}>
                <h2>ACCUMULATE</h2>
            </div>
        </div>
    )
}

export default CategoryCards