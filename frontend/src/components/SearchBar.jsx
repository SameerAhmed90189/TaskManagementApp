import "../styles/SearchBar.css";
function SearchBar({
  search,
  setSearch,
  setFilter,
}) {
  return (
  <div className="search-bar">

    <input
      type="text"
      placeholder="Search tasks..."
      value={search}
      onChange={(e) =>{
        setSearch(e.target.value);
        setFilter("All");
      }}
    />

  </div>
);
}

export default SearchBar;