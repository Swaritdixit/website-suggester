import axios from"axios";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
const api=axios.create({
    baseURL:"https://website-suggester.onrender.com/",
});
export default api;