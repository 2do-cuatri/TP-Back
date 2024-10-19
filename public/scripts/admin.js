function eliminarProducto(id) {
    if (!id) return;
    fetch(`/products/${id}`, {
        method: "DELETE"
    }).then(res => {
        if (res.ok) window.location.reload()
    })
}