import { Request, Response } from 'express';
import { AppDataSource } from '../../data-source';  // Importa el DataSource

import { Proveedor } from '../../entities/proveedor.entity';

export class ProveedorController {
  async createProveedor(req: Request, res: Response) {
    const proveedorRepo = AppDataSource.getRepository(Proveedor);
    const proveedor = proveedorRepo.create(req.body);

    try {
      await proveedorRepo.save(proveedor);

      res.redirect('/');
    } catch (error) {
      res.status(500).json({ message: "Error al crear el proveedor", error });
    }
  }

  async getProveedores(req: Request, res: Response) {
    const proveedorRepo = AppDataSource.getRepository(Proveedor);

    try {
      const proveedores = await proveedorRepo.find({});

      res.json(proveedores);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los proveedores", error });
    }
  }
}
