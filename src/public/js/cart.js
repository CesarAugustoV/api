function createCartList(cartData) {
    const cartList = document.getElementById("cart-list");

    cartData.forEach(item => {
        const row = document.createElement("tr");

        const productName = document.createElement("td");
        productName.textContent = item.product.name;

        const price = document.createElement("td");
        price.textContent = `$${item.product.price.toFixed(2)}`;

        const quantity = document.createElement("td");
        quantity.textContent = item.quantity;

        const total = document.createElement("td");
        total.textContent = `$${(item.product.price * item.quantity).toFixed(2)}`;

        row.appendChild(productName);
        row.appendChild(price);
        row.appendChild(quantity);
        row.appendChild(total);

        cartList.appendChild(row);
    });
}

const cartId = document.querySelector('.cartId').innerHTML;

fetch(`http://localhost:8080/api/carts/${cartId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`La solicitud falló con estado: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Llama a la función para crear la lista de productos
        createCartList(data.cart.products);
    })
    .catch(error => {
        // Maneja los errores aquí.
        console.error(error);
    });