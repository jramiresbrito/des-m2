import { Router } from 'express';
import GradesController from './app/controller/gradesController';

const routes = new Router();

routes.get('/', GradesController.index);
routes.get('/:id', GradesController.show);
routes.post('/', GradesController.create);
routes.put('/:id', GradesController.update);
routes.delete('/:id', GradesController.destroy);

export default routes;
