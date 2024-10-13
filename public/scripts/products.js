const params = new URLSearchParams(window.location.search);
const userId = params.get('userId');
let cartId = ''

function updateCart() {
    fetch(`/cart?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
            if (!data) throw new Error("No data");
            // Actualizar el cart ID si no habia o cambio
            if (data._id && data._id !== cartId) cartId = data._id;
            // Limpiar data previa
            document.querySelectorAll("p.item-qty").forEach(p => p.innerHTML = '');
            document.querySelectorAll("button.removeBtn").forEach(b => b.disabled = true);

            if (!data.products || !data.products instanceof Array || data.products.length === 0) return;
            // Editar la data de los productos incluidos
            data.products.forEach(item => {
                if (item.quantity != 0) {
                    document.querySelector(`li[data-id='${item.product._id}'] > p.item-qty`).innerHTML = item.quantity + " en el carrito."
                    document.querySelector(`li[data-id='${item.product._id}'] > button.removeBtn`).disabled = false
                }
            })
        }).catch(err => console.error(err))
}

updateCart();

function addToCart(productId) {
    fetch(`/cart/${cartId}/${productId}?userId=${userId}`, {
        method: "POST"
    })
        .then(res => res.json())
        .then(data => {
            if (data) updateCart();
        })
        .catch(err => console.error(err))
}

function removeFromCart(productId) {
    fetch(`/cart/${cartId}/${productId}?userId=${userId}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data) updateCart();
        })
        .catch(err => console.error(err))
}
