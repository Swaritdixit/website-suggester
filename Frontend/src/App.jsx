import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/WatchList";
import Details from "./pages/Details";
import AIChat from "./pages/AIChat";
import TasteProfile from "./pages/TasteProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/App.css";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "./styles/MovieCard.css";
import "./styles/App.css";
import "./styles/Home.css";
import "./styles/Navbar.css";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

       <Route path="/favorites" element={<ProtectedRoute> <Favorites /> </ProtectedRoute>    }/>

        <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />

        <Route path="/details/:id" element={<Details />} />
        
        <Route path="/ai" element={ <ProtectedRoute><AIChat /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path="*"element={<NotFound />}/>
      
    <Route path="/taste-profile" element={<TasteProfile />}/>
</Routes>

    </BrowserRouter>
  );

}

export default App;