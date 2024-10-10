require('dotenv').config();

import 'reflect-metadata';
import * as express from 'express';

import { envs } from "./config";
import { createConnection } from 'typeorm';
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


