import { Router } from 'express';
import computerController from '../controllers/computersController.js';
import armadioController from '../controllers/armadioController.js';
import utentiController from '../controllers/utentiController.js'
import ruoliController from '../controllers/ruoliController.js'

const apiRoutes = Router()
    .use('/computers', computerController)
    .use('/armadi', armadioController)
    .use("/utenti", utentiController)
    .use("/ruoli", ruoliController);


export default Router().use('/api', apiRoutes);


