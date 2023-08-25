const { Router } = require("express");
require("dotenv").config()
const { getAllCountries,countryByName, countryById } = require("../controllers/countriesControllers");
const countriesRoutes = Router();

countriesRoutes.get("/", async (req, res) => {
    try { 
      const fullCountries = await getAllCountries();
        res.status(200).json(fullCountries);
        
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


countriesRoutes.get("/name", async (req, res) => {
    const { name } = req.query;
    try {       
        const countryQuery = await countryByName(name);
        res.status(200).json(countryQuery);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


countriesRoutes.get("/:idPais", async (req, res) => {
    const { idPais } = req.params;
    try {
        const countryxID = await countryById(idPais);
      res.status(200).send(countryxID);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
module.exports = countriesRoutes;