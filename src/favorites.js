import './js/utils/localSctorage';
import './js/utils/switchTheme.js';
import './js/utils/mobile-menu.js';

// import { OpenModal } from './js/utils/modal-recipes.js'
import renderItem from './js/renders/renders.js';
// import hendleClickOnRecipes from './js/renders/search.js';

const refs = {
  favoriteCategoriesList: document.querySelector('.favorite-categories'),
  favoriteRecipesList: document.querySelector('.favorite-list'),
  warning: document.querySelector('p'),
};
// console.log(refs.warning)
// localStorage.clear()

document.addEventListener('DOMContentLoaded', onFavoritesRealod);
refs.warning.hidden = true;

function onFavoritesRealod() {
  const markup = generateStorageList();
  if (!markup) throw new Error('No result');
  refs.favoriteRecipesList.insertAdjacentHTML('beforeend', markup);
}

function generateStorageList() {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);
  if (storage) {
    return data.reduce(
      (markup, { title, description, preview, rating, id }) =>
        markup + renderItem(title, description, preview, rating, id),
      ''
    );
  }
  refs.warning.hidden = false;
}
