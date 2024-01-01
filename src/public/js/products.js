    const nextPage = document.querySelector('.next-page')
    const prevPage = document.querySelector('.prev-page')
    const totalPages = document.querySelector('.total-pages')
    const actualPage = document.querySelector('.current-page');
    const cartButton = document.querySelector('.cartButton');

    let cartId;

    cartButton.addEventListener('click', () => {

        // Construye el URL de redirección
        const redirectURL = `http://localhost:8080/carts/${cartId}`;

        // Redirige a la nueva página
        window.location.href = redirectURL;
    })

    function createProductCard(product) {

        const productIdInput = document.createElement('input');
        productIdInput.type = 'hidden';
        productIdInput.className = 'product-id'; // Puedes establecer un nombre
        productIdInput.value = product._id;

        const card = document.createElement('div');
        card.className = 'product-card';

        const image = document.createElement('div');
        image.className = 'product-image';
        // Agregar una imagen del producto

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
        card.appendChild(productIdInput);

        addButton.addEventListener('click', (ev) => {

            Swal.fire({
                title: "Added",
                text: "Agregado",
                icon: "success"
            });

            const productId = ev.target.parentNode.parentNode.querySelector('.product-id').value;
            // Verificar si ya tienes un carrito creado
            if (cartId) {
                // Si tienes un carrito, agrega el producto al carrito
                addProductToCart(cartId, productId);
            } else {
                // Si no tienes un carrito, crea un nuevo carrito y luego agrega el producto
                createCartAndAddProduct(productId);
            }
        });

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
            data.products.results.forEach(product => {
                const productCard = createProductCard(product);
                productContainer.appendChild(productCard);
            });

            //paginacion
            const info = data.products.info;

            if (!info.prevPage) {
                prevPage.disabled = true;
            }

            if (!info.nextPage) {
                nextPage.disabled = true;
            }

            actualPage.innerHTML = info.actualPage;
            totalPages.innerHTML = info.totalPages;

        })
        .catch(error => {
            console.error('Ocurrió un error: ' + error);
        });

    // Función para crear un carrito y agregar un producto
    function createCartAndAddProduct(productId) {
        // Crear un nuevo carrito
        fetch('http://localhost:8080/api/carts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(response => response.json())
            .then(cart => {
                cartId = cart.cart._id; // Almacenar el ID del carrito
                addProductToCart(cartId, productId); // Agregar el producto al carrito
            })
            .catch(error => {
                console.error('Error al crear el carrito: ' + error);
            });
    }

    // Función para agregar un producto a un carrito
    function addProductToCart(cartId, productId) {


        fetch(`http://localhost:8080/api/carts/${cartId}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    quantity: 1
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Producto agregado al carrito:', data);
            })
            .catch(error => {
                console.error('Error al agregar el producto al carrito: ' + error);
            });
    }