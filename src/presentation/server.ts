import * as path from 'path';
import * as express from "express"

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

    this.app.set('view engine', 'ejs');
    this.app.set('views', path.join(__dirname, '../../views'))

    this.app.get('/', (req, res) => {
      res.render('proveedores', { title: 'Mi Aplicación' });
    });

    this.app.use( express.json() );
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-

    this.app.use('/api', this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    })

  }

}
