const params = new URLSearchParams(window.location.search);
let cartId = ''

function updateCart() {
    fetch('/cart')
        .then(res => {
           if (res.ok) {
                return res.json()
           } else return null
        })
        .then(data => {
            if (!data) throw new Error("No data");
            // Actualizar el cart ID si no habia o cambio
            if (data._id && data._id !== cartId) cartId = data._id;

            // Limpiar data previa
            document.querySelectorAll("p.item-qty").forEach(p => p.innerHTML = '');
            document.querySelectorAll("button.removeBtn").forEach(b => b.disabled = true);
            const totalElement = document.querySelector("#total");
            const botonComprar = document.querySelector("#comprar");
            totalElement.innerHTML = '$0';
            botonComprar.disabled = true;

            // Si por algun motivo la data no viene en la forma que esperamos volver
            if (!data.products || !data.products instanceof Array || data.products.length === 0) return;

            // Editar la data de los productos incluidos
            let total = 0;
            data.products.forEach(item => {
                if (item.quantity != 0) {
                    total += item.product.price*item.quantity
                    let itemQty = document.querySelector(`li[data-id='${item.product._id}'] > p.item-qty`)
                    if (itemQty) itemQty.innerHTML = item.quantity + " en el carrito."
                    let removeBtn = document.querySelector(`li[data-id='${item.product._id}'] > button.removeBtn`)
                    if(removeBtn) removeBtn.disabled = false
                }
            })

            // Actualizar el valor del total
            totalElement.innerHTML = "$" + total.toFixed(2);
            if (total > 0) botonComprar.disabled = false;
        }).catch(err => {
            console.error("Error al buscar data del carrito")
            console.error(err)
        })
}

updateCart();

function addToCart(productId) {
    fetch(`/cart/${cartId}/${productId}`, {
        method: "POST"
    })
        .then(res => res.json())
        .then(data => {
            if (data) updateCart();
        })
        .catch(err => console.error(err))
}

function removeFromCart(productId) {
    fetch(`/cart/${cartId}/${productId}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data) updateCart();
        })
        .catch(err => console.error(err))
}

function handleComprar() {
    if (!cartId) return alert("Hubo un problema con tu carrito!");
    const checkoutUrl = new URL('/checkout/'+cartId, window.location.origin);
    window.location.assign(checkoutUrl.href); 
}
