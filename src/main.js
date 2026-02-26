import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentQuery = '';
let page = 1;
let PER_PAGE = 15;
const loadMoreButton = document.querySelector('.load-more');

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const searchQuery = event.target.elements['search-text'].value.trim();

  if (!searchQuery) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = searchQuery;
  page = 1;

  clearGallery();
  loadMoreButton.classList.add('hidden');
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (totalPages > 1) {
      loadMoreButton.classList.remove('hidden');
    }

  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);

  } finally {
    hideLoader();
  }

  form.reset();
};

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);
    const totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (page >= totalPages) {
      loadMoreButton.classList.add('hidden');
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
});
