import { Router } from 'express';
import { ReportController } from './controller';

const router = Router();
const reportController = new ReportController();

router.get('/report/excel', reportController.exportExcel);

export default router;
