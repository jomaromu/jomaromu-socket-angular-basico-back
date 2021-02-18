import { Usuario } from './usuario';

export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() { }

    // agregar un usuario
    public agregar(usuario: Usuario): Usuario {

        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    // actualizar usuario
    public actualizarNombre(id: string, nombre: string): void {

        for (const usuario of this.lista) {

            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('=============== actualizando usuario ===============');
        console.log(this.lista);
    }

    // obtener lista de usuarios
    public getLista(): Array<Usuario> {
        // return this.lista;
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' );
    }

    // obtener un usuario
    public getUsuario(id: string): any {

        return this.lista.find(usuario => {
            return usuario.id === id;
        })
    }

    // obtener usuarios en una sala en particular
    public getUsuariosEnSala(): any {
        return this.lista.filter(usuario => {
            return usuario.sala
        })
    }

    // borrar usuario
    public borrarUsuario(id: string): Array<Usuario> {

        const tempUsuario = this.getUsuario(id);

        this.lista = this.lista.filter( usuario => usuario.id !== id);
        return tempUsuario;
    }
}