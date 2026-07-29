import { useState, useEffect } from "react";
import { getCards, getCompanies } from "./services/api";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import CategoryCards from "./components/CategoryCards";
import CompanyCards from "./components/CompanyCards";
import Pagination from "./components/Pagination";

function App(){
  const [companies, setCompanies] = useState([])
  const [error, setError] = useState('')
  const [summary, setSummary] = useState([]);
  const [setSelectedSymbol] = useState("");
  // const [selectedCompany , setSelectedCompany] = useState(null)
  const [category, setCategory] = useState("BUY")
  const [page, setPage] = useState(1)
  const ITEM_PER_PAGE = 10
  let sortedCompanies = [];
  
  if(category === "BUY"){
    sortedCompanies = [...summary]
          .filter(company =>
          company.avg_buy_upside != null)
          .sort((a,b)=> b.avg_buy_upside - a.avg_buy_upside)}

  if(category === "HOLD"){
    sortedCompanies = [...summary]
          .filter(company =>
          company.avg_hold_upside != null)
          .sort((a,b)=> b.avg_hold_upside - a.avg_hold_upside)}
          
  if(category === "SELL"){
      sortedCompanies = [...summary]
          .filter(company =>
            company.avg_sell_downside != null)
          .sort((a,b)=> b.avg_sell_downside - a.avg_sell_downside)}

  if(category === "ACCUMULATE"){
      sortedCompanies = [...summary]
          .filter(company => company.avg_accumulate_upside != null)
          .sort((a,b)=> b.avg_accumulate_upside - a.avg_accumulate_upside)}

  const start = (page-1) * ITEM_PER_PAGE
  const end   = start + ITEM_PER_PAGE
  const filteredCompanies = sortedCompanies.slice(start, end)
  
  const totalPages = Math.ceil(
    sortedCompanies.length / ITEM_PER_PAGE
  )

  useEffect(() => {
      setPage(1);
    }, [category]);

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
        category={category}
        setCategory={setCategory}
        />
      </div>
        <><Pagination page={page} setPage={setPage} totalPages={totalPages}/></>
      <div className="company-cards">
        {
          filteredCompanies.map((company)=>(
            <CompanyCards
            key={company.company_id}
            summary={company}
            recommendations={company.recommendations}
            category={category}
            />
          ))
        }
      </div>
        <><Pagination page={page} setPage={setPage} totalPages={totalPages}/></>
      </div>
  )
}

export default App