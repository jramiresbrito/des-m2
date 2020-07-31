import { Router } from 'express';
import GradesController from './app/controller/gradesController';

const routes = new Router();

routes.get('/', GradesController.index);
routes.get('/:id', GradesController.show);
routes.get('/sum/:student/:subject', GradesController.sum);
routes.get('/average/:subject/:type', GradesController.subjectTypeAverage);
routes.get('/top3/:subject/:type', GradesController.top3);
routes.post('/', GradesController.create);
routes.put('/:id', GradesController.update);
routes.delete('/:id', GradesController.destroy);

export default routes;
