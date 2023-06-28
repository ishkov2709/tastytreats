import debounce from 'lodash.debounce';
import { searchOnTitle } from '../service/categorySearch';
import Notiflix, { Loading } from 'notiflix';

import renderItem from './renders';
import startPagination from '../utils/pagination';
import changeThemePagination from '../utils/switchTheme';
import { OpenModal } from '../utils/modal-recipes';
import { setActiveClass } from '../utils/scrollbar';

// Refs

const searchInput = document.querySelector('.search-input');
export const recipeContainer = document.querySelector('#image-container');
const paginationBox = document.getElementById('pagination');
const spinner = document.getElementById('spinner');

// Vars

let prevSearch = '';
export let searchQuery = '';

const DEBOUNCE_DELAY = 300;

/**
  |============================
  | Base Fetch
  |============================
*/

searchImagesAndDisplay();

/////////////////////////

function handleSearch({ target }) {
  if (!target.value.trim()) return (searchInput.value = '');

  recipeContainer.innerHTML = '';
  searchQuery = customizeText(target.value);
  setActiveClass();
  searchImagesAndDisplay();
}

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

    const { page, perPage, totalPages, results } = await callback(
      searchQuery,
      currentPage
    );
    if (!results.length) throw new Error('No result');
    const recipes = await [
      ...results.map(({ title, description, preview, rating, _id, category }) =>
        renderItem(title, description, preview, rating, _id, category)
      ),
    ].join('');
    if (totalPages > 1) {
      paginationBox.style.display = 'block';
      await startPagination(page, perPage, totalPages, searchImagesAndDisplay);
    } else {
      paginationBox.style.display = 'none';
    }
    recipeContainer.innerHTML = recipes;

    prevSearch = searchQuery;
  } catch (error) {
    paginationBox.style.display = 'none';
    Notiflix.Notify.warning('No result for your request, please try again!');

    prevSearch ? (searchQuery = prevSearch) : (searchQuery = '');

    searchImagesAndDisplay();
  } finally {
    hideSpinner();
    changeThemePagination();
  }
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

export function setSearchQueryName(name = '') {
  searchQuery = name;
}

const debouncedHandleSearch = debounce(handleSearch, DEBOUNCE_DELAY);

searchInput.addEventListener('input', debouncedHandleSearch);

recipeContainer.addEventListener('click', hendleClickOnRecipes);
