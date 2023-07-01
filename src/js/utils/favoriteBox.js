import renderItem from '../renders/renders';
import startPagination from './pagination';
import { AddToFav, OpenModal } from './modal-recipes';
import { changeThemePagination } from './switchTheme.js';
import Notiflix from 'notiflix';

const refs = {
  favoriteCategoriesList: document.querySelector('.favorite-categories'),
  favoriteRecipesList: document.querySelector('.favorite-list'),
  warning: document.querySelector('.empty-storage'),
  paginationBox: document.getElementById('pagination'),
  categoryBtn: document.querySelector('.favorite-categories'),
  allBtn: document.querySelector('.all-btn'),
  hiroImg: document.querySelector('.fav-hero'),
  recipesBox: document.getElementById('image-container'),
  modal: document.getElementById('scroll-rec'),
  saveRecipeBtn: document.querySelector('.save-recipes-btn'),
};

// Variables

let currentBtn = '';

const categoryRecipes = [];

function calcPages() {
  const screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    return 9;
  }

  if (screenWidth >= 768) {
    return 12;
  }
}

function groupObjects(array, groupSize) {
  const result = {};
  for (let i = 0; i < array.length; i += groupSize) {
    const groupName = Math.floor(i / groupSize) + 1;
    result[groupName] = array.slice(i, i + groupSize);
  }
  return result;
}

function onFavoritesRealod() {
  const categoryMarkup = generateCategoryList();

  const allCatBtn = `<button class="button-fav all-btn onActive" name="all">All categories</button>`;

  const data = JSON.parse(localStorage.getItem('favorites'));

  refs.favoriteRecipesList.innerHTML = '';
  refs.favoriteCategoriesList.innerHTML = '';

  if (data && data.length) {
    refs.favoriteCategoriesList.innerHTML = `${allCatBtn}${categoryMarkup}`;
  } else {
    refs.allBtn.style.display = 'none';
  }

  generateStorageList();
}

function generateStorageList(pageSet = 1) {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);

  refs.allBtn.style.display = 'none';

  if (data && data.length) {
    refs.allBtn.style.display = 'block';

    const perPage = calcPages();
    const objData = groupObjects(data, perPage);
    const totalPages = Object.keys(objData).length;

    if (totalPages > 1) {
      refs.paginationBox.style.display = 'block';
      startPagination(pageSet, perPage, totalPages, generateStorageList);

      changeThemePagination();
    } else {
      refs.paginationBox.style.display = 'none';
    }

    const listMarkup = objData[pageSet].reduce(
      (markup, { title, description, preview, rating, id, category }) =>
        markup + renderItem(title, description, preview, rating, id, category),
      ''
    );

    refs.favoriteRecipesList.innerHTML = listMarkup;
    refs.warning.classList.add('is-hidden');
  } else {
    refs.warning.classList.remove('is-hidden');
    refs.allBtn.classList.add('is-hidden');

    if (window.innerWidth < 768) {
      refs.hiroImg.classList.add('is-hidden');
    }
  }
}

function generateCategoryList() {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);
  if (storage) {
    return data
      .flatMap(recipe => recipe.category)
      .filter((category, index, array) => array.indexOf(category) === index)
      .reduce(
        (categoryMarkup, category) => categoryMarkup + renderCategory(category),
        ''
      );
  }
  return '';
}

function renderCategory(category) {
  return `<button class="button-fav">${category}</button>`;
}

refs.categoryBtn.addEventListener('click', filterByCategory);

function filterByCategory(evt) {
  if (evt.target.classList.contains('onActive')) return;

  let data = [];
  let categoryRecipes;
  refs.favoriteRecipesList.innerHTML = '';

  if (evt !== Number(evt) && evt.target.nodeName === 'BUTTON') {
    setActiveClass(evt);
    if (evt.target.name === 'all') return generateStorageList();
    else currentBtn = evt.target.textContent;
  }

  const storage = localStorage.getItem('favorites');
  data = JSON.parse(storage);

  if (!data.length) {
    refs.favoriteCategoriesList.style.display = 'none';

    return;
  }

  categoryRecipes = [...data.filter(recipe => recipe.category === currentBtn)];

  let pageSet = 1;

  if (Number(evt) === evt) pageSet = evt;

  const perPage = calcPages();
  const objData = groupObjects(categoryRecipes, perPage);
  const totalPages = Object.keys(objData).length;

  if (totalPages > 1) {
    refs.paginationBox.style.display = 'block';
    startPagination(pageSet, perPage, totalPages, filterByCategory);
  } else {
    refs.paginationBox.style.display = 'none';
  }

  const listMarkup = objData[pageSet].reduce(
    (markup, { title, description, preview, rating, id, category }) =>
      markup + renderItem(title, description, preview, rating, id, category),
    ''
  );

  refs.favoriteRecipesList.innerHTML = listMarkup;
}

function setActiveClass({ target }) {
  const btn = document.querySelector('.onActive');
  if (!btn) return refs.allBtn.classList.add('onActive');
  btn.classList.remove('onActive');
  target.classList.add('onActive');
}

function removeFavriteRecipe(currentBtn) {
  const recipeInfo = JSON.parse(currentBtn.dataset.info);

  const storage = JSON.parse(localStorage.getItem('favorites'));
  localStorage.setItem(
    'favorites',
    JSON.stringify([...storage.filter(el => el.id !== recipeInfo.id)])
  );
  onFavoritesRealod();
}

function checkCategory(target) {
  const currentRec = target.closest('div.recipe-item').dataset.category;
  const storageItems = JSON.parse(localStorage.getItem('favorites'));
  const isCategoryLocal = storageItems.find(el => el.category === currentRec);
  const isCategoryRendered = [...refs.favoriteCategoriesList.children].find(
    el => el.textContent === currentRec
  );
  if (!isCategoryLocal && isCategoryRendered) {
    isCategoryRendered.remove();
  } else if (isCategoryLocal && !isCategoryRendered) {
    refs.favoriteCategoriesList.insertAdjacentHTML(
      'beforeend',
      renderCategory(currentRec)
    );
  }

  if (!storageItems.length) refs.allBtn.style.display = 'none';
  else refs.allBtn.style.display = 'block';
}

function toggleFavorite(e) {
  AddToFav(e);
  onFavoritesRealod();
}

function hendleClickOnRecipes({ target }) {
  if (!target.closest('button')) return;
  const currentBtn = target.closest('button');
  if (currentBtn.name === 'favorite') {
    removeFavriteRecipe(currentBtn);
    checkCategory(target);
  }
  if (currentBtn.name === 'details') {
    OpenModal(currentBtn);
    refs.saveRecipeBtn.removeEventListener('click', AddToFav);
  }
}

refs.saveRecipeBtn.addEventListener('click', toggleFavorite);
refs.recipesBox.addEventListener('click', hendleClickOnRecipes);
document.addEventListener('DOMContentLoaded', onFavoritesRealod);
