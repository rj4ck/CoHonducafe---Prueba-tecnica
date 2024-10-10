import * as sql from 'mssql';
import { DataSource } from 'typeorm';

import { envs } from "./config";

const config = {
  user: envs.DB_USERNAME || 'sa',     // Usuario SA o tu propio usuario
  password: envs.DB_PASSWORD || 'MyPass@word', // Contraseña
  server: envs.DB_HOST || 'localhost', // Servidor de la base de datos
  port: envs.DB_PORT|| 1433, // Puerto de SQL Server
  options: {
    encrypt: false,   // Encriptación (desactivada para entornos locales)
    enableArithAbort: true,
  }
};

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: envs.DB_HOST,
  port: envs.DB_PORT || 1433,
  username: envs.DB_USERNAME,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  synchronize: false,
  logging: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/*.ts"],
  options: {
    encrypt: false,
    enableArithAbort: true,
  }
});

// Función para verificar y crear la base de datos si no existe
export async function ensureDatabaseExists() {

  let pool;

  try {
    // Conectar a SQL Server sin especificar una base de datos específica
    pool = await sql.connect(config);

    // Verificar si la base de datos 'proveedor_db' existe, si no, crearla
    await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'proveedor_db')
            BEGIN
                CREATE DATABASE proveedor_db;
            END
        `);
    console.log("Base de datos 'proveedor_db' verificada o creada.");

  } catch (error) {
    console.error("Error al verificar o crear la base de datos:", error);
    throw error;
  } finally {
    // Cerrar el pool de conexiones para evitar fugas de memoria
    if (pool) {
      await pool.close();  // Utiliza pool.close() para cerrar la conexión
    }
  }
}
