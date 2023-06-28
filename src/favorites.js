import './js/utils/localSctorage';
import './js/utils/switchTheme.js';
import './js/utils/mobile-menu.js';
import './js/utils/setClass.js'

import { OpenModal } from './js/utils/modal-recipes.js'
import renderItem from './js/renders/renders.js';

import startPagination from './js/utils/pagination';
// import hendleClickOnRecipes from './js/renders/search.js';

const refs = {
  favoriteCategoriesList: document.querySelector('.favorite-categories'),
  favoriteRecipesList: document.querySelector('.favorite-list'),
  warning: document.querySelector('p'),
  paginationBox: document.getElementById('pagination'),
};
// console.log(refs.warning)
// localStorage.clear()

function calcPages() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    return 9;
  }

  if (screenWidth >= 768) {
    return 12;
  }
 
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

function groupObjects(array, groupSize) {
  const result = {};
  for (let i = 0; i < array.length; i += groupSize) {
    const groupName = Math.floor(i / groupSize) + 1;
    result[groupName] = array.slice(i, i + groupSize);
  }
  return result;
}

// document.addEventListener('DOMContentLoaded', onFavoritesRealod);
// refs.warning.hidden = true;

// function onFavoritesRealod() {
//   const markup = generateStorageList();
//   if (!markup) throw new Error('No result');
//   refs.favoriteRecipesList.insertAdjacentHTML('beforeend', markup);
// }

function generateStorageList(pageSet = 1) {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);
  if (storage) {
    const perPage = calcPages();
    const objData = groupObjects(data, perPage);
    const totalPages = Object.keys(objData).length;

    if (totalPages > 1) {
      refs.paginationBox.style.display = 'block';
      startPagination(pageSet, perPage, totalPages, generateStorageList);
    } else {
      paginationBox.style.display = 'none';
    }

    const listMarkup = objData[pageSet].reduce(
      (markup, { title, description, preview, rating, id }) =>
        markup + renderItem(title, description, preview, rating, id),
      ''
    );

    refs.favoriteRecipesList.innerHTML = listMarkup;
  }
  
  // refs.warning.hidden = false;
}

// function dispenseItems(pageList = 1) {
//   let perPage = calcPages();
//   const storage = localStorage.getItem('favorites');
//   const data = JSON.parse(storage);
//   const objData = groupObjects(data, perPage);

//   const a = objData[pageList].reduce(
//     (markup, { title, description, preview, rating, id }) =>
//       markup + renderItem(title, description, preview, rating, id),
//     ''
//   );
// }

generateStorageList();
  
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
