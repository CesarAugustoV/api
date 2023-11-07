function createCartList(cartData) {
    const cartList = document.getElementById("cart-list");
    let totalAmount = 0; // Inicializa el total a pagar

    cartData.forEach(item => {
        const row = document.createElement("tr");

        const productName = document.createElement("td");
        productName.textContent = item.product.name;

        const price = document.createElement("td");
        price.textContent = `$${item.product.price.toFixed(2)}`;

        const quantity = document.createElement("td");
        quantity.textContent = item.quantity;

        const itemTotal = item.product.price * item.quantity; // Total por producto
        const total = document.createElement("td");
        total.textContent = `$${itemTotal.toFixed(2)}`;

        row.appendChild(productName);
        row.appendChild(price);
        row.appendChild(quantity);
        row.appendChild(total);

        cartList.appendChild(row);

        totalAmount += itemTotal; // Agrega el total de este producto al total general
    });

    // Agrega una fila para mostrar el total a pagar
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td colspan="3"><strong>Total a Pagar</strong></td>
        <td><strong>$${totalAmount.toFixed(2)}</strong>
    `;

    cartList.appendChild(totalRow);
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
        // Llama a la función para crear la lista de productos y mostrar el total a pagar
        createCartList(data.cart.products);
    })
    .catch(error => {
        // Maneja los errores aquí.
        console.error(error);
    });
