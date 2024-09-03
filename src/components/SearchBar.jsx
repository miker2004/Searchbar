import './SearchBar.css';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchbar = form.elements.searchbar.value.trim();

    if (searchbar === "") {
      toast.error('No Text In Input');
      return;
    }

    onSearch(searchbar);
    form.reset();
  };

  return (
    <header className='form-header'>
      <form onSubmit={handleSubmit} className="searchbar-form">
        <input
          className="searchbar-input"
          type="text"
          name="searchbar"
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
      <Toaster position="bottom-right" reverseOrder={false} />
    </header>
  );
};

export default SearchBar;
