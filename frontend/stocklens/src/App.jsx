import { useState, useEffect } from "react";
import SymbolSearch from "./SymbolSearch";

function App(){
  const [company, setCompanies] = useState([])
  const [error, setError] = useState('')
  
  useEffect (() => {
    fetch(`http://localhost:8000/companies`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server respond ${res.status}`);
        return res.json();
      })
    .then((data) => setCompanies(data))
    .catch((err) => setError(err.message))
  }, []);

  return(
    <div>
      <div className="title-header">
        <h1 ClassName='web-title'>Stocklens</h1>
      </div>
    <div className="search-box header">
      <SymbolSearch companies={company}/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  )
}

export default App