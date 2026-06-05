import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
export const saveToken=(token)=>{
    localStorage.setItem("token",token);

};
export const getToken=()=>{
    return localStorage.getItem("token");
};
export const removeToken=()=>{
    localStorage.removeItem("token");
};