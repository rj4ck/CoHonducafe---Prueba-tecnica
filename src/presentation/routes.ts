import { Router } from 'express';
import { ServiciosRoutes } from "./servicios/routes";
import { ProveedoresRoutes } from './proveedores/routes';
import ReportsRoute from './reporte/routes';

export class AppRoutes {


  static get routes(): Router {

    const router = Router();

    router.use('/proveedores', ProveedoresRoutes.routes )
    router.use('/servicios', ServiciosRoutes.routes )
    router.use('/reports', ReportsRoute )

    return router;
  }


}
