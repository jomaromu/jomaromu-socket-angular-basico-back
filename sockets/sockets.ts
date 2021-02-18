import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

// conectar cliente
export const conectarCliente = (cliente: Socket, io: socketIO.Server) => {

    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

// escuchar desconexion del cliente
export const desconectar = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

        // borrar usuario
        usuariosConectados.borrarUsuario(cliente.id);

        // emitir lista actualizada de los usuarios
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
}

// mensajes
export const mensajes = (cliente: Socket, io: socketIO.Server) => {

    // escuchar mensaje
    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        console.log('Mensaje recibido', payload);

        // emitir respuesta a mensaje
        io.emit('mensaje-nuevo', payload);
    });
}

// configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {

    // escuchar login
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());

        // enviar callback
        callback({
            ok: true,
            mensaje: `Usuario: ${payload.nombre}, configurado`
        });
        // emitir login
        // io.emit('mensaje-nuevo', payload);
    });
}

// Obtener Usuarios
export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('obtener-usuarios', () => {

        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());

    });

}