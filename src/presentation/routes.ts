import { Router } from 'express';
import { ServiciosRoutes } from "./servicios/routes";
import { ProveedoresRoutes } from './proveedores/routes';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/proveedores', ProveedoresRoutes.routes )
    router.use('/servicios', ServiciosRoutes.routes )

    return router;
  }


}
