'use strict';

const state = {
  currentPage: window.location.pathname,
};

// Highlight current page in navbar
const highlightActiveLink = () => {
  const links = document.querySelectorAll('.main-header__nav__link');
  links.forEach(link => {
    if (link.getAttribute('href') === state.currentPage) {
      link.classList.add('active');
    }
  });
};

// Page router function
const router = () => {
  switch (state.currentPage) {
    case '/':
    case '/index.html':
      console.log('Home page');
      break;
    case '/shows.html':
      console.log('Shows page');
      break;
    case '/movie-details.html':
      console.log('Movie details page');
      break;
    case '/tv-details.html':
      console.log('TV details page');
      break;
    case '/search.html':
      console.log('Search page');
      break;
  }

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', router);
