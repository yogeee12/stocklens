import { useState, useEffect } from "react";
import { getCompanies, getSummary, getRecommendations } from "./services/api";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";

function App(){
  const [companies, setCompanies] = useState([])
  const [error, setError] = useState('')
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [summary, setSummary] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
      async function loadCompanies() {
          try {
              const data = await getCompanies();
              setCompanies(data);
          } catch (err) {
              setError(err.message);
          }
      }

      loadCompanies();
  }, []);

  async function loadSummary() {
    if (!selectedSymbol) return;

    const data = await getSummary(selectedSymbol);

    setSummary(data);
}
async function loadRecommendations() {
    if (!selectedSymbol) return;

    const data = await getRecommendations(selectedSymbol);

    setRecommendations(data);
}

  return(
    <div>
      
      <div className="header">
      <div className="title-header">
        <h1 className='web-title'>Stocklens</h1>
      </div>
      <div className="search-container">
      <SearchBar companies={companies} setSelectedSymbol={setSelectedSymbol}/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div className="navbar_box">
        <NavBar />
      </div>
      <div className="Theme-box">
        <ThemeToggle />
      </div>
      </div>
      <button onClick={loadSummary}>
          Summary
      </button>

      <button onClick={loadRecommendations}>
          Recommendations
      </button>
      {summary && (
          <pre>
              {JSON.stringify(summary, null, 2)}
          </pre>
      )}
      {recommendations.length > 0 && (
          <pre>
            {JSON.stringify(recommendations, null, 2)}
          </pre>
    )}
      </div>
  )
}

export default App