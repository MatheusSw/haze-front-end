import { ReactComponent as SearchIcon } from "../../icons/magnifying-glass.svg";

const SearchBar: React.FC = () => {
  return (
    <div className="flex h-12 w-full rounded-full bg-white/30 px-6">
      <SearchIcon className="w-6" />
      <input
        type="search"
        name="searchInput"
        id="searchInput"
        className="w-full bg-white/0 p-2 outline-haze-green"
        placeholder="What are you looking for today?"
        aria-label="Search input"
      />
    </div>
  );
};

export default SearchBar;
