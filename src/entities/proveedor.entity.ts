import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Servicio } from './servicio.entity';

@Entity()
export class Proveedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  identidad: string;

  @Column({ type: 'varchar', length: 20 })
  rtn: string;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  genero: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  departamento: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  municipio: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  zonaCobertura: string;

  @Column({ type: 'varchar', length: 100 })
  correo: string;

  @Column({ type: 'varchar', length: 20 })
  telefono: string;

  @ManyToOne(() => Servicio, servicio => servicio.proveedores)
  servicio: Servicio;
}
