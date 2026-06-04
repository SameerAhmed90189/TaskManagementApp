import SearchBar from "./SearchBar";
import "../styles/Navbar.css";

function Navbar({
  search,
  setSearch,
  handleLogout,
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
    />

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