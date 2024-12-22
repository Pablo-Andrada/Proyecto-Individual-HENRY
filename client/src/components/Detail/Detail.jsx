import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryById } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./DetailModule.css";
import CardsActivity from "./CardsActivity";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countryDetail);//obtengo state actual de countryDetail
  useEffect(() => {
    dispatch(getCountryById(id));//uso useEffect para ejecutar la fn cada vez que le componente se monte o el valor de id cambie
  }, [dispatch, id]);

  return (
    <div className="containerAll">
      <h1 className="nameCountry">{country.name}</h1>
      <div>
        <Link to="/home" className="backHome">
          <span>Atras</span>
        </Link>
      </div>
      <div className="containerDetail">
        <div className="containerflags">
          <img src={country.flags} className="imageFlag" alt="country.name" />
        </div>

        <div className="containerCountry">
          <div className="containerData">
            <p>Continent: </p>
            <p>Capital:</p>
            <p>Sub Region:</p>
            <p>Area: </p>
            <p>Population:</p>
          </div>

          <div className="containerDataResult">
            <p> {country.continents}</p>
            <p>{country.capital}</p>
            <p> {country.subregion ? country.subregion : "Sin Datos"}</p>
            <p> {country.area / 1000} km2</p>
            <p>{parseInt(country.population).toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="ContainerActivitiesDetail">
        <h2 className="nameActivity">Activities list</h2>
        <div className="containerCardsActivity">
          {country.activities && country.activities.length ? (
            country.activities.map((activity) => {
              return <CardsActivity activity={activity} key={activity.id} />;
            })
          ) : (
            <div>
              <h1 className="countryFail">
              There is no registered activity
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;