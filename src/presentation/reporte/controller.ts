import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Proveedor } from '../../entities/proveedor.entity';
import * as ExcelJS from 'exceljs';

export class ReportController {
  async exportExcel(req: Request, res: Response) {
    const proveedores = await getRepository(Proveedor).find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Proveedores');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Identidad', key: 'identidad', width: 15 },
      { header: 'RTN', key: 'rtn', width: 15 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Correo', key: 'correo', width: 30 }
    ];

    proveedores.forEach(proveedor => {
      worksheet.addRow(proveedor);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=proveedores.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }
}
