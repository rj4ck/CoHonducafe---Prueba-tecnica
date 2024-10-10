import { getRepository } from 'typeorm';
import { Proveedor } from '../../entities/proveedor.entity';

export class ProveedorService {
  async getAll() {
    return await getRepository(Proveedor).find({ relations: ["servicios"] });
  }

  async create(proveedorData: any) {
    const proveedorRepo = getRepository(Proveedor);
    const proveedor = proveedorRepo.create(proveedorData);
    return await proveedorRepo.save(proveedor);
  }
}
