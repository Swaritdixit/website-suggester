import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import api from "../services/api";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function Details(){
    const{id}=useParams();
    const[movie,setMovie]=useState(null);
     useEffect(()=>{
        api.get(`/details/${id}`).then((response)=>{
            setMovie(response.data);
        }).catch(error=>{
            console.error(error);
            });
     },[id]);
     if(!movie){
        return <h2>Loading...</h2>;
     }   
     return(
        <div>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width="300"/>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>⭐ {movie.vote_average}</p>
            <p>Release:{movie.release_date}</p>
        </div>
     );
    
}
export default Details;