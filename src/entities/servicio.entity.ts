import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { Proveedor } from './proveedor.entity';

@Entity()
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @OneToMany(() => Proveedor, proveedor => proveedor.servicio)
  proveedores: Proveedor[];
}
