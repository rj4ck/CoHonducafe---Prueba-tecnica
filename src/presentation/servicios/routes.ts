import { Router } from 'express';
import { ProveedorService } from './controller';

export class ServiciosRoutes {

  static get routes(): Router {

    const router = Router();

    const controller = new ProveedorService();

    router.get('/', controller.getAll);
    router.post('/', controller.create);

    return router;
  }


}
