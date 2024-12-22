import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";

//menú desplegable con opciones

//uso dispatch para enviar la acción si se selecciona una opción
//por props recibo lista de opciones a mostrar en el menú, setCurrentPage para actualizar la pagina y funtion que es la acción a ejecutar
const Select = (props) => {
  const dispatch = useDispatch();

  const handleSelect = (event) => {
    const option = event.target.value;
    props.setCurrentPage(1);
    if (option === "Continents" || option === "Activities")
      return dispatch(getCountries()); // si en las opciones elijo "Continents" o "Activities", que me traiga todos los paises
    if (option !== "None") return dispatch(props.funtion(option));
  };

  return (
    <div>
      <select className="select" onChange={handleSelect}>
        {props.list.map((op) => { // mapeo para crear una opcion sobre cada elemento de la list que mando por props
          return (
            <option value={op} key={op}>
              {op}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;