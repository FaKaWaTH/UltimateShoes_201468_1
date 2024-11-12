document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const shoeId = urlParams.get('id');
    const selectedSize = urlParams.get('size');

    fetch('https://fakawath.github.io/UltimateShoes_201468_1/cards.json')
        .then(response => response.json())
        .then(data => {
            const shoe = data.cards.find(item => item.id == shoeId);
            if (shoe) {
                document.getElementById('shoe-img').src = shoe.image;
                document.getElementById('shoe-img').alt = shoe.title;
                document.getElementById('shoe-title').textContent = shoe.title;
                document.getElementById('shoe-size').textContent = `Talla seleccionada: ${selectedSize}`;
                document.getElementById('shoe-price').textContent = `Precio: $${shoe.price}`;
            } else {
                document.getElementById('infoCompra').innerHTML = '<p>Zapato no encontrado.</p>';
            }
        });
});
