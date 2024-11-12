document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const shoeId = urlParams.get('id');

    fetch('https://fakawath.github.io/UltimateShoes_201468_1/cards.json')
        .then(response => response.json())
        .then(data => {
            const shoe = data.cards.find(item => item.id == shoeId);
            if (shoe) {
                document.getElementById('shoe-img').innerHTML = `<img src="${shoe.image}" class="img-fluid">`;
                document.getElementById('shoe-details').innerHTML = `
                <h2>${shoe.title}</h2>
                <p id="price">$${shoe.price}</p>
                <form id="shoeForm" action="/compra/compra.html">
                    <div class="container-fluid tallas">
                        <input type="button" value="34" class="num-button">
                        <input type="button" value="35" class="num-button">
                        <input type="button" value="36" class="num-button">
                        <input type="button" value="37" class="num-button">
                        <input type="button" value="38" class="num-button">
                        <input type="button" value="39" class="num-button">
                        <input type="button" value="40" class="num-button">
                        <input type="button" value="41" class="num-button">
                        <input type="button" value="42" class="num-button">
                        <input type="button" value="43" class="num-button">
                        <input type="button" value="44" class="num-button">
                        <input type="button" value="45" class="num-button">
                    </div>
                    <br>
                    <input type="submit" value="Comprar" id="buy">
                </form>
                `;

                const sizeButtons = document.querySelectorAll('.num-button');
                sizeButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        sizeButtons.forEach(btn => btn.classList.remove('selected'));
                        button.classList.add('selected');
                        selectedSize = button.value;
                        document.getElementById('buy').disabled = false;
                    });
                });

                document.getElementById('shoeForm').addEventListener('submit', (event) => {
                    event.preventDefault();
                    if (selectedSize) {
                        window.location.href = `https://fakawath.github.io/UltimateShoes_201468_1/compra/compra.html?id=${shoeId}&size=${selectedSize}`;
                    }
                });
            } else {
                document.getElementById('shoe-details').innerHTML = '<p>Zapato no encontrado.</p>';
            }
        });
});
