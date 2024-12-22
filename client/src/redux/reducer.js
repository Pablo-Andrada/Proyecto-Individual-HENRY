import { 
    GET_COUNTRIES,  
    GET_COUNTRIES_BY_NAME,
    GET_COUNTRIES_BY_CONTINENTS,
    ORDER_ASC_DES,
    ORDER_POPULATION,
    GET_ACTIVITIES,
    GET_COUNTRIES_BY_ACTIVITIES,
    GET_COUNTRIES_BY_ID,
    CREATE_ACTIVITY } from "./action-types";

//Defino los estados inicial

const initialState = {
    allCountries: [],
    countries: [],
    activities: [],
    countryDetail: {},
};

//Combino a todos los reducers en uno solo a partir del rootReducer para que sea pasado al store como primer parametro del createStore

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return { 
                ...state,
                countries: action.payload,
                allCountries: action.payload,
             };
             case GET_COUNTRIES_BY_NAME:
                return {
                  ...state,
                  countries: action.payload,
                };
          

                case GET_COUNTRIES_BY_CONTINENTS:
                    return {
                      ...state,
                      countries: state.allCountries.filter(
                        (country) => country.continents === action.payload
                      ),
                    };
        
                    // case GET_COUNTRIES_BY_CONTINENTS:
                    //     const filteredCountries = state.allCountries.filter(
                    //       (country) => country.continents === action.payload
                    //     );
                    //     return {
                    //       ...state,
                    //       countries: filteredCountries,
                    //     };
          
              case GET_COUNTRIES_BY_ACTIVITIES:
                return {
                  ...state,
                  countries: state.allCountries.filter( //filtro por paises segun la siguiente condición
                    (country) =>
                      country.activities &&
                      country.activities.map((acti) => acti.name).includes(action.payload)// el pais debe tener actividades y que al menos una sea la recibida en payload 
                  ),
                };
          
        
        
        
        
              case ORDER_ASC_DES: {
                action.payload === "A-Z"
                  ? state.countries.sort((a, b) => { //uso sort para ordenar en funcion de una comparación
                      if (a.name > b.name) return 1; //devuelvo 1 para indicar que el name de a debe ir despues de b
                      if (a.name < b.name) return -1; //devuelvo -1 para indicar que el name de a debe ir antes de b
                      return 0; // devuelvo 0 si los elementos son iguales
                    })
                  : state.countries.sort((a, b) => {
                      if (a.name < b.name) return 1;
                      if (a.name > b.name) return -1;
                      return 0;
                    });
                return {
                  ...state,
                  countries: [...state.countries],
                };
              }
              case ORDER_POPULATION: {
                action.payload === "↥ population"
                  ? state.countries.sort((a, b) => {
                      if (a.population > b.population) return 1;
                      if (a.population < b.population) return -1;
                      return 0;
                    })
                  : state.countries.sort((a, b) => {
                      if (a.population < b.population) return 1;
                      if (a.population > b.population) return -1;
                      return 0;
                    });
                return {
                  ...state,
                  countries: [...state.countries],
                };
              }
          
              case GET_ACTIVITIES:
                return {
                  ...state,
                  activities: action.payload,
                };
              case GET_COUNTRIES_BY_ID:
                return {
                  ...state,
                  countryDetail: action.payload,
                };
          
              case CREATE_ACTIVITY:
                return {
                  ...state,
                };     
        default:
            return { ...state };
        
    }
};

export default rootReducer;