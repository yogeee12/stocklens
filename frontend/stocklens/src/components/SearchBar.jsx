import { useState } from "react"

function SearchBar({companies, onSelectedSymbol }){
    const [query , setQuery]= useState("")
    const [showResults, setShowResults] = useState(false)
    const q = query.toUpperCase();

    const matches =
        query.length === 0
            ? []
            : companies.filter((s) => 
                s.symbol.toUpperCase().startsWith(q) ||
                s.name.toUpperCase().includes(q)
            ).slice(0,10)

    return (
        <div className="search-box">
            <input
                className="search_input"
                type="text" 
                placeholder="Search Company..."
                value={query} 
                onChange={(e) => {
                setQuery(e.target.value)
                setShowResults(true)
            }}/>
            {showResults && matches.length > 0 && (
            <div className="search-result">
            <ul>
                {matches.map((company) => (
                    <li key={company.id}
                    style={{listStyleType : 'None'}}
                    onClick={() => {
                        console.log("Clicked:", company.symbol);
                        setQuery("");
                        onSelectedSymbol(company.symbol)
                        setShowResults(false);
                    }}>
                {company.symbol} -  {company.name}
                </li>
            ))}
            </ul>
            </div>
            )}
        </div>
    )
}

export default SearchBar