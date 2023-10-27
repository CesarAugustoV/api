import mongoose from 'mongoose';


const URI = 'mongodb+srv://CesarAugustoV:JlG1olNzA39gZPe0@miclustercafe.ahxuo0q.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose
    .connect(URI)
    .then(() => console.log('Conectado a la DB'))
    .catch(error => console.error(error));