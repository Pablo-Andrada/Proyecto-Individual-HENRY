const { Router } = require("express");
require("dotenv").config()
const {getAllActivities,createActivity} = require("../controllers/activitiesControllers")
const activitiesRoutes = Router();


/**RUTA DEL POST DE ACTIVITIES, para crear las actividades*/

activitiesRoutes.post("/", async (req, res) => {
  //obtengo del body del request , que viene en formato JSON los valores: name, difficulty, duration, season, countries 
  const { name, difficulty, duration, season, countries } = req.body;

  // de entrada corroboro que estén todos los valores necesarios para crear la actividad sino mando msj de error
  if (!name || !difficulty || !season ||!duration ||!countries) {
    return res.status(400).send("Faltan datos");
  }
  try {
    //si estan los valores necesarios, los mando todos a createActivity, mi funcion controlador y al resultado lo guardo en la
    //constante newActivity
    const newActivity = await createActivity(
      name,
      difficulty,
      duration,
      season,
      countries
    );
    // devuelvo una response con status(200) y la newActivity
    res.status(200).json(newActivity);

    // si por algun motivo hubo algun error en el ingreso de los datos los tomo con el catch y los hago visibles
  } catch (error) {
    if (
      error.message === "La actividad ya existe" ||
      error.message === "La actividad debe estar asociada al menos a un pais" ||
      error.message === "La dificultad ingresada debe ser de 1 a 5" ||
      error.message === "La temporada debe ingresada puede ser: Summer, Autumn, Winter, Spring"
    ) {
      res.status(400).send(error.message);
      //si hubo un error pero no fue ninguno de los anteriores, pero hay error
    } else {
      res.status(500).send(error);
    }
  }
});







/**RUTA DEL GET ACTIVITIS, para obtener las actividades */


  activitiesRoutes.get("/", async (req, res) => {
    // uso la funcion controller , que tiene la lógica para traerme todas las actividades, utilizo await porque nose cuanto se demorará en traer
    // los datos, luego una vez obtenidos los guardo en una constate allActivities que es lo que termino devolviendo.
    try {
        const allActivities = await getAllActivities();
      res.status(200).json(allActivities);
      // si hubo un problema aparece el error
    } catch (error) {
        res.status(400).send(error.message);
    }
});



module.exports = activitiesRoutes;