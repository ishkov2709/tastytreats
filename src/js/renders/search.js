import debounce from 'lodash.debounce';
import { searchImages } from '../service/categorySearch';
import Notiflix from 'notiflix';

import renderItem from './renders';

const searchButton = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-input');
const recipeContainer = document.querySelector('#image-container');
const loadMoreBtn = document.querySelector('#load-more-button');
let page = 1;
let searchQuery = '';

const debouncedSearch = debounce(searchImagesAndDisplay, 300);

function handleSearch() {
  searchQuery =
    searchInput.value.trim().charAt(0).toUpperCase() +
    searchInput.value.trim().slice(1).toLowerCase();
  if (searchQuery !== '') {
    debouncedSearch();
    searchInput.value = '';
  } else {
    Notiflix.Notify.info('Please enter a search query.');
  }
}

async function searchImagesAndDisplay() {
  try {
    const data = await searchImages(searchQuery, page);
    const recipes = await [
      ...data.map(({ title, description, preview, rating, _id }) =>
        renderItem(title, description, preview, rating, _id)
      ),
    ].join('');

    recipeContainer.innerHTML = recipes;
  } catch (error) {
    console.error(error);
  }
}

searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

async function loadMoreImages() {
  page++;
  try {
    const images = await searchImages(searchQuery, page);
    if (images.length > 0) {
      createImageCards(images);
      if (images.length < 6) {
        loadMoreBtn.classList.add('hidden');
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
    } else {
      loadMoreBtn.classList.add('hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('An error occurred while fetching images.');
  }
}

function handleInput() {
  if (searchInput.value.trim() !== '') {
    searchButton.classList.add('hidden');
  } else {
    searchButton.classList.remove('hidden');
  }
}

searchInput.addEventListener('input', handleInput);

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    window.removeEventListener('scroll', handleScroll);
    if (!loadMoreBtn.classList.contains('hidden')) {
      loadMoreImages();
    }
  }
}

function hendleClickOnRecipes({ target }) {
  if (!target.closest('button')) return;

  const currentBtn = target.closest('button');

  if (currentBtn.name === 'favorite') {
    const recipeInfo = JSON.parse(currentBtn.dataset.info);

    currentBtn.classList.toggle('active');
    const storage = JSON.parse(localStorage.getItem('favorites')) ?? [];
    if (currentBtn.classList.contains('active')) {
      localStorage.setItem(
        'favorites',
        JSON.stringify([...storage, recipeInfo])
      );
    } else {
      localStorage.setItem(
        'favorites',
        JSON.stringify([...storage.filter(el => el.id !== recipeInfo.id)])
      );
    }
  }
}

recipeContainer.addEventListener('click', hendleClickOnRecipes);

window.addEventListener('scroll', handleScroll);
