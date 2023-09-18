const arreglo = [{
        obj: 1
    },
    {
        obj: 2
    },
    {
        obj: 3
    },
    {
        obj: 4
    },
    {
        obj: 5
    },
    {
        obj: 6
    },
];


const manager = (arreglo, limit) => {
    const corte = arreglo.slice(0, limit)

    console.log(corte);

}

manager(arreglo, 5)