import { Router } from 'express';
import { ReportController } from './controller';

const router = Router();
const reportController = new ReportController();

router.get('/proveedores', reportController.exportExcel);

export default router;
