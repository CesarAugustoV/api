import {
    clientsModel
} from "../models/clients.model.js";

class ClientsManager {
    async findAggre() {
        const response = await clientsModel.aggregate([{
                $match: {
                    //calificacion mayor a 4 menor a 10
                    $and: [{
                        calificacion: {
                            $gt: 4,
                            $lt: 10
                        }
                    }],
                },
            },
            {
                // agrupar
                $group: {
                    //id de cada grupo va a ser el genero
                    _id: '$gender',
                    //cantidad de clientes de cada genero
                    clientes_count: {$count:{}},
                    //average de propiedad calificacion
                    prom_calificacion: {$avg: "$calificacion"},
                }
            },
            {
                //filtro de match, generos con mas de 4 usuarios
                $match:{
                    clients_count: { $gte: 2 }
                }
            },
            {
                // ordenar
                $sort: {
                    prom_calificacion: { calificacion: 1}
                }
            },
        ])

        return response
    }
}

export const clientsManager = new ClientsManager();