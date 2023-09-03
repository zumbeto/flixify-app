'use strict';

// Global state object
const globalState = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: process.env.TMDB_API_KEY,
    baseUrl: 'https://api.themoviedb.org/3/',
  },
};

// Create movie card
const createMovieCard = movie => {
  const imgSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'assets/images/no-image.jpg';

  return `
        <div class="card">
          <a href="movie-details.html?id=${movie.id}">
            <img src="${imgSrc}" class="card__img-top" alt="${movie.title}" />
          </a>
          <div class="card__body">
            <h5 class="card__body__title">${movie.title}</h5>
            <p class="card__body__text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        </div>
      `;
};

// Display trending movies
const displayTrendingMovies = async () => {
  const { results: trendingMovies } = await fetchData('trending/movie/day');

  const cards = trendingMovies.map(createMovieCard).join('');
  document.querySelector('#trending-movies').innerHTML = cards;
};

// Create show card
const createShowCard = show => {
  const imgSrc = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'assets/images/no-image.jpg';

  return `
        <div class="card">
          <a href="tv-details.html?id=${show.id}">
            <img src="${imgSrc}" class="card__img-top" alt="${show.name}" />
          </a>
          <div class="card__body">
            <h5 class="card__body__title">${show.name}</h5>
            <p class="card__body__text">
              <small class="text-muted">Release: ${show.first_air_date}</small>
            </p>
          </div>
        </div>
      `;
};

// Display trending TV shows
const displayTrendingShows = async () => {
  const { results: trendingShows } = await fetchData('trending/tv/day');

  const cards = trendingShows.map(createShowCard).join('');
  document.querySelector('#trending-shows').innerHTML = cards;
};

// Movie Details Page
const displayMovieDetails = async () => {
  const movieId = new URLSearchParams(window.location.search).get('id');
  const movie = await fetchData(`movie/${movieId}`);
  const imgSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'assets/images/no-image.jpg';

  displayBackgroundImg('movie', movie.backdrop_path);

  document.querySelector('#movie-poster').src = imgSrc;
  document.querySelector('#movie-title').textContent = movie.title;
  document.querySelector('#movie-release-date').textContent = `Release date: ${movie.release_date}`;
  document.querySelector('#movie-rating').innerHTML = `
  <i class="fas fa-star text-primary"></i>
  ${movie.vote_average.toFixed(1)} / 10
`;
  document.querySelector('#movie-overview').textContent = movie.overview;

  const genresList = document.querySelector('#movie-genres-list');
  genresList.innerHTML = movie.genres.map(genre => `<li class="list-group__item">${genre.name}</li>`).join('');

  document.querySelector('#movie-homepage').href = movie.homepage;

  const infoList = document.querySelector('#movie-info-list');
  infoList.innerHTML = `
    <li><span class="text-secondary">Budget:</span> $${addCommasToNumbers(movie.budget)}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommasToNumbers(movie.revenue)}</li>
    <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
`;

  document.querySelector('#movie-production-companies').innerHTML = movie.production_companies
    .map(company => `<span>${company.name}</span>`)
    .join(', ');
};

// TV Show Details Page
const displayShowDetails = async () => {
  const showId = new URLSearchParams(window.location.search).get('id');
  const show = await fetchData(`tv/${showId}`);
  const imgSrc = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'assets/images/no-image.jpg';

  displayBackgroundImg('show', show.backdrop_path);

  document.querySelector('#show-poster').src = imgSrc;
  document.querySelector('#show-name').textContent = show.name;
  document.querySelector('#show-first-air-date').textContent = `Release date: ${show.first_air_date}`;
  document.querySelector('#show-rating').innerHTML = `
  <i class="fas fa-star text-primary"></i>
  ${show.vote_average.toFixed(1)} / 10
`;
  document.querySelector('#show-overview').textContent = show.overview;

  const genresList = document.querySelector('#show-genres-list');
  genresList.innerHTML = show.genres.map(genre => `<li class="list-group__item">${genre.name}</li>`).join('');

  document.querySelector('#show-homepage').href = show.homepage;

  const infoList = document.querySelector('#show-info-list');
  infoList.innerHTML = `
    <li><span class="text-secondary">Number Of Seasons:</span> ${show.number_of_seasons}</li>
    <li><span class="text-secondary">Last Episode To Air:</span> Episode: ${show.last_episode_to_air.episode_number} - ${show.last_episode_to_air.name}</li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
`;

  document.querySelector('#show-production-companies').innerHTML = show.production_companies
    .map(company => `<span>${company.name}</span>`)
    .join(', ');
};

// Regex to add commas to numbers
function addCommasToNumbers(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Display background image
function displayBackgroundImg(type, path) {
  const backgroundOverlay = document.createElement('div');
  backgroundOverlay.classList.add('background-overlay');
  backgroundOverlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${path})`;

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(backgroundOverlay);
  } else {
    document.querySelector('#show-details').appendChild(backgroundOverlay);
  }
}

// Search Page Functionality
if (document.querySelector('.search-btn')) {
  document.querySelector('.search-btn').addEventListener('click', event => {
    const searchInput = document.querySelector('#search-term').value;

    if (!searchInput || searchInput.trim() === '') {
      event.preventDefault();
      showAlert('Please type in a keyword to search.');
    }
  });
}

// Main Search Function
const search = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  globalState.search.term = urlParams.get('search-term');
  globalState.search.type = urlParams.get('type');
  globalState.search.page = parseInt(urlParams.get('page'), 10) || 1;

  if (globalState.search.term !== null && globalState.search.term !== '') {
    // Get, store and display search results
    const displaySearchResults = async () => {
      const { results, total_pages, total_results } = await searchAPIData();

      globalState.search.totalPages = total_pages;
      globalState.search.totalResults = total_results;

      if (results.length === 0) {
        showAlert('No results found');
        return;
      } else {
        document.querySelector('#search-results-heading').innerHTML = `
        <h2> ${results.length} of ${globalState.search.totalResults} results for "${globalState.search.term}"</h2>
        `;
      }

      // Pagination buttons and page counter if more than 20 results
      const existingPagination = document.querySelector('.pagination');

      if (globalState.search.totalResults > 20 && !existingPagination) {
        const div = document.createElement('div');
        div.classList.add('pagination');
        div.innerHTML = `
        <button class="btn btn-primary pagination-btn" id="prev" data-action="decrement">Prev</button>
        <button class="btn btn-primary pagination-btn" id="next" data-action="increment">Next</button>
        <div class="page-counter">Page ${globalState.search.page} of ${globalState.search.totalPages}</div>
        `;

        document.querySelector('#pagination').appendChild(div);

        // Pagination event listener for Prev and Next buttons
        document.querySelectorAll('.pagination-btn').forEach(btn => {
          btn.addEventListener('click', async event => {
            if (event.target.dataset.action === 'increment') {
              globalState.search.page++;
            } else if (event.target.dataset.action === 'decrement') {
              globalState.search.page--;
            }

            await searchAPIData();
            displaySearchResults();
            updatePageCounter();
            updateBrowserURLWithPage(globalState.search.page);
          });
        });
      }

      // Disable Prev and Next buttons if on first or last page
      if (document.querySelector('#prev') && document.querySelector('#next')) {
        if (globalState.search.page === 1) {
          document.querySelector('#prev').disabled = true;
        } else if (globalState.search.page === globalState.search.totalPages) {
          document.querySelector('#next').disabled = true;
        } else {
          document.querySelector('#prev').disabled = false;
          document.querySelector('#next').disabled = false;
        }
      }

      const cards = results.map(createResultCard).join('');
      document.querySelector('#search-results').innerHTML = cards;
    };

    // Create search result card in DOM
    const createResultCard = result => {
      const imgSrc = result.poster_path
        ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
        : 'assets/images/no-image.jpg';

      return `
        <div class="card">
            <a href="${globalState.search.type}-details.html?id=${result.id}">
                <img src="${imgSrc}" class="card__img-top" alt="${
        globalState.search.type === 'movie' ? result.title : result.name
      }" />
            </a>
            <div class="card__body">
                <h5 class="card__body__title">${globalState.search.type === 'movie' ? result.title : result.name}</h5>
                <p class="card__body__text">
                    <small class="text-muted">Release: ${
                      globalState.search.type === 'movie' ? result.release_date : result.first_air_date
                    }</small>
                </p>
            </div>
        </div>
        `;
    };

    displaySearchResults();
    document.querySelector('#search-term').value = '';
  }
};

// Swiper Slider
const displaySlider = async () => {
  const { results: movies } = await fetchData('movie/now_playing');

  movies.forEach(movie => {
    const div = document.createElement('div');
    const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    div.classList.add('swiper-slide');

    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      <img src="${imgSrc}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);
  });
  initSwiper();
};

// Initialize Swiper
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 40,
    freeMode: {
      enabled: true,
      sticky: true,
      momentum: true,
      momentumRatio: 0.5,
    },
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1920: {
        slidesPerView: 5,
      },
    },
  });
}

// Fetch data from API
const fetchData = async endpoint => {
  const API_KEY = globalState.api.apiKey;
  const BASE_URL = globalState.api.baseUrl;

  showSpinner();

  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();

  hideSpinner();

  return data;
};

// Search data from API
const searchAPIData = async () => {
  const API_KEY = globalState.api.apiKey;
  const BASE_URL = globalState.api.baseUrl;

  showSpinner();

  const response = await fetch(
    `${BASE_URL}search/${globalState.search.type}?api_key=${API_KEY}&language=en-US&query=${globalState.search.term}&page=${globalState.search.page}`
  );

  const data = await response.json();

  hideSpinner();

  return data;
};

// Show/hide spinner functions
const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};
const hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

// Highlight current page in navbar
const highlightActiveLink = () => {
  const links = document.querySelectorAll('.main-header__nav__link');
  links.forEach(link => {
    const linkPath = new URL(link.getAttribute('href'), window.location.origin + window.location.pathname).pathname;
    if (linkPath === window.location.pathname) {
      link.classList.add('active');
    }
  });
};

// Update browser URL with page number
function updateBrowserURLWithPage(pageNumber) {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set('page', pageNumber);
  history.pushState({}, '', currentUrl.toString());
}

// Page Counter Function
const updatePageCounter = () => {
  const pageCounter = document.querySelector('.page-counter');
  if (pageCounter) {
    pageCounter.textContent = `Page ${globalState.search.page} of ${globalState.search.totalPages}`;
  }
};

// Back Button Functionality
const backBtn = () => {
  document.querySelector('.back-btn').addEventListener('click', function (event) {
    event.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  });
};

// Back to top button functionality
function initializeBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 3000) {
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.visibility = 'hidden';
    }
  });

  backToTopBtn.addEventListener('click', event => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Show Alert Message
function showAlert(message, className = 'error') {
  const existingAlert = document.querySelector('.alert');
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertElement = document.createElement('div');
  alertElement.classList.add('alert', className);
  alertElement.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertElement);

  setTimeout(() => alertElement.remove(), 3000);
}

// Page router function
const router = () => {
  switch (globalState.currentPage) {
    case '/':
    case '/index.html':
    case '/index':
      displayTrendingMovies();
      displaySlider();
      initializeBackToTop();
      break;
    case '/shows':
    case '/shows.html':
      displayTrendingShows();
      initializeBackToTop();
      break;
    case '/movie-details':
    case '/movie-details.html':
      displayMovieDetails();
      backBtn();
      break;
    case '/tv-details':
    case '/tv-details.html':
      displayShowDetails();
      backBtn();
      break;
    case '/search':
    case '/search.html':
      search();
      initializeBackToTop();
      break;
  }

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', router);
