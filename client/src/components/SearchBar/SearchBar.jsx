import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../redux/actions";
import style from "./SearchBar.module.css";

const SearchBar = (props) => {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    dispatch(getCountriesByName(newQuery));
    props.setCurrentPage(1);
  };

  return (
    <div>
      <input
        className={style.barra}
        placeholder="Escribe el pais a buscar"
        type="search"
        onChange={handleInputChange}
      />
      <div></div>
    </div>
  );
};
export default SearchBar;