
import { orderAsdDes, orderPopulation } from "../../redux/actions";
import { AscDsc, population } from "./List";

import Select from "./Select.jsx";

const Order = ({ setCurrentPage }) => {
  return (
    <div className="filtros">
      <Select
        funtion={orderAsdDes}
        list={AscDsc}
        setCurrentPage={setCurrentPage}
      />
      <Select
        funtion={orderPopulation}
        list={population}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
export default Order;