import { IoIosSearch } from "react-icons/io";

export default function Searchbar({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.currentTarget.elements.inputSearch.value.trim()
    if(value === '') return
    onSubmit(value)
    console.log(value)
  }
  return (
    <>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={handleSubmit}>
          <button type="submit" className="SearchForm-button-label">
            <IoIosSearch className="Icon"/>
          </button>

          <input
            className="SearchForm-input"
            name="inputSearch"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}
