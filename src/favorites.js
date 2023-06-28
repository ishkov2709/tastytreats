import './js/utils/localSctorage';
import './js/utils/switchTheme.js';
import './js/utils/mobile-menu.js';
import './js/utils/setClass.js'

import { OpenModal } from './js/utils/modal-recipes.js'
import renderItem from './js/renders/renders.js';
// import {hendleClickOnRecipes} from './js/renders/search.js';

const refs = {
    categoryBtn: document.querySelector('.favorite-categories'),
    favoriteCategoriesList: document.querySelector('.rendered-buttons'),
    favoriteRecipesList: document.querySelector('.favorite-list'),
    warning: document.querySelector('.empty-storage'),
}
console.log(refs.warning)
// localStorage.clear()

document.addEventListener('DOMContentLoaded', onFavoritesRealod);
refs.warning.classList.add('isHidden');

function onFavoritesRealod() {
    const markup = generateStorageList();
    const categoryMarkup = generateCategoryList();
    if (!markup) throw new Error ('No result');
    refs.favoriteRecipesList.insertAdjacentHTML('beforeend', markup);
    refs.favoriteCategoriesList.insertAdjacentHTML('beforeend', categoryMarkup);
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
  
  refs.warning.classList.remove('isHidden');
}

function generateCategoryList() {
    const storage = localStorage.getItem('favorites');
    const data = JSON.parse(storage);
    console.log(data)
  if (storage) {
    return (data
    .flatMap(recipe => recipe.category)
    .filter((category, index, array) => array.indexOf(category) === index)
    .reduce((categoryMarkup, category) => categoryMarkup + renderCategory(category), ''))
  } return '';
}

function renderCategory(category){
    return `<li><button class="button-fav">${category}</button></li>`
}

refs.categoryBtn.addEventListener('click', filterByCategory);

function filterByCategory(evt){
    refs.favoriteRecipesList.innerHTML = '';
    const currentBtn = evt.target.textContent;
    const storage = localStorage.getItem('favorites');
    const data = JSON.parse(storage);
    const categoryRecipes = data.filter((recipe) => recipe.category === currentBtn);
    console.log(categoryRecipes);
    const markup = generateCategoryMarkup(categoryRecipes);
    console.log(markup);
    if (!markup) throw new Error ('No result');
    refs.favoriteRecipesList.insertAdjacentHTML('beforeend', markup);
}

function generateCategoryMarkup(categoryRecipes){
    return categoryRecipes.reduce((markup, {title, description, preview, rating, id}) => markup + renderItem(title, description, preview, rating, id), '');
}