import React, { useState, useEffect } from "react";
import { listDificulty, listSeason } from "./OptionsList";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, createActivity } from "../../redux/actions";
import { Link, useNavigate} from "react-router-dom";
import { validation } from "./Validation";
import s from "./Form.module.css";


const CreateActivity = () => {

  const navigate = useNavigate();//redirijo al user a una nueva pagina de formulario después de crear
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [error, setError] = useState({});//manejo errores que puedan surgir
  const [activity, setActivity] = useState({ //almaceno datos de la actividad a crear
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  useEffect(() => {
    setError(validation(activity));
    if (countries && Object.entries(countries).length !== 250) {//uso Object.entries para ver si el país ya tiene alguna propiedad
      dispatch(getCountries());
    }
  }, [dispatch, activity, countries]);

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setActivity({
      ...activity,
      [property]: value,
    });
  };

  const handleSelect = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    if (value !== "Select countries...") {
      setActivity((estado) => {
        if (property === "countries") {
          return {
            ...estado,
            countries: Array.from(new Set([...estado.countries, value])),
          };
        } else {
          return {
            ...estado,
            [property]: value,
          };
        }
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !activity.name ||
      !activity.difficulty ||
      !activity.duration ||
      !activity.season ||
      !activity.countries.length
    ) {
      return alert("Complete the form correctly before submitting it");
    }
    dispatch(createActivity(activity));

    setActivity({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    
    navigate("/create");
  };


  return (
    <div className={s.containerAllCreate}>
      <Link to="/home" className="backHome">
        <span>Atras</span>
      </Link>
      <div className={s.titleFroms}>
        <h2>Create Activity</h2>
      </div>
      <div className={s.xxx}>
        <div className={s.containerFrom}>
          <form onSubmit={(event) => handleSubmit(event)} name="activityFrom">
            <div>
              {/* //-----------Name */}
              <div className={s.containerDataSelect}>
                <p className={s.pTitle}>Name:</p>
                <br></br>
                <input
                  className={s.inputData}
                  type="text"
                  placeholder="Name..."
                  name="name"
                  value={activity.name}
                  onChange={(event) => handleChange(event)}
                />
                {error.name ? (
                  <p className={s.errors}>{error.name}</p>
                ) : (
                  <p className={s.sinError}>-</p>
                )}
              </div>
              {/* //-----------------dificulty */}
              <div className={s.containerDataSelect}>
                <p className={s.pTitle}>Difficulty: </p>
                <br></br>

                <select
                  className={s.inputData}
                  id="difficulty"
                  name="difficulty"
                  onChange={(event) => handleChange(event)}
                  value={activity.difficulty}
                >
                  {listDificulty.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </select>
                {error.difficulty ? (
                  <p className={s.errors}>{error.difficulty}</p>
                ) : (
                  <p className={s.sinError}>-</p>
                )}
              </div>

              {/* --------------------------duration */}
              <div className={s.containerDataSelect}>
                <p className={s.pTitle}>Duration: </p>
                <br></br>
                <div>
                  <input
                    className={s.inputDataDuration}
                    type="number"
                    placeholder="Duration..."
                    name="duration"
                    value={activity.duration}
                    onChange={(event) => handleChange(event)}
                  />
                  <label>hours</label>
                </div>
                {error.duration ? (
                  <p className={s.errors}>{error.duration}</p>
                ) : (
                  <p className={s.sinError}>-</p>
                )}
              </div>
              {/* ----------------------------season */}
              <div className={s.containerDataSelect}>
                <p className={s.pTitle}>Season:</p>
                <br></br>
                <select
                  className={s.inputData}
                  id="season"
                  name="season"
                  onChange={(event) => handleChange(event)}
                  value={activity.season}
                >
                  {listSeason.map((op) => (
                    <option value={op} key={op}>
                      {op}
                    </option>
                  ))}
                </select>
                {error.season ? (
                  <p className={s.errors}>{error.season}</p>
                ) : (
                  <p className={s.sinError}>-</p>
                )}
              </div>
              {/* /////////////////////////////////////////// */}

              <div className={s.containerDataSelect}>
                <p className={s.pTitle}>Country selections</p>
                <br></br>
                <select
                  className={s.inputData}
                  name="countries"
                  id="countries"
                  onChange={(event) => handleSelect(event)}
                >
                  <option>Select countries..</option>
                  {countries.map((contry) => (
                    <option value={contry.id} key={contry.id}>
                      {contry.name}
                    </option>
                  ))}
                </select>
                {error.countries ? (
                  <p className={s.errors}>{error.countries}</p>
                ) : (
                  <p className={s.sinError}>-</p>
                )}
              </div>

              <button
                className={s.buttonSubmit}
                type="submit"
              //   disabled={Object.keys(error).length === 0 ? false : true}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
        {/* //-----------------------countries */}
        {activity.countries.length ? (
          <div className={s.ContainerCountrySelectAll}>
            <h2 className={s.titleListContries}>List of Selected Countries</h2>

            <div className={s.ContainerCountrySelect}>
              {activity.countries.map((e) => (
                <div className={s.contrySelect} key={e}>
                  <img
                    src={countries
                      .filter((ban) => ban.id === e) // esto es para renderizar la banderita una vez elegido el country
                      .map((x) => x.flags)}
                    alt={e}
                  />
                  <p key={e} className={s.nameContrySelect}>
                    {e}
                  </p>
                  {/* <button onClick={() => handleDelete(e)} className={s.butonX}>
                    X
                  </button> */}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default CreateActivity;