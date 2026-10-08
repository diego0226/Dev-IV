import "./SearchBar.css";

type SearchBarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

const SearchBar = ({search, onSearchChange}:SearchBarProps) => {
  return (
    <label className="search-bar">
      <span className="search-bar__label">Encuentra tu próximo auto</span>
      <span className="search-bar__field">
        <svg
          className="search-bar__icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4.5 4.5" />
        </svg>
        <input
          className="search-bar__input"
          type="search"
          placeholder="Buscar auto por nombre..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </span>
    </label>
  );
};

export default SearchBar;
