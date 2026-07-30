import { Link } from "react-router-dom"

function NavBar(){
    return(
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/brokers">Brokers</Link>
            <span>Stocks</span>
        </div>
    )
}

export default NavBar