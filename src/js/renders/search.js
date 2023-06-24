import debounce from 'lodash.debounce';
import { searchImages } from '../service/categorySearch';
import Notiflix from 'notiflix';

const searchButton = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-input');
const imageContainer = document.querySelector('#image-container');
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
    const images = await searchImages(searchQuery, page);
    createImageCards(images);
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

function createImageCards(images) {
  imageContainer.innerHTML = '';

  images?.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('image-card');

    const imageElement = document.createElement('img');
    imageElement.src = image.preview;
    card.appendChild(imageElement);

    imageContainer.appendChild(card);
  });
}

window.addEventListener('scroll', handleScroll);
