import Server from './classes/server';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

// crear una instancia de mi server
const server = Server.instance;

// body parser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

// cors
// server.app.use(cors({ origin: true, credentials: true }));

// usar las rutas
server.app.use('/', router);

server.start(() => {
    console.log(`Servidor corriendo en el puerto: ${server.port}`);
});