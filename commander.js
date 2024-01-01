import {program} from "commander";
//commander se utiliza para el manejo de argumentos ARGV, guarda info par clave valor
program.option("-m, --mode <mode>", "ambiente a ejecutar", "dev")//flags, descripcion, valor predeterminado
// por defecto boolean, se envia <> en flag cambiar a String, <random>
        .option("-p, --port <port>", "puerto a utilizar", 8080)//otras opciones
        .option("-d, --debug", "variable para activar modo debug", false)
        .parse();

export default program;