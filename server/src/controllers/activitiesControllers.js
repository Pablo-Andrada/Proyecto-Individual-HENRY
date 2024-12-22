const {Country,Activity} = require("../db")
const { Op } = require("sequelize");
require("dotenv").config()

// createActivity es una funcion, le paso los parametros que traje del  body en la ruta

const createActivity = async (
    name,
    difficulty,
    duration,
    season,
    countries
) => {
    // esto es para verificar si en Activity encuentra alguna actividad que tenga el mismo nombre que la que estoy creando
    const existingActivity = await Activity.findOne({ where: { name } });
    //si es asi, lanza error "La actividad ya existe"
    if (existingActivity) {
      throw new Error("La actividad ya existe");
    }
    //esto es: si la dificultad es mayor a 5 o menor a 1, lanzo error
    if(difficulty > 5 || difficulty < 1)
    throw Error("La dificultad ingresada debe ser de 1 a 5");
    // esto es: si season es distinto de "Summer","Autumn","Winter" o "Spring", lanzo error
    if(
        season !== "Summer" &&
        season !== "Autumn" &&
        season !== "Winter" &&
        season !== "Spring" 
    )
        throw Error("La temporada debe ingresada puede ser: Summer, Autumn, Winter, Spring");
    // si no hay ningun pais, lanzamos error
    if ( countries.length === 0) {
      throw new Error("La actividad debe estar asociada al menos a un pais");
    }

    // aca creamos en Activity con los datos indicados la nueva actividad y lo guardamos en newActivity
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });
    // aca seteamos countries
    await newActivity.setCountries(countries);
    // devuelvo newActivity 
    return newActivity;
  };
  


  const getAllActivities = async () => {
    
    const allActivities = await Activity.findAll({
        include: Country,
    });
    if(!allActivities.length) throw Error ("No hay ninguna actividad aún, cargá una")
    
    return allActivities;
  
  }


module.exports = {
    getAllActivities,
    createActivity,
   
    
}
