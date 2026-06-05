import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function Signup(){
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const navigate=useNavigate();
    const handleSignup=async()=>{
        e.preventDefault();
        try{
            await api.post("/signup",{name,email,password});
            alert("Signup successful! Please login.");
            navigate("/login");
        }
        catch (error) {
            console.error(error);
            alert("Signup failed!");
        }
        
    };
    return(
        <div>
            <h1>SignUp</h1>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <br/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <br/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <br/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
export default Signup;