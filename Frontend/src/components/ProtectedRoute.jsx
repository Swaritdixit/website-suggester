import {Navigate} from "react-router-dom";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function ProtectedRoute({children})
{
    const token=locaStorage.getItem("token");
    if(!token){
        return<Navigate to="/login"/>

        

    }
    return children;
}
export default ProtectedRoute;