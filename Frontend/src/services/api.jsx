import axios from"axios";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
const api=axios.create({
    baseURL:"http://localhost:3000",
});
export default api;