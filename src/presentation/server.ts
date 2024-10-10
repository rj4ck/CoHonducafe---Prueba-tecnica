import * as path from 'path';
import * as express from "express"

import {AppDataSource} from "../data-source";
import {Servicio} from "../entities/servicio.entity";

interface Options{
  port?: number;
  routes: express.Router;
}

export class Server {

  public readonly app = express();
  private readonly port: number;
  private readonly routes: express.Router;

  constructor( options: Options ) {
    const { port = 1337, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(express.static(path.join(__dirname, '../../public')));


    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../views'))

    this.app.use( express.json() );
    this.app.use( express.urlencoded({ extended: true }) );

    this.app.get('/', async (req, res) => {
      try {
        const serviciosRepo = AppDataSource.getRepository(Servicio);
        const servicios = await serviciosRepo.find();

        res.render('proveedores', { servicios });
      } catch (error) {
        res.status(500).send('Error al cargar los servicios');
      }
    });

    this.app.get('/servicios', (req, res) => {
      res.render('servicios');
    });

    this.app.use('/api', this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    })

  }

}
