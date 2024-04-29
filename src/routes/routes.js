import { Router } from 'express';
import computerController from '../controllers/computersController.js';
import armadioController from '../controllers/armadioController.js';

const apiRoutes = Router()
    .use('/computers', computerController)
    .use('/armadi', armadioController);


export default Router().use('/api', apiRoutes);


