import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";

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
      
      <div className="header">
      <div className="title-header">
        <h1 className='web-title'>Stocklens</h1>
      </div>
      <div className="search-box">
      <SearchBar companies={company}/>
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