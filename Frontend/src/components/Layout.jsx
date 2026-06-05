import Navbar from "./Navbar";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function Layout({children}){
    return (<>
    <Navbar/>
    <main>
        {children}
        </main></>);
}
export default Layout;