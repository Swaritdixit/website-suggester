import{useEffect,useState} from "react";
import api from "../services/api";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function TasteProfile(){
    const[profile,setProfile]=useState(null);
    const[loading,setLoading]=useState(true);
    useEffect(()=>{
        const fetchProfile=async()=>{
            try{
                const token=localStorage.getItem("token");
            
            const response=await api.get("/taste-profile",{
                headers:{
                    Authorization:token
                }
            });

            setPrrofile(response.data);

        }
        catch(error)
        {
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };
fetchProfile();},[]);
if(loading){
    return <h2>Loading...</h2>
}
if(!profile)
{
    return <h2>No Profile Found</h2>
}
return(<div>
    <h1>Your Taste Profile</h1>
    <h2>Genres</h2>
    <ul>
        {
            profile.genres?.map((genre,index)=>
            <li key={index}>{genre}</li>)
        }
    </ul>
    <h2>Themes</h2>
    <ul>
        {
            profile.themes?.map((theme,index)=>
                 <li key={index}>
                    {theme}
                 </li>)   
        }
    </ul>
    <h2>Keywords</h2>
    <ul>
        {
            profile.keywords?.map(
                (keyword,index)=><li key={index}>
                    {keyword}
                </li>
            )
        }
    </ul>
</div>)
}
export default TasteProfile;