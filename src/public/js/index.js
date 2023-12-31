// Conecta al servidor Socket.io
const socket = io();

// Escucha el evento 'productos' para recibir los datos de productos actualizados
socket.on('products', (productos) => {
    // Llama a una función para llenar la tabla con los datos actualizados
    llenarTabla(productos);
});

// Función para llenar la tabla con los datos de productos
function llenarTabla(productos) {
    // Obtén una referencia al cuerpo de la tabla
    const tbody = document.querySelector('tbody');

    // Limpia el contenido existente de la tabla
    tbody.innerHTML = '';

    // Itera sobre los productos y crea una fila por cada uno
    productos.forEach((producto) => {
        // Crea una fila (tr)
        const row = document.createElement('tr');

        // Crea y llena las celdas (td) con los datos del producto
        const idCell = document.createElement('td');
        idCell.textContent = producto._id;

        const titleCell = document.createElement('td');
        titleCell.textContent = producto.name;

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = `$${producto.price}`;

        const priceCell = document.createElement('td');
        priceCell.textContent = `${producto.stock}`;

        const stockCell = document.createElement('td');
        stockCell.textContent = producto.decription;

        const categoryCell = document.createElement('td');
        categoryCell.textContent = producto.category;

        // Agrega las celdas a la fila
        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(descriptionCell);
        row.appendChild(priceCell);
        row.appendChild(stockCell);
        row.appendChild(categoryCell);

        // Agrega la fila al cuerpo de la tabla
        tbody.appendChild(row);
    });
};

document.getElementById("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita la recarga de la página

    const form = document.querySelector('#form');

    // Obtiene los valores de los campos del formulario
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const decription = document.getElementById("decription").value;
    const category = document.getElementById("category").value;

    // Crea un objeto con los datos del producto
    const producto = {
        name: name,
        price: price,
        stock: stock,
        decription: decription,
        category: category
    };


    // Realiza la solicitud POST con Fetch
    fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(producto)
    })
    .then(response => {
        if (response.ok) {
            console.log("Producto enviado con éxito.");
            form.reset();
        } else {
            console.error("No se pudo enviar el producto.");
        }
    })
    .catch(error => {
        console.error("Error en la solicitud POST:", error);
    });
});





document.getElementById("formDelete").addEventListener("submit", function (event) {
    
    event.preventDefault(); // Evita la recarga de la página

    const id = document.getElementById('id');

    

    const url = `/api/products/${id.value}`;

    fetch(url, {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                id.value = '';
                console.log(`Producto con ID ${id} eliminado con éxito.`);
            } else {
                console.error(`No se pudo eliminar el producto con ID ${id}.`);
            }
        })
        .catch(error => {
            console.error("Error en la solicitud DELETE:", error);
        });
});