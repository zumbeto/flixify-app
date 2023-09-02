'use strict';

const state = {
  currentPage: window.location.pathname,
};

// Create movie card
const createMovieCard = movie => {
  const imgSrc = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'dist/images/no-image.jpg';

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
  const imgSrc = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'dist/images/no-image.jpg';

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
  const imgSrc = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'dist/images/no-image.jpg';

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
  const imgSrc = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'dist/images/no-image.jpg';

  displayBackgroundImg('show', show.backdrop_path);
  console.log(show);

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
      pauseOnMouseEnter: true,
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
  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
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

// Page router function
const router = () => {
  switch (state.currentPage) {
    case '/':
    case '/index.html':
      displayTrendingMovies();
      displaySlider();
      break;
    case '/shows.html':
      displayTrendingShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      console.log('Search page');
      break;
  }

  highlightActiveLink();
};

document.addEventListener('DOMContentLoaded', router);
