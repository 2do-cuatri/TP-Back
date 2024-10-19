const selectedCategory = new URLSearchParams(window.location.search).get('category');

if (selectedCategory) {
    const btn = document.querySelector(`button[data-cat=${selectedCategory}]`)
    if (btn) btn.classList.add('selected')
}

function setCategory(category) {
    const thisurl = new URL(window.location);
    if (!category) {
        thisurl.searchParams.delete('category');
    } else {
        thisurl.searchParams.set('category', category);
    }
    window.location.assign(thisurl)
}