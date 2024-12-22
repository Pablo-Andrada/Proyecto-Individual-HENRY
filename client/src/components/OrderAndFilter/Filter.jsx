import {
    getCountriesByContinents,
    getCountriesByActivities,
  } from "../../redux/actions";
  import { continents } from "./List";
  
  import Select from "./Select.jsx";
  
  const Filter = ({ activities, setCurrentPage }) => {
    let activitiesList = ["Activities"];
    activities.map((activity) => {
      return activitiesList.push(activity.name);
    });
  
    return (
      <div className="filtros">
        <Select
          funtion={getCountriesByContinents}
          list={continents}
          setCurrentPage={setCurrentPage}
          />
          
        <Select
          funtion={getCountriesByActivities}
          list={activitiesList}
          setCurrentPage={setCurrentPage}
        />
      </div>
    );
  };
  export default Filter;