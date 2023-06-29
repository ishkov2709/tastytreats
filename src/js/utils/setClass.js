// Функція для встановлення класу body в залежності від поточної сторінки
function setPageClass() {
  const currentPage = location.pathname.split('/').pop();

  if (currentPage === 'index.html' || !currentPage) {
    document.getElementById('homeLink').classList.add('currentNow');
  } else if (currentPage === 'favorites.html') {
    document.getElementById('favoriteLink').classList.add('currentNow');
  }
}

// Виклик функції після завантаження сторінки
window.addEventListener('DOMContentLoaded', setPageClass);
