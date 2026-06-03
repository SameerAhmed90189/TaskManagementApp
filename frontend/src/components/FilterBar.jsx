function FilterBar({
  filter,
  setFilter,
  sort,
  setSort,
}) {
  return (
    <div>

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value)
        }
      >
        <option value="All">
          All Status
        </option>

        <option value="Pending">
          Pending
        </option>

        <option value="In Progress">
          In Progress
        </option>

        <option value="Completed">
          Completed
        </option>

      </select>

      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
      >
        <option value="Newest">
          Newest First
        </option>

        <option value="Oldest">
          Oldest First
        </option>

      </select>

    </div>
  );
}

export default FilterBar;