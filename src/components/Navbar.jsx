import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Подключаем стили
import "../index.css";

const Navbar = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => {
  return (
    <><div className="navbar">
      <div className="container">
      
        <nav className="navbar__nav">
          <Link to="/" className="logo">
            🛒 MyShop
          </Link>

          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="">Сортировка</option>
            <option value="title">По названию</option>
            <option value="price">По цене</option>
            <option value="stock">По количеству</option>
          </select>

          <div className="nav-links">
            <Link to="/" className="nav-link">
              🏠 Главная
            </Link>
            {/* <Link to="/favorites" className="nav-link">
              ❤ Избранное
            </Link> */}
          </div>
        </nav>
      </div>
    </div>
      
    </>
  );
};

export default Navbar;
