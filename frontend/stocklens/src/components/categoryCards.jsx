function CategoryCards({ category, setCategory }){
    return(
        <div className="category-container">
            <div className={`category-card buy ${category === "BUY" ? "selected" : ""}`}
            onClick={() => setCategory("BUY")}>
                <h2>BUY</h2>
            </div>
            <div className={`category-card hold ${category === "HOLD" ? "selected" : ""}`}
             onClick={() => setCategory("HOLD")}>
                <h2>HOLD</h2>
            </div>
            <div className={`category-card sell ${category === "SELL" ? "selected" : ""}`} onClick={() => setCategory("SELL")}>
                <h2>SELL</h2>
            </div>
            <div className={`category-card accumulate ${category === "ACCUMULATE" ? "selected" : ""}`} onClick={() => setCategory("ACCUMULATE")}>
                <h2>ACCUMULATE</h2>
            </div>
        </div>
    )
}

export default CategoryCards