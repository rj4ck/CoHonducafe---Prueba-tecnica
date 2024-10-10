import * as ExcelJS from 'exceljs';
import { Request, Response } from 'express';

import {AppDataSource} from "../../data-source";
import { Proveedor } from '../../entities/proveedor.entity';

export class ReportController {
  async exportExcel(req: Request, res: Response) {
    const proveedorRepo = AppDataSource.getRepository(Proveedor);
    const proveedores = await proveedorRepo.find({ relations: ['servicio'] });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Proveedores');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Identidad', key: 'identidad', width: 15 },
      { header: 'RTN', key: 'rtn', width: 15 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Departamento', key: 'departamento', width: 30 },
      { header: 'Municipio', key: 'municipio', width: 30 },
      { header: 'Zona', key: 'zonaCobertura', width: 30 },
      { header: 'Correo', key: 'correo', width: 30 },
      { header: 'Servicio', key: 'servicio', width: 30 }
    ];

    proveedores.forEach(proveedor => {
      worksheet.addRow({
        id: proveedor.id,
        identidad: proveedor.identidad,
        rtn: proveedor.rtn,
        nombre: proveedor.nombre,
        departamento: proveedor.departamento,
        municipio: proveedor.municipio,
        zonaCobertura: proveedor.zonaCobertura,
        correo: proveedor.correo,
        telefono: proveedor.telefono,
        servicio: proveedor.servicio?.nombre || 'Sin servicio'
      })
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=proveedores.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }
}
