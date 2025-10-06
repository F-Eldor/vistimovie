import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/" className="logo-link">
            <p>Visti</p>
            <p className="orange">Movies</p>
          </Link>
        </div>
        <ul>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/watchlist">Watchlist</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </ul>
      </nav>
    </header>
  );
}
