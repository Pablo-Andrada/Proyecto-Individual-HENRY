import React from "react";
import style from "./Home.module.css";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";

import { useEffect,useState  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities } from "../../redux/actions";




const Home = () => {
  const dispatch = useDispatch();

  
  const countries = useSelector((state) => state.countries);
  const allCountries = useSelector((state) => state.allCountries); //almaceno los datos del store para que si sufre un cambio pueda actualizar
  const activities = useSelector((state) => state.activities);
  
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);
  // uso useState para definir los estados locales del componente. cuando llamo a (1) y (10) se establecen los valores iniciales ahí
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const pagination = (pageNumber) => {
    setPerPage(pageNumber === 1 ? 10 : 10);
    setCurrentPage(pageNumber);
  };

  //compruebo si la pagina actual es la primera, si es así devuelvo el index del último país allí, de lo contrario devuelvo el i del ultimo pais de la pagina donde esté
  const indexOfLastCountry =  currentPage === 1 ? currentPage * perPage : currentPage * perPage - 1;
  //resto para obtener el prumer país de la pagina actual
  const indexOfFirstCountry = indexOfLastCountry - perPage; // 20-10

  //renderizo la lista de paises paginada
  const currentCountries = countries.length
    ? countries.slice(indexOfFirstCountry, indexOfLastCountry)
    : allCountries;

  return (
      <div className={style.div }>
      <NavBar activities={activities} setCurrentPage={setCurrentPage} />
      <h1 className={style.title}>COUNTRIES</h1>

      {!countries.length ? (
        <div>
          <h1 className={style.countryFail}>One moment, please</h1>
        </div>
      ) : (
        <div>
          <Pagination
            countries={countries.length}
            pagination={pagination}
            perPage={perPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Cards countries={currentCountries} />
        </div>
      )}
    </div>
  );
};


export default Home;