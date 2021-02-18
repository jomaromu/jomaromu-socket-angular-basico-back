import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets';

// clase por default
export default class Server {

    // propiedades

    private static _instance: Server;

    public app: express.Application;
    public port: Number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        // creo el servidor
        this.httpServer = new http.Server(this.app);

        // configuro io
        this.io = new socketIO.Server(this.httpServer, {
            cors: {
                origin: true,
                credentials: true,
            }
        });

        this.escucharSockets();
    }

    public static get instance() {
        
        return this._instance || (this._instance = new this());
    }

    private escucharSockets(): void {
        
        console.log('Escuchando conexiones');

        // iniciar conexion de sockets
        this.io.on('connection', (cliente) => {
            // console.log('Cliente conectado');

            // conectar usuarios 
            socket.conectarCliente(cliente, this.io);

            // obtener usuarios
            socket.obtenerUsuarios(cliente, this.io);

            // escuchar/enviar mensajes
            socket.mensajes(cliente, this.io);

            // escuchar desconexion del cliente
            socket.desconectar(cliente, this.io);

            // configurar usuario
            socket.configurarUsuario(cliente, this.io);
        });
    }

    // metodo que levanta el servidor
    start(callback: Function) {

        this.httpServer.listen(this.port, callback());
    }
}