import {useEffect,useState} from "react";
import api from "../services/api";
import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function Home(){
    const[trending,setTrending]=useState([]);
    const[search,setSearch]=useState("");
    const[results,setResults]=useState([]);
    const[genres,setGenres]=useState([]);
    const[selectedGenre,setSelectedGenre]=useState("");
    const[mood,setMood]=useState("");
    const[type,setType]=useState("");
    const[loading,setLoading]=useState(false);
        useEffect(() => {

        const loadData = async () => {

            try {
                setLoading(true);
                const [ trendingResponse,genresResponse] = await Promise.all([api.get("/trending"), api.get("/genres") ]);
                setTrending(trendingResponse.data);
                setGenres(genresResponse.data);
            }
            catch (error) {
                console.error(error);
            }
            finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

const handleSearch=async()=>{
    try{
    setLoading(true);
        const response=await api.get(`/content?search=${search}&genre=${selectedGenre}&mood=${mood}&type=${type}`);
        setResults(response.data);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
}
return(
    
    <Layout>
    <h1>All you need to Relax</h1>
    <div className="search-container">
        <input type="text" placeholder="Search movies.." value={search} onChange={(e)=>setSearch(e.target.value)}
        onKeyDown={(e)=>e.key==="Enter" && handleSearch()}/>
        <select value={selectedGenre} onChange={(e)=>setSelectedGenre(e.target.value)}>
            <option value="">Select Genre</option>
            {
                genres.map(genre=>(
                    <option key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))
            }
        </select>
        <select value={mood} onChange={(e)=>setMood(e.target.value)}>
            <option value="">Select Mood</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="excited">Excited</option>
            <option value="relaxed">Relaxed</option>
        </select>
            <select value={type} onChange={(e)=>setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="Movie">Movie</option>
            <option value="Show">TV Show</option>
            <option value="Anime">Anime</option>
            <option value="K-Drama">K-Drama</option>

        </select>
        <button onClick={handleSearch}>Search</button>
    </div>
    <h2>Search Results</h2>
    {
    results.length===0 &&
    !loading &&
    <p>No results yet</p>
}
    <div>
        {
            results.map(item=>(
                <MovieCard key={item.id} movie={item} />
            ))
        }
    </div>
    <h2>Trending Now</h2>
    <div>
        {
         trending.map(item=>(
            <MovieCard key={item.id} movie={item} />
         ))}
    </div>
    </Layout>
);
}
export default Home;