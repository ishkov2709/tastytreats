// Функція для встановлення класу body в залежності від поточної сторінки
function setPageClass() {
  const currentPage = location.pathname.split('/').pop();

  if (currentPage === 'index.html') {
    document.body.classList.add('home');
  } else if (currentPage === 'favorites.html') {
    document.body.classList.add('favorite');
  }
}

// Виклик функції після завантаження сторінки
window.addEventListener('DOMContentLoaded', setPageClass);
