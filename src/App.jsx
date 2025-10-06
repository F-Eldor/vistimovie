import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist"; 
import About from "./components/About"; 
import Footer from "./components/Footer"; 
import { WatchlistProvider } from "./components/WatchlistContext";

function App() {
  return (
    <WatchlistProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </WatchlistProvider>
    
  );
}

export default App;
