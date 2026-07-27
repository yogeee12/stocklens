import { useState, useEffect } from "react";
import { getCards, getCompanies } from "./services/api";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import CategoryCards from "./components/categorycards";
import CompanyCards from "./components/CompanyCards";

function App(){
  const [companies, setCompanies] = useState([])
  const [error, setError] = useState('')
  const [summary, setSummary] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  // const [recommendations, setRecommendations] = useState([]);
  
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

  useEffect(() => {
    async function loadCards() {
      try {
        const data = await getCards();
        setSummary(data)
        console.log(data)
      } catch (err){
        setError(err.message)
      }
    }
    loadCards()
  }, [])
  // async function loadSummary() {
  //   if (!selectedSymbol) return;

  //     const data = await getSummary(selectedSymbol);

  //     setSummary(data);
  // }
  // async function loadRecommendations() {
  //     if (!selectedSymbol) return;

  //     const data = await getRecommendations(selectedSymbol);

  //     setRecommendations(data);
  // }
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
      <div className="hero-section"> 
        <CategoryCards />
      </div>
      <div className="company-cards">
        {
          summary.map((company)=>(
              <CompanyCards
                  key={company.company_id}
                  summary={company}
                  recommendation={company.latest_recommendation}
              />
          ))
        }
      </div>

      </div>
  )
}

export default App