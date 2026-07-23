import { useState } from "react"

function SymbolSearch({companies}){
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
            <ul>
                {matches.map((company) => (
                <li key={company.id} style={{listStyleType : 'None'}}>
                {company.symbol} -  {company.name}
                </li>
            ))}
         </ul>
        </div>
    )
}

export default SymbolSearch