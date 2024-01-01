import {
    Router
} from "express";
import { fork } from 'child_process';

const router = Router();

let visita = 0;

router.get('/', async (req, res) => {
    res.send(`Esta es la visita ${++visita}`)
});

function sumar(){
    let suma = 0;
    for (let i= 0; i <5e9; i++) {
        suma +=i;  
    }
    return suma
}
//si ejecutas este endpoint él bloquea todos los demas procesos
router.get('/calculo-bloq', async (req, res) => {
    const resultado = sumar();
    res.send(`El resultado de la suma es ${resultado}`)
});

router.get('/calculo-no-bloq', async (req, res) => {
    //ruta del childprocess es un archivo
    const childProcess = fork('./src/childProcess.js');
    //crea el eveno tipo message
    childProcess.send('saludos');
    //escucha el evento de tipo message
    childProcess.on('message', (resultado)=>{
        res.send(`El resultado de la suma es ${resultado}`)
    })
});




export default router;