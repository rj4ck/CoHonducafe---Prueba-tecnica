import {Request, Response} from "express";

import {AppDataSource} from "../../data-source";
import {Servicio} from "../../entities/servicio.entity";

export class ProveedorService {
  async getAll(req: Request, res: Response) {
    const servicioRepo = AppDataSource.getRepository(Servicio);

    try {
      const servicios = await servicioRepo.find({});

      res.json(servicios);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los proveedores", error });
    }
  }

  async create(req: Request, res: Response) {

      const servicioRepo = AppDataSource.getRepository(Servicio);
      const servicio = servicioRepo.create(req.body);

      try {
        await servicioRepo.save(servicio);

        res.redirect('/servicios');
      } catch (error) {
        res.status(500).json({ message: "Error al crear el servicio", error });
      }

  }
}
