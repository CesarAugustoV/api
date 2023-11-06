    const nextPage = document.querySelector('.next-page')
    const prevPage = document.querySelector('.prev-page')
    const totalPages = document.querySelector('.total-pages')
    const actualPage = document.querySelector('.current-page');

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const image = document.createElement('div');
        image.className = 'product-image';
        // Agregar una imagen del producto (puedes personalizar esto)

        const title = document.createElement('div');
        title.className = 'product-title';
        title.textContent = product.name;

        const description = document.createElement('div');
        description.className = 'product-description';
        description.textContent = `Categoría: ${product.category}`;

        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = `Precio: $${product.price}`;

        const addToCart = document.createElement('div');
        addToCart.className = 'add-to-cart';
        const addButton = document.createElement('button');
        addButton.textContent = 'Agregar al carrito';

        addToCart.appendChild(addButton);

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(addToCart);

        return card;
    }

    // Obtén el contenedor de productos
    const productContainer = document.getElementById('product-container');

    // URL de la API que deseas consultar
    const apiUrl = 'http://localhost:8080/api/products';

    // Realizar la petición GET utilizando Fetch
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos de la API');
            }
            return response.json(); // Convierte la respuesta a formato JSON
        })
        .then(data => {
            // Haz algo con los datos recibidos, por ejemplo, mostrarlos en la consola
            data.products.results.forEach(product => {
                const productCard = createProductCard(product);
                productContainer.appendChild(productCard);
            });

            //paginacion
            const info = data.products.info;

            if(!info.prevPage){
                prevPage.disabled= true;
            }

            if(!info.nextPage){
                nextPage.disabled= true;
            }
            
            actualPage.innerHTML=info.actualPage;
            totalPages.innerHTML=info.totalPages;

        })
        .catch(error => {
            console.error('Ocurrió un error: ' + error);
        });


    // Función para crear un carrito
    function createCart() {
        fetch('http://localhost:8080/api/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({}) // Puedes enviar información adicional si es necesario
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo crear el carrito');
                }
                return response.json();
            })
            .then(cart => {
                // Una vez que se crea el carrito, agrega el producto al carrito
                addProductToCart(cart._id);
            })
            .catch(error => {
                console.error('Ocurrió un error al crear el carrito: ' + error);
            });
    }

    // Función para agregar un producto al carrito
    function addProductToCart(idCart) {
        fetch(`http://localhost:8080/api/carts/${idCart}/products/${idProducto}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: 1
                }) // Puedes ajustar la cantidad según tus necesidades
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo agregar el producto al carrito');
                }
                return response.json();
            })
            .then(data => {
                console.log('Producto agregado exitosamente al carrito:', data);
            })
            .catch(error => {
                console.error('Ocurrió un error al agregar el producto al carrito: ' + error);
            });
    }

    // Llama a la función para crear el carrito
    createCart();