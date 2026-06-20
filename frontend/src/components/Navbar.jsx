import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({
  search,
  setSearch,
  handleLogout,
  setFilter,
  darkMode,
  setDarkMode,
}) {
  return(
  <nav className="navbar">

  <div>
    <h1 className="logo">
      Task Manager
    </h1>
  </div>

  <div className="right">

    <SearchBar
      search={search}
      setSearch={setSearch}
      setFilter={setFilter}
    />

    <Link className="navLink" to="/analytics">
      Analytics
    </Link>

    <button
      className="themeBtn"
      type="button"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "Light" : "Dark"}
    </button>

    <button
      className="logoutBtn"
      onClick={handleLogout}
    >
      Logout
    </button>

  </div>

</nav>
  )
}

export default Navbar;
