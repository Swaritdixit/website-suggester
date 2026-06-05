import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function MovieCard({ movie }) {

    const addFavorite = async () => {

        try {

            const token =
            localStorage.getItem("token");

            if (!token) {

                alert("Please login first");
                return;

            }

            await api.post(

                "/favorites",

                {

                    tmdbId: movie.id,

                    title:
                    movie.title ||
                    movie.name,

                    posterPath:
                    movie.poster_path,

                    mediaType:
                    movie.media_type ||
                    "movie"

                },

                {

                    headers: {

                        Authorization: token

                    }

                }

            );

            alert("Added to Favorites");

        }

        catch (error) {

            console.error(error);

        }

    };
 const addWatchList=async()=>{try {

        const token =
        localStorage.getItem("token");

        await api.post(

            "/watchlist",

            {

                tmdbId: movie.id,

                title:
                movie.title ||
                movie.name,

                posterPath:
                movie.poster_path,

                mediaType:
                movie.media_type ||
                "movie"

            },

            {

                headers: {
                    Authorization: token
                }

            }

        );

        alert("Added to Watchlist");

    }

    catch(error){

        console.log(error);

    }}

 
    return (

        <div className="card">

            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
            />

            <h3>

                {movie.title || movie.name}

            </h3>

            <p>

                ⭐ {movie.vote_average}

            </p>
<Link to={`/details/${movie.id}`}>
            <button onClick={addFavorite} >❤️ Favorite </button>
            <button onClick={addWatchList}>📌 Watchlist</button>
</Link>

        </div>

    );

}

export default MovieCard;