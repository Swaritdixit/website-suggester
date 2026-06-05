import {Link,useNavigate} from "react-router-dom";
import "../styles/Navbar.css";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function Navbar(){

    const navigate = useNavigate();
     const token =
    localStorage.getItem("token");

    const logout = () => {

        localStorage.removeItem("token");

       navigate("/login");

    };
    return(
        <nav className="navbar">
            <h1>SiteSense</h1>
            <div>
                
                <Link to="/">Home</Link>

                <Link to="/login">Login</Link>

                <Link to="/signup">Signup</Link>

                <Link to="/favorites">Favorites</Link>
                 <Link to="/ai"> AI Assistant</Link>
                 <Link to="/taste-profile">Taste Profile</Link>
        
            </div>

            <button onClick={logout}>Logout</button>

            </nav>
    );
}
export default Navbar;