import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function Profile(){
    return(
        <div>
            <h1>Profile</h1>
            <p>
                Email:{localStorage.getItem("email")}
            </p>
        </div>
    );
}
export default Profile;