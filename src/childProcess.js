function sumar(){
    let suma = 0;
    for (let i= 0; i <5e9; i++) {
        suma +=i;  
    }
    return suma
}
//escucha el evento de tipo message
process.on('message', ()=>{
    const resultado = sumar();
    //envia el proceso
    process.send(resultado);
})