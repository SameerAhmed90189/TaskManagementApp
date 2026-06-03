import SearchBar from "./SearchBar";

function Navbar({
  search,
  setSearch,
  handleLogout,
}) {
  return (
    <nav>

      <div>
        <h1>Task Manager</h1>
      </div>

      <div>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;