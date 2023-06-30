import debounce from 'lodash.debounce';
import { searchOnTitle } from '../service/categorySearch';
import Notiflix, { Loading } from 'notiflix';

import renderItem from './renders';
import startPagination from '../utils/pagination';
import { changeThemePagination } from '../utils/switchTheme';
import { OpenModal } from '../utils/modal-recipes';
import { setActiveClass } from '../utils/scrollbar';
import { fetchAreaRecipes, fetchIngredientsRecipes } from '../service/API.js';

// Refs

const searchInput = document.querySelector('.search-input');
export const recipeContainer = document.querySelector('#image-container');
const paginationBox = document.getElementById('pagination');
const spinner = document.getElementById('spinner');
const areaSelect = document.querySelector('.list-area');
const ingredSelect = document.querySelector('.list-ingred');
const filtersSection = document.querySelector('.input-section');
const timeSelect = document.querySelector('.list-time');

// Vars

let prevSearch = '';
let searchQuery = '';

let query = '';
let time = '';
let ingredient = '';
let area = '';

const DEBOUNCE_DELAY = 300;

/**
  |============================
  | Base Fetch
  |============================
*/

searchImagesAndDisplay();

/////////////////////////

// function handleSearch({ target }) {
//   if (!target.value.trim()) return (searchInput.value = '');

//   recipeContainer.innerHTML = '';
//   searchQuery = customizeText(target.value);
//   setActiveClass();
//   searchImagesAndDisplay();
// }

// function customizeText(text) {
//   const trimText = text.trim();
//   return `${trimText[0].toUpperCase()}${trimText.slice(1, trimText.length)}`;
// }

// function showSpinner() {
//   spinner.style.display = 'block';
// }

// function hideSpinner() {
//   spinner.style.display = 'none';
// }

// export async function searchImagesAndDisplay(
//   currentPage = 1,
//   callback = searchOnTitle
// ) {
//   try {
//     showSpinner();
//     // createAreaFilters();
//     // createIngredFilters();
//     const { page, perPage, totalPages, results } = await callback(
//       searchQuery,
//       currentPage
//     );
//     if (!results.length) throw new Error('No result');
//     const recipes = await [
//       ...results.map(({ title, description, preview, rating, _id, category }) =>
//         renderItem(title, description, preview, rating, _id, category)
//       ),
//     ].join('');
//     if (totalPages > 1) {
//       paginationBox.style.display = 'block';
//       await startPagination(page, perPage, totalPages, searchImagesAndDisplay);
//     } else {
//       paginationBox.style.display = 'none';
//     }
//     recipeContainer.innerHTML = recipes;

//     prevSearch = searchQuery;
//   } catch (error) {
//     paginationBox.style.display = 'none';
//     Notiflix.Notify.warning('No result for your request, please try again!');

//     prevSearch ? (searchQuery = prevSearch) : (searchQuery = '');

//     searchImagesAndDisplay();
//   } finally {
//     hideSpinner();
//     changeThemePagination();
//   }
// }

function toggleFavriteRecipe(currentBtn) {
  const recipeInfo = JSON.parse(currentBtn.dataset.info);

  currentBtn.classList.toggle('active');
  const storage = JSON.parse(localStorage.getItem('favorites')) ?? [];
  if (currentBtn.classList.contains('active')) {
    localStorage.setItem('favorites', JSON.stringify([...storage, recipeInfo]));
  } else {
    localStorage.setItem(
      'favorites',
      JSON.stringify([...storage.filter(el => el.id !== recipeInfo.id)])
    );
  }
}

export function hendleClickOnRecipes({ target }) {
  if (!target.closest('button')) return;

  const currentBtn = target.closest('button');

  if (currentBtn.name === 'favorite') {
    toggleFavriteRecipe(currentBtn);
  }

  if (currentBtn.name === 'details') {
    OpenModal(currentBtn);
  }
}

// export function setSearchQueryName(name = '') {
//   searchQuery = name;
// }

// const debouncedHandleSearch = debounce(handleSearch, DEBOUNCE_DELAY);

// searchInput.addEventListener('input', debouncedHandleSearch);

recipeContainer.addEventListener('click', hendleClickOnRecipes);

/**
  |============================
  | Filters
  |============================
*/

async function generatAreaFiltersMarkup() {
  try {
    const filtersArea = await fetchAreaRecipes();
    return filtersArea.reduce(
      (markup, ivent) => markup + createAreaMarkupFilters(ivent),
      ''
    );
  } catch {}
}

async function generateIngredFiltersMarkup() {
  try {
    const filtersIngred = await fetchIngredientsRecipes();

    return filtersIngred.reduce(
      (markup, ivent) => markup + createIngredMarkupFilters(ivent),
      ''
    );
  } catch {}
}

function createAreaMarkupFilters(ivent) {
  const { name } = ivent;
  return `<option value="${name}">${name}</option>`;
}

function createIngredMarkupFilters(ivent) {
  const { name, _id } = ivent;
  return `<option value="${_id}">${name}</option>`;
}

async function createAreaFilters() {
  try {
    const areasMarkup = await generatAreaFiltersMarkup();
    addAreaFilters(areasMarkup);
  } catch {}
}

async function createIngredFilters() {
  try {
    const ingredMarkup = await generateIngredFiltersMarkup();
    addIngridientsFilters(ingredMarkup);
  } catch {}
}
function addAreaFilters(markup) {
  areaSelect.insertAdjacentHTML('beforeend', markup);
}

function addIngridientsFilters(markup) {
  ingredSelect.innerHTML = `<option value="">&nbsp;</option>` + markup;
  // ingredSelect.insertAdjacentHTML('beforeend', markup);
}

const debouncedOnInpit = debounce(onInput, DEBOUNCE_DELAY);

filtersSection.addEventListener('input', debouncedOnInpit);

function onInput(e) {
  const value = e.target.value;
  if (e.target.classList.contains('search-input')) {
    if (!value) return (searchInput.value = '');

    query = customizeText(value);
  }
  if (e.target.classList.contains('list-area')) {
    area = value;
  }
  if (e.target.classList.contains('list-ingred')) {
    ingredient = value;
  }
  if (e.target.classList.contains('list-time')) {
    time = value;
  }

  recipeContainer.innerHTML = '';

  setActiveClass();
  searchImagesAndDisplay();

  console.log(query, area, time, ingredient);
}

// function handleSearch({ target }) {
//   if (!target.value.trim()) return (searchInput.value = '');

//   recipeContainer.innerHTML = '';
//   searchQuery = customizeText(target.value);
//   setActiveClass();
//   searchImagesAndDisplay();
// }

function customizeText(text) {
  const trimText = text.trim();
  return `${trimText[0].toUpperCase()}${trimText.slice(1, trimText.length)}`;
}

function showSpinner() {
  spinner.style.display = 'block';
}

function hideSpinner() {
  spinner.style.display = 'none';
}

export async function searchImagesAndDisplay(
  currentPage = 1,
  callback = searchOnTitle
) {
  try {
    showSpinner();
    createAreaFilters();
    createIngredFilters();

    const { page, perPage, totalPages, results } = await callback(
      query,
      currentPage,
      time,
      area,
      ingredient
    );
    if (!results.length) throw new Error('No result');
    const recipes = await [
      ...results.map(({ title, description, preview, rating, _id, category }) =>
        renderItem(title, description, preview, rating, _id, category)
      ),
    ].join('');
    if (totalPages > 1) {
      paginationBox.style.display = 'block';
      startPagination(page, perPage, totalPages, page => {
        searchImagesAndDisplay(page, callback);
      });
    } else {
      paginationBox.style.display = 'none';
    }
    recipeContainer.innerHTML = recipes;

    prevSearch = query;
  } catch (error) {
    timeSelect.firstElementChild.setAttribute('selected', 'selected');
    areaSelect.firstElementChild.setAttribute('selected', 'selected');
    ingredSelect.firstElementChild.setAttribute('selected', 'selected');
    paginationBox.style.display = 'none';
    Notiflix.Notify.warning('No result for your request, please try again!');

    query = '';
    time = '';
    ingredient = '';
    area = '';

    if (prevSearch === query) prevSearch = '';

    prevSearch ? (query = prevSearch) : (query = '');
    searchImagesAndDisplay();
  } finally {
    timeSelect.firstElementChild.removeAttribute('selected', 'selected');
    areaSelect.firstElementChild.removeAttribute('selected', 'selected');
    ingredSelect.firstElementChild.removeAttribute('selected', 'selected');

    hideSpinner();
    changeThemePagination();
  }
}
export function setSearchQueryName(name = '') {
  query = name;
}

function toggleFavriteRecipe(currentBtn) {
  const recipeInfo = JSON.parse(currentBtn.dataset.info);

  currentBtn.classList.toggle('active');
  const storage = JSON.parse(localStorage.getItem('favorites')) ?? [];
  if (currentBtn.classList.contains('active')) {
    localStorage.setItem('favorites', JSON.stringify([...storage, recipeInfo]));
  } else {
    localStorage.setItem(
      'favorites',
      JSON.stringify([...storage.filter(el => el.id !== recipeInfo.id)])
    );
  }
}

// function hendleClickOnRecipes({ target }) {
//   if (!target.closest('button')) return;
//   const currentBtn = target.closest('button');
//   if (currentBtn.name === 'favorite') {
//     toggleFavriteRecipe(currentBtn);
//   }
//   if (currentBtn.name === 'details') {
//     OpenModal(currentBtn);
//   }
// }
