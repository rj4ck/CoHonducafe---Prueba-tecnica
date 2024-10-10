import { Router } from 'express';
import { ProveedorController } from './controller';

export class ProveedoresRoutes {

  static get routes(): Router {

    const router = Router();

    const controller = new ProveedorController();

    router.get('/', controller.getProveedores);
    router.post('/', controller.createProveedor);

    return router;
  }


}
