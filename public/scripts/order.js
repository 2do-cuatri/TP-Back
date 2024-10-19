function changeStatus(id) {
    const select = document.getElementById(`select-${id}`);	
    const status = select.value;
    fetch(`/order?id=${id}&status=${status}`, {
    method: 'PUT',
}).then(response => {
    console.log('Response:', response);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    console.log('Order status updated:', status);
    const label = document.getElementById(`label-${id}`);
    label.textContent = status;
    return response.json();

}).catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});
}