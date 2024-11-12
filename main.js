let currentPage = 1;
let totalCards = 0;
let allCards = [];

const cardsPerPage = 10;

const loadCards = (page) => {
  fetch('https://fakawath.github.io/UltimateShoes_201468_1/cards.json')
    .then(response => response.json())
    .then(data => {
      allCards = data.cards;
      displayCards(page);
    });
}

const displayCards = (page) => {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const cardsToDisplay = allCards.slice(startIndex, endIndex);
  updateCards(cardsToDisplay);
}

const updateCards = (cards) => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';

  let rowHTML = '<div class="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-5 g-3">';

  cards.forEach((card) => {
    const cardHTML = `
      <div class="col">
        <a href="https://fakawath.github.io/UltimateShoes_201468_1/shoe/shoe.html?id=${card.id}" class="card h-100" style="width: 100%; text-decoration: none; color: inherit;">
            <img src="${card.image}" class="card-img-top img-fluid">
            <div class="card-body">
              <h5 class="card-title">${card.title}</h5>
              <p class="card-text">${card.price}</p>
            </div>
        </a>
      </div>`;

    rowHTML += cardHTML;
  });

  rowHTML += '</div>';
  cardContainer.innerHTML = rowHTML;
};

const generatePagination = (totalCards) => {
  const pagination = document.getElementById('pagination');
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  pagination.innerHTML = `
      <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
          <a class="page-link" onclick="changePage(${currentPage - 1})">Anterior</a>
      </li>`;

  for (let i = 1; i <= totalPages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? 'active' : ''}">
          <a class="page-link" onclick="changePage(${i})">${i}</a>
      </li>`;
  }

  pagination.innerHTML += `
      <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
          <a class="page-link" onclick="changePage(${currentPage + 1})">Siguiente</a>
      </li>`;
};

const changePage = (page) => {
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  displayCards(page);
  generatePagination(totalCards);
};

const sortCardsAsc = () => {
  allCards.sort((a, b) => a.price - b.price);
  currentPage = 1;
  displayCards(currentPage);
  generatePagination(totalCards);
};

const sortCardsDesc = () => {
  allCards.sort((a, b) => b.price - a.price);
  currentPage = 1;
  displayCards(currentPage);
};

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://fakawath.github.io/UltimateShoes_201468_1/cards.json')
    .then(response => response.json())
    .then(data => {
      totalCards = data.cards.length;
      allCards = data.cards;
      generatePagination(totalCards);
      displayCards(currentPage);
    });
});



