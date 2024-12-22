
require("dotenv").config()
const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require('./src/db.js');

const PORT = 3001;
const API_URL = "http://localhost:5000/"


conn.sync({ force: true }).then(() => { //con el force en true cada vez que reinicio el servidor la database se resetea, se vaciay se vuelve a cargar
  server.listen(PORT, async () => {
    const allCountries = Country.findAll();
    if (!allCountries.length) { // se fija si en Country en mi db no hay nada entonces  hace el pedido a la API del puerto 5000 de los paises
      const response = await axios(`${API_URL}countries`);
      let countryDataBase = response.data.map((country) => { // a la respuesta de ese pedido, lo que me interesa es lo que viene en data, 
        return {                                             //hago un mapeo con eso para que por cada pais me retorne un id,name,flags, etc   
          id: country.cca3,
          name: country.name.common,
          flags: country.flags.png,
          continents: country.continents[0],
          capital: country.capital ? country.capital[0] : "Capital Not Found",
          subregion: country.subregion,
          area: country.area,
          population: country.population,
        }
      })
      await Country.bulkCreate(countryDataBase) // aca finalmente es cuando lo cargo en mi DataBase. Al modelo country le aplico masivamente 
    }                                           // toda la info de countryDataBase

    console.log(`Server listening on port ${PORT}`);
  })
}).catch(error => console.error(error))
