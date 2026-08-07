import { useState, useEffect } from "react";
import { getCards, getCompanies } from "../services/api";
import CategorySidebar from "../components/CategorySidebar";
import CategoryProfile from "../components/CategoryProfile";
import Header from "../components/header";
import "../styles/category.css"
import "../styles/cards.css"
import "../styles/companyprofile.css"

function Home(){
  const [companies, setCompanies] = useState([])
  const [error, setError] = useState('')
  const [summary, setSummary] = useState([]);
  const [selectedSymbol ,setSelectedSymbol] = useState("");
  const [category, setCategory] = useState("BUY")

  let sortedCompanies = [];
  
  if(category === "BUY"){
    sortedCompanies = [...summary]
          .filter(company =>
          company.category === "BUY")
          .sort((a,b)=> b.avg_buy_upside - a.avg_buy_upside)}

  if(category === "HOLD"){
    sortedCompanies = [...summary]
          .filter(company =>
          company.category === "HOLD")
          .sort((a,b)=> b.avg_hold_upside - a.avg_hold_upside)}
          
  if(category === "SELL"){
      sortedCompanies = [...summary]
          .filter(company =>
            company.category === "SELL")
          .sort((a,b)=> b.avg_sell_downside - a.avg_sell_downside)}

  if(category === "ACCUMULATE"){
      sortedCompanies = [...summary]
          .filter(company => company.category === "ACCUMULATE")
          .sort((a,b)=> b.avg_accumulate_upside - a.avg_accumulate_upside)}
    
  
  function handleCompanySelect(symbol){

      setSelectedSymbol(symbol);
      
      const company = summary.find(
          company => company.symbol === symbol
      );

      if(!company) return;
      setCategory(company.category);
  }

  function handleCategoryChange(newCategory) {
      setSelectedSymbol("");
      setCategory(newCategory);
  }

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
      } catch (err){
        setError(err.message)
      }
    }
    loadCards()
  }, [])

  useEffect(() => {
    console.log("Selected Symbol:", selectedSymbol);
  }, [selectedSymbol]);

  return(
    <div>
      <div>
        <Header companies={companies} error={error} onSelectedSymbol={handleCompanySelect}/>        
      </div>
      <div className="profile-layout">
          <CategorySidebar category={category} setCategory={handleCategoryChange}/>
          <CategoryProfile category={category} summary={sortedCompanies} />
      </div>
      </div>
  )
}

export default Home