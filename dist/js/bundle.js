/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ (() => {

eval("\n\nconst state = {\n  currentPage: window.location.pathname,\n};\n\n// Create movie card\nconst createMovieCard = movie => {\n  const imgSrc = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'dist/images/no-image.jpg';\n\n  return `\n        <div class=\"card\">\n          <a href=\"movie-details.html?id=${movie.id}\">\n            <img src=\"${imgSrc}\" class=\"card__img-top\" alt=\"${movie.title}\" />\n          </a>\n          <div class=\"card__body\">\n            <h5 class=\"card__body__title\">${movie.title}</h5>\n            <p class=\"card__body__text\">\n              <small class=\"text-muted\">Release: ${movie.release_date}</small>\n            </p>\n          </div>\n        </div>\n      `;\n};\n\n// Display trending movies\nconst displayTrendingMovies = async () => {\n  const { results: trendingMovies } = await fetchData('trending/movie/day');\n\n  const cards = trendingMovies.map(createMovieCard).join('');\n  document.querySelector('#trending-movies').innerHTML = cards;\n};\n\n// Create show card\nconst createShowCard = show => {\n  const imgSrc = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'dist/images/no-image.jpg';\n\n  return `\n        <div class=\"card\">\n          <a href=\"tv-details.html?id=${show.id}\">\n            <img src=\"${imgSrc}\" class=\"card__img-top\" alt=\"${show.name}\" />\n          </a>\n          <div class=\"card__body\">\n            <h5 class=\"card__body__title\">${show.name}</h5>\n            <p class=\"card__body__text\">\n              <small class=\"text-muted\">Release: ${show.first_air_date}</small>\n            </p>\n          </div>\n        </div>\n      `;\n};\n\n// Display trending TV shows\nconst displayTrendingShows = async () => {\n  const { results: trendingShows } = await fetchData('trending/tv/day');\n\n  const cards = trendingShows.map(createShowCard).join('');\n  document.querySelector('#trending-shows').innerHTML = cards;\n};\n\n// Movie Details Page\nconst displayMovieDetails = async () => {\n  const movieId = new URLSearchParams(window.location.search).get('id');\n  const movie = await fetchData(`movie/${movieId}`);\n  const imgSrc = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'dist/images/no-image.jpg';\n\n  displayBackgroundImg('movie', movie.backdrop_path);\n\n  document.querySelector('#movie-poster').src = imgSrc;\n  document.querySelector('#movie-title').textContent = movie.title;\n  document.querySelector('#movie-release-date').textContent = `Release date: ${movie.release_date}`;\n  document.querySelector('#movie-rating').innerHTML = `\n  <i class=\"fas fa-star text-primary\"></i>\n  ${movie.vote_average.toFixed(1)} / 10\n`;\n  document.querySelector('#movie-overview').textContent = movie.overview;\n\n  const genresList = document.querySelector('#movie-genres-list');\n  genresList.innerHTML = movie.genres.map(genre => `<li class=\"list-group__item\">${genre.name}</li>`).join('');\n\n  document.querySelector('#movie-homepage').href = movie.homepage;\n\n  const infoList = document.querySelector('#movie-info-list');\n  infoList.innerHTML = `\n    <li><span class=\"text-secondary\">Budget:</span> $${addCommasToNumbers(movie.budget)}</li>\n    <li><span class=\"text-secondary\">Revenue:</span> $${addCommasToNumbers(movie.revenue)}</li>\n    <li><span class=\"text-secondary\">Runtime:</span> ${movie.runtime} minutes</li>\n    <li><span class=\"text-secondary\">Status:</span> ${movie.status}</li>\n`;\n\n  document.querySelector('#movie-production-companies').innerHTML = movie.production_companies\n    .map(company => `<span>${company.name}</span>`)\n    .join(', ');\n};\n\n// TV Show Details Page\nconst displayShowDetails = async () => {\n  const showId = new URLSearchParams(window.location.search).get('id');\n  const show = await fetchData(`tv/${showId}`);\n  const imgSrc = show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : 'dist/images/no-image.jpg';\n\n  displayBackgroundImg('show', show.backdrop_path);\n  console.log(show);\n\n  document.querySelector('#show-poster').src = imgSrc;\n  document.querySelector('#show-name').textContent = show.name;\n  document.querySelector('#show-first-air-date').textContent = `Release date: ${show.first_air_date}`;\n  document.querySelector('#show-rating').innerHTML = `\n  <i class=\"fas fa-star text-primary\"></i>\n  ${show.vote_average.toFixed(1)} / 10\n`;\n  document.querySelector('#show-overview').textContent = show.overview;\n\n  const genresList = document.querySelector('#show-genres-list');\n  genresList.innerHTML = show.genres.map(genre => `<li class=\"list-group__item\">${genre.name}</li>`).join('');\n\n  document.querySelector('#show-homepage').href = show.homepage;\n\n  const infoList = document.querySelector('#show-info-list');\n  infoList.innerHTML = `\n    <li><span class=\"text-secondary\">Number Of Seasons:</span> ${show.number_of_seasons}</li>\n    <li><span class=\"text-secondary\">Last Episode To Air:</span> Episode: ${show.last_episode_to_air.episode_number} - ${show.last_episode_to_air.name}</li>\n    <li><span class=\"text-secondary\">Status:</span> ${show.status}</li>\n`;\n\n  document.querySelector('#show-production-companies').innerHTML = show.production_companies\n    .map(company => `<span>${company.name}</span>`)\n    .join(', ');\n};\n\n// Regex to add commas to numbers\nfunction addCommasToNumbers(number) {\n  return number.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n}\n\n// Display background image\nfunction displayBackgroundImg(type, path) {\n  const backgroundOverlay = document.createElement('div');\n  backgroundOverlay.classList.add('background-overlay');\n  backgroundOverlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${path})`;\n\n  if (type === 'movie') {\n    document.querySelector('#movie-details').appendChild(backgroundOverlay);\n  } else {\n    document.querySelector('#show-details').appendChild(backgroundOverlay);\n  }\n}\n\n// Swiper Slider\nconst displaySlider = async () => {\n  const { results: movies } = await fetchData('movie/now_playing');\n\n  movies.forEach(movie => {\n    const div = document.createElement('div');\n    const imgSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;\n    div.classList.add('swiper-slide');\n\n    div.innerHTML = `\n    <a href=\"movie-details.html?id=${movie.id}\">\n      <img src=\"${imgSrc}\" alt=\"${movie.title}\" />\n    </a>\n    <h4 class=\"swiper-rating\">\n      <i class=\"fas fa-star text-secondary\"></i> ${movie.vote_average} / 10\n    </h4>\n    `;\n\n    document.querySelector('.swiper-wrapper').appendChild(div);\n  });\n  initSwiper();\n};\n\n// Initialize Swiper\nfunction initSwiper() {\n  const swiper = new Swiper('.swiper', {\n    slidesPerView: 1,\n    spaceBetween: 40,\n    freeMode: {\n      enabled: true,\n      sticky: true,\n      momentum: true,\n      momentumRatio: 0.5,\n    },\n    loop: true,\n    grabCursor: true,\n    autoplay: {\n      delay: 3000,\n      disableOnInteraction: false,\n      pauseOnMouseEnter: true,\n    },\n    breakpoints: {\n      768: {\n        slidesPerView: 2,\n      },\n      992: {\n        slidesPerView: 3,\n      },\n      1200: {\n        slidesPerView: 4,\n      },\n      1920: {\n        slidesPerView: 5,\n      },\n    },\n  });\n}\n\n// Fetch data from API\nconst fetchData = async endpoint => {\n  const API_KEY = \"e7607410b1bd82e37d467bc556d312c3\";\n  const BASE_URL = 'https://api.themoviedb.org/3/';\n\n  showSpinner();\n\n  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);\n  const data = await response.json();\n\n  hideSpinner();\n  return data;\n};\n\n// Show/hide spinner functions\nconst showSpinner = () => {\n  document.querySelector('.spinner').classList.add('show');\n};\nconst hideSpinner = () => {\n  document.querySelector('.spinner').classList.remove('show');\n};\n\n// Highlight current page in navbar\nconst highlightActiveLink = () => {\n  const links = document.querySelectorAll('.main-header__nav__link');\n  links.forEach(link => {\n    const linkPath = new URL(link.getAttribute('href'), window.location.origin + window.location.pathname).pathname;\n    if (linkPath === window.location.pathname) {\n      link.classList.add('active');\n    }\n  });\n};\n\n// Page router function\nconst router = () => {\n  switch (state.currentPage) {\n    case '/':\n    case '/index.html':\n      displayTrendingMovies();\n      displaySlider();\n      break;\n    case '/shows.html':\n      displayTrendingShows();\n      break;\n    case '/movie-details.html':\n      displayMovieDetails();\n      break;\n    case '/tv-details.html':\n      displayShowDetails();\n      break;\n    case '/search.html':\n      console.log('Search page');\n      break;\n  }\n\n  highlightActiveLink();\n};\n\ndocument.addEventListener('DOMContentLoaded', router);\n\n\n//# sourceURL=webpack://flixify-app/./js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/script.js"]();
/******/ 	
/******/ })()
;