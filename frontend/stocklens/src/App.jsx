import { useState, useEffect } from "react";
import { getCards, getCompanies } from "./services/api";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import CategoryCards from "./components/CategoryCards";
import CompanyCards from "./components/CompanyCards";

function App(){
  const [companies, setCompanies] = useState([])
  const [error, setError] = useState('')
  const [summary, setSummary] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [category, setCategory] = useState("BUY")

  let filteredCompanies = [];

  if(category === "BUY"){
      filteredCompanies = [...summary]
          .filter(company => company.avg_buy_upside > 0)
          .sort((a,b)=> b.avg_buy_upside - a.avg_buy_upside)
          .slice(0,10);}

  if(category === "HOLD"){
      filteredCompanies = [...summary]
          .filter(company => company.avg_hold_upside > 0)
          .sort((a,b)=> b.avg_hold_upside - a.avg_hold_upside)
          .slice(0,10);}
          
  if(category === "SELL"){
      filteredCompanies = [...summary]
          .filter(company => company.avg_sell_downside > 0)
          .sort((a,b)=> b.avg_sell_downside - a.avg_sell_downside)
          .slice(0,10);}
  console.log(category)

  if(category === "ACCUMULATE"){
      filteredCompanies = [...summary]
          .filter(company => company.avg_accumulate_upside > 0)
          .sort((a,b)=> b.avg_accumulate_upside - a.avg_accumulate_upside)
          .slice(0,10);}
  console.log(category)

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
        <CategoryCards 
        setCategory={setCategory}
        />
      </div>
      <div className="company-cards">
        {
          filteredCompanies.map((company)=>(
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