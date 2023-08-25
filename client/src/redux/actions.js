import axios from "axios";

import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_ACTIVITIES,
  GET_COUNTRIES_BY_CONTINENTS,
  GET_COUNTRIES_BY_ACTIVITIES,
  ORDER_ASC_DES,
  ORDER_POPULATION,
  GET_COUNTRIES_BY_ID,
  CREATE_ACTIVITY
 
} from "./action-types";

export const getCountries = () => {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}

  //Traer pais por nombre
  export const getCountriesByName = (name) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/countries/name?name=${name}`);
          dispatch({
              type: GET_COUNTRIES_BY_NAME,
              payload: response.data
          });
      } catch (error) {
        console.log(error.message);
      }
    };
  };
//Trae las actividades
export const getActivities = () => {
  return async function (dispatch) {
   
      const response = await axios.get("http://localhost:3001/activities");
      return dispatch({
        type: GET_ACTIVITIES,
        payload: response.data
      });

  };
}
//Trae los paises por continentes
  export const getCountriesByContinents = (continent) => {
    return {
      type: GET_COUNTRIES_BY_CONTINENTS,
      payload: continent,
    };
  };
  //Trae los paises por actividades
  export const getCountriesByActivities = (activity) => {
    return {
      type: GET_COUNTRIES_BY_ACTIVITIES,
      payload: activity,
    };
  };
  //orden ascendente-descendente de los paises
  export const orderAsdDes = (order) => {
    return {
      type: ORDER_ASC_DES,
      payload: order,
    };
};
  // ordena segun la poblacion
  export const orderPopulation = (order) => {
    return {
      type: ORDER_POPULATION,
      payload: order,
    };
  };
  // trae los paises segun el id, sirve en el componente Detail 
  export const getCountryById = (id) => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`http://localhost:3001/countries/${id}`);
        dispatch({ type: GET_COUNTRIES_BY_ID, payload: response.data });
      } catch (error) {
        alert(error.message);
      }
    };
  };
  // crea la actividad, se usa en el form
  export const createActivity = (activity) => {
    return async function (dispatch) {
      try {
        const response = await axios.post("http://localhost:3001/activities", activity);
        alert(response.data.message);
        return dispatch({
          type: CREATE_ACTIVITY,
          payload: response,
        });
      } catch (error) {
        alert(error.message);
      }
    };
};


 