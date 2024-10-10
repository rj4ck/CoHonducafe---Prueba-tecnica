import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProveedorTable1728539934490 implements MigrationInterface {
    name = 'CreateProveedorTable1728539934490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proveedor" ("id" int NOT NULL IDENTITY(1,1), "identidad" varchar(20) NOT NULL, "rtn" varchar(20) NOT NULL, "nombre" varchar(100) NOT NULL, "genero" varchar(10), "departamento" varchar(50), "municipio" varchar(50), "zonaCobertura" varchar(50), "correo" varchar(100) NOT NULL, "telefono" varchar(20) NOT NULL, "servicioId" int, CONSTRAINT "PK_405f60886417ece76cb5681550a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "servicio" ("id" int NOT NULL IDENTITY(1,1), "nombre" varchar(100) NOT NULL, CONSTRAINT "PK_a589f335f4fc94f913c9f86e608" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "proveedor" ADD CONSTRAINT "FK_83de9d3da8acfe7cae9a29d5e4e" FOREIGN KEY ("servicioId") REFERENCES "servicio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "proveedor" DROP CONSTRAINT "FK_83de9d3da8acfe7cae9a29d5e4e"`);
        await queryRunner.query(`DROP TABLE "servicio"`);
        await queryRunner.query(`DROP TABLE "proveedor"`);
    }

}
