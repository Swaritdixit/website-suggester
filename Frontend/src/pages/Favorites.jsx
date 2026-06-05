import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
       const fetchFavorites = async () => {
           try { const token =
                localStorage.getItem("token");
                 const response =
                await api.get( "/favorites",{
                        headers: {
                            Authorization: token
                        }
                    }

                );

                setFavorites(response.data);;

            }

            catch(error){
          console.error(error);
            }

            finally{
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);
    if(loading){
        return <h2>Loading...</h2>;
    }
    return (
        <div>
            <h1>My Favorites</h1>
            {favorites.length === 0 ?

                (<p>No favorites yet</p>):

                (favorites.map(item => (
                <div key={item._id}>
                <img src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}  alt={item.title} width="150"/>

                            <h3>{item.title}</h3>
                            <p>{item.mediaType}</p>

                        </div> ))
                )
            }
        </div>
    );
}
export default Favorites;