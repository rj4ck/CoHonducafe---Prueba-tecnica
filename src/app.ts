import {config} from "nodemon";

require('dotenv').config();

import 'reflect-metadata';

import { envs } from "./config";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { AppDataSource, ensureDatabaseExists } from "./data-source";


async function startApp() {
  try {
    await ensureDatabaseExists();

    await AppDataSource.initialize();
    console.log("Conexión a la base de datos establecida.");

    await new Server({
      port: envs.PORT,
      routes: AppRoutes.routes
    })
      .start()
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
  }
}

startApp();


