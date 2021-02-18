import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', (req: Request, resp: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    resp.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes', (req: Request, resp: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    const payload = { cuerpo, de };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    resp.json({
        ok: true,
        mensaje: 'POST CORRECTO'
    });
});

router.post('/mensajes/:id', (req: Request, resp: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    // emitir a un usuario en parcitular
    const payload = {
        de,
        cuerpo
    }

    const server = Server.instance;

    server.io.in(id).emit('mensaje-privado', payload);

    resp.json({
        ok: true,
        mensaje: 'POST CORRECTO',
        cuerpo,
        de,
        id
    });
});

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', async (req: Request, res: Response) => {

    const server = Server.instance;

    server.io.allSockets().then((clientes) => {
        res.json({
            ok: true,
            // clientes
            clientes: Array.from(clientes)
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        })
    });

});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {


    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });


});

export default router;