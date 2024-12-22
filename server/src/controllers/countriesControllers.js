const {Country,Activity} = require("../db")
const { Op } = require("sequelize");
require("dotenv").config()


const getAllCountries = async () => {
    try {
        const allCountries = await Country.findAll({
            include: Activity,
        });
        return allCountries;
    } catch (error) {
        return error;
    }
}



const countryByName = async (name) => {
  const minusMayus = { // sirve para buscar un pais por nombre, y el nombre puede estar en mayusc, min
                        // mezclando mayusculas y minusculas , es como un validador
                [Op.or]: [
                  {
                    name: {
                      [Op.like]: `%${name}%`,
                    },
                  },
                  {
                    name: {
                      [Op.iLike]: `%${name}%`,
                    },
                  },
                ],
              };
    const countryName = await Country.findAll({
        where:  minusMayus,        
        include: Activity,    
    });
    
    if(!countryName.length){
        throw Error("No se encontraron coincidencias");
    }
    return countryName;
};


const countryById = async (idPais) => {
    const countryId = await Country.findOne({
        where: {
          id: idPais,
        },
        include: Activity,
    })     
    if (!countryId) throw Error(`El ID: ${idPais} no le pertenece a ningún País`);    
    return countryId;
}

module.exports = {
    getAllCountries,
    countryByName,
    countryById,
}