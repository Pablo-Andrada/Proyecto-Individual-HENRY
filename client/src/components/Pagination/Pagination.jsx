import React from "react";
import "./PaginationModule.css";


const Pagination = ({perPage,countries,currentPage,pagination}) => {
    const pagesCount = countries === 250 ? 25 : Math.ceil(countries / perPage); //calcula la cantidad de paginas necesarias para mostrar los paises
  
    const pageNumbers = []; //almaceno los numeros de pag que se mostraran
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2)); //me aseguro que la pagina de inicio no sea menor a 1 
    let endPage = Math.min(pagesCount, startPage + maxPagesToShow - 1);// el numero de pag no sea mayor a el maximo a mostrar
  
    if (endPage - startPage + 1 < maxPagesToShow) { //verifico si el num de pag a mostrar es menor a maxPagesToShow
      startPage = Math.max(1, endPage - maxPagesToShow + 1);//si es así, que muestre la cantidad necesaria para cumplir con la cantidad max permitida
  }
  
  
    //hago un bucle para ir agregando cada num de pag al array pageNumbers y generar una lista para navegar por páginas
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    const handleClick = (page) => {
      pagination(page);
    };
  
    return (
      <div className="pagination">
        <button
          className={currentPage !== 1 ? "pagination-button" : "disable"}
          onClick={() => handleClick(currentPage - 1)} // si no hago currentPage - 1 -> no va retroceder, se quedaria en la pagina actual
          disabled={currentPage === 1}
        >
         ⇐
        </button>
  
        {pageNumbers.map((number) => ( //a través de map creo un botón para cada num de página
          <div key={number}>
            <button
              onClick={() => handleClick(number)}
              className={`buttonNumber ${
                currentPage === number ? "is-current" : ""
              }`}
            >
              {number}
            </button>
          </div>
        ))}
  
        <button
          className={currentPage !== pagesCount ? "pagination-button" : "disable"}
          onClick={() => handleClick(currentPage + 1)} // si no hago currentPage + 1 -> no va avanzar, se quedaria en la pagina actual
          disabled={currentPage === pagesCount}
        >
          ⇒
        </button>
      </div>
    );
  };
  
  export default Pagination;