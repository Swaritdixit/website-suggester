import { useEffect,useState }
from "react";

import api from "../services/api";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function Watchlist(){

    const [items,setItems] =
    useState([]);

    useEffect(()=>{

        const token =
        localStorage.getItem("token");

        api.get(

            "/watchlist",

            {

                headers:{
                    Authorization:token
                }

            }

        )

        .then(response=>{

            setItems(
                response.data
            );

        });

    },[]);

    return(

        <div>

            <h1>My Watchlist</h1>

            {

                items.map(item=>(

                    <div key={item._id}>

                        <img

                            src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}

                            width="150"

                            alt={item.title}

                        />

                        <h3>

                            {item.title}

                        </h3>

                    </div>

                ))

            }

        </div>

    );

}

export default Watchlist;