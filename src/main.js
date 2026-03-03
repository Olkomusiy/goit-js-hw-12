import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentQuery = '';
let page = 1;
let PER_PAGE = 15;


const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

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
  hideLoadMoreButton();
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
      showLoadMoreButton();
    
    } else {
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

  form.reset();
};

async function handleLoadMore() {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);

    const totalPages = Math.ceil(data.totalHits / PER_PAGE);
    if (page < totalPages) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
    }
    const galleryItems = document.querySelectorAll('.gallery-item');
    const { height } = galleryItems[0].getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    hideLoader();
  }
}




