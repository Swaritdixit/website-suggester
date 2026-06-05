import {useState} from "react";
import api from "../services/api";
import "../styles/MovieCard.css";
import "../styles/App.css";
import "../styles/Home.css";
import "../styles/Navbar.css";
function Login(){
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const handleLogin=async()=>{
        try{
            const response=await api.post("/login",{email,password});
            localStorage.setItem("token",response.data.token);
            alert("Login successful!");
        } catch (error) {
            console.error(error);
            alert("Login failed!");
        }};
        return(
            <div>
                <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleLogin}>Login</button>
            </div>
        );
    }
export default Login;