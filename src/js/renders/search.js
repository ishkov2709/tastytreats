import debounce from 'lodash.debounce';
import { searchImages } from '../service/categorySearch';
import Notiflix from 'notiflix';

import renderItem from './renders';
import startPagination from '../utils/pagination';

import { OpenModal } from '../utils/modal-recipes';

// Refs

const searchInput = document.querySelector('.search-input');
const recipeContainer = document.querySelector('#image-container');
const paginationBox = document.getElementById('pagination');
const spinner = document.getElementById('spinner');

// Vars

let searchQuery = '';

const DEBOUNCE_DELAY = 300;

function handleSearch({ target }) {
  if (!target.value.trim()) return (searchInput.value = '');

  recipeContainer.innerHTML = '';
  searchQuery = customizeText(target.value);

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

export async function searchImagesAndDisplay(currentPage = 1) {
  try {
    showSpinner();

    const { page, perPage, totalPages, results } = await searchImages(
      searchQuery,
      currentPage
    );
    if (!results.length) throw new Error('No result');
    const recipes = await [
      ...results.map(({ title, description, preview, rating, _id }) =>
        renderItem(title, description, preview, rating, _id)
      ),
    ].join('');
    if (totalPages > 1) {
      paginationBox.style.display = 'block';
      startPagination(page, perPage, totalPages, searchImagesAndDisplay);
    } else {
      paginationBox.style.display = 'none';
    }
    recipeContainer.innerHTML = recipes;
    searchInput.value = '';
  } catch (error) {
    console.error(error);
    paginationBox.style.display = 'none';
    Notiflix.Notify.warning('No result for your request, please try again!');
  } finally {
    hideSpinner();
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

function hendleClickOnRecipes({ target }) {
  if (!target.closest('button')) return;

  const currentBtn = target.closest('button');

  if (currentBtn.name === 'favorite') {
    toggleFavriteRecipe(currentBtn);
  }

  if (currentBtn.name === 'details') {
    OpenModal(currentBtn);
  }
}

const debouncedHandleSearch = debounce(handleSearch, DEBOUNCE_DELAY);

searchInput.addEventListener('input', debouncedHandleSearch);


recipeContainer.addEventListener('click', hendleClickOnRecipes);
