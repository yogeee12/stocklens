import { Link } from "react-router-dom"

function NavBar(){
    return(
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/brokers">Brokers</Link>
        </div>
    )
}

export default NavBar