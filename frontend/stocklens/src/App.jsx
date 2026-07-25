import { useState, useEffect } from "react";
import { getCompanies } from "./services/api";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";

function App(){
  const [companies, setCompanies] = useState([])
  const [error, setError] = useState('')
  
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

  return(
    <div>
      
      <div className="header">
      <div className="title-header">
        <h1 className='web-title'>Stocklens</h1>
      </div>
      <div >
      <SearchBar companies={companies}/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div className="navbar_box">
        <NavBar />
      </div>
      <div className="Theme-box">
        <ThemeToggle />
      </div>
      </div>
      </div>
  )
}

export default App