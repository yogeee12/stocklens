import { useState } from "react"

function SearchBar({companies}){
    const [query , setQuery]= useState("")

    const q = query.toUpperCase();

    const matches =
        query.length === 0
            ? []
            : companies.filter((s) => 
                s.symbol.toUpperCase().startsWith(q) ||
                s.name.toUpperCase().includes(q)
            ).slice(0,10)

    return (
        <div>
            <input value={query} onChange={(e) => {
                setQuery(e.target.value)
            }}/>
            <div className="search_result">
            <ul>
                {matches.map((company) => (
                    <li key={company.id} style={{listStyleType : 'None'}}>
                {company.symbol} -  {company.name}
                </li>
            ))}
            </ul>
            </div>
        </div>
    )
}

export default SearchBar