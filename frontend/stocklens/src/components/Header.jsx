import SearchBar from "./SearchBar";
import NavBar from "./Navbar";
import ThemeToggle from "./ThemeToggle";

function Header({ companies, error, onSelectedSymbol }){
    return(
        <div className="header">
      <div className="title-header">
        <h1 className='web-title'>Stocklens</h1>
      </div>
      <div className="search-container">
      <SearchBar companies={companies} onSelectedSymbol={onSelectedSymbol}/>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <div className="navbar_box">
        <NavBar />
      </div>
      <div className="Theme-box">
        <ThemeToggle />
      </div>
      </div>
    )
}
export default Header