import { Router } from 'express';
import computerController from '../controllers/computersController.js';

const apiRoutes = Router()
    .use('/computers', computerController);


export default Router().use('/api', apiRoutes);


