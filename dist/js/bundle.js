(()=>{"use strict";const e=window.location.pathname,t=e=>{const t=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"dist/images/no-image.jpg";return`\n        <div class="card">\n          <a href="movie-details.html?id=${e.id}">\n            <img src="${t}" class="card__img-top" alt="${e.title}" />\n          </a>\n          <div class="card__body">\n            <h5 class="card__body__title">${e.title}</h5>\n            <p class="card__body__text">\n              <small class="text-muted">Release: ${e.release_date}</small>\n            </p>\n          </div>\n        </div>\n      `},a=e=>{const t=e.poster_path?`https://image.tmdb.org/t/p/w500${e.poster_path}`:"dist/images/no-image.jpg";return`\n        <div class="card">\n          <a href="tv-details.html?id=${e.id}">\n            <img src="${t}" class="card__img-top" alt="${e.name}" />\n          </a>\n          <div class="card__body">\n            <h5 class="card__body__title">${e.name}</h5>\n            <p class="card__body__text">\n              <small class="text-muted">Release: ${e.first_air_date}</small>\n            </p>\n          </div>\n        </div>\n      `};function s(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function n(e,t){const a=document.createElement("div");a.classList.add("background-overlay"),a.style.backgroundImage=`url(https://image.tmdb.org/t/p/original${t})`,"movie"===e?document.querySelector("#movie-details").appendChild(a):document.querySelector("#show-details").appendChild(a)}const o=async()=>{const{results:e}=await i("movie/now_playing");e.forEach((e=>{const t=document.createElement("div"),a=`https://image.tmdb.org/t/p/w500${e.poster_path}`;t.classList.add("swiper-slide"),t.innerHTML=`\n    <a href="movie-details.html?id=${e.id}">\n      <img src="${a}" alt="${e.title}" />\n    </a>\n    <h4 class="swiper-rating">\n      <i class="fas fa-star text-secondary"></i> ${e.vote_average} / 10\n    </h4>\n    `,document.querySelector(".swiper-wrapper").appendChild(t)})),new Swiper(".swiper",{slidesPerView:1,spaceBetween:40,freeMode:{enabled:!0,sticky:!0,momentum:!0,momentumRatio:.5},loop:!0,grabCursor:!0,autoplay:{delay:4e3,disableOnInteraction:!1,pauseOnMouseEnter:!0},breakpoints:{768:{slidesPerView:2},992:{slidesPerView:3},1200:{slidesPerView:4},1920:{slidesPerView:5}}})};const i=async e=>{r();const t=await fetch(`https://api.themoviedb.org/3/${e}?api_key=e7607410b1bd82e37d467bc556d312c3&language=en-US`),a=await t.json();return c(),a},r=()=>{document.querySelector(".spinner").classList.add("show")},c=()=>{document.querySelector(".spinner").classList.remove("show")};document.addEventListener("DOMContentLoaded",(()=>{switch(e){case"/":case"/index.html":(async()=>{const{results:e}=await i("trending/movie/day"),a=e.map(t).join("");document.querySelector("#trending-movies").innerHTML=a})(),o();break;case"/shows.html":(async()=>{const{results:e}=await i("trending/tv/day"),t=e.map(a).join("");document.querySelector("#trending-shows").innerHTML=t})();break;case"/movie-details.html":(async()=>{const e=new URLSearchParams(window.location.search).get("id"),t=await i(`movie/${e}`),a=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"dist/images/no-image.jpg";n("movie",t.backdrop_path),document.querySelector("#movie-poster").src=a,document.querySelector("#movie-title").textContent=t.title,document.querySelector("#movie-release-date").textContent=`Release date: ${t.release_date}`,document.querySelector("#movie-rating").innerHTML=`\n  <i class="fas fa-star text-primary"></i>\n  ${t.vote_average.toFixed(1)} / 10\n`,document.querySelector("#movie-overview").textContent=t.overview,document.querySelector("#movie-genres-list").innerHTML=t.genres.map((e=>`<li class="list-group__item">${e.name}</li>`)).join(""),document.querySelector("#movie-homepage").href=t.homepage,document.querySelector("#movie-info-list").innerHTML=`\n    <li><span class="text-secondary">Budget:</span> $${s(t.budget)}</li>\n    <li><span class="text-secondary">Revenue:</span> $${s(t.revenue)}</li>\n    <li><span class="text-secondary">Runtime:</span> ${t.runtime} minutes</li>\n    <li><span class="text-secondary">Status:</span> ${t.status}</li>\n`,document.querySelector("#movie-production-companies").innerHTML=t.production_companies.map((e=>`<span>${e.name}</span>`)).join(", ")})();break;case"/tv-details.html":(async()=>{const e=new URLSearchParams(window.location.search).get("id"),t=await i(`tv/${e}`),a=t.poster_path?`https://image.tmdb.org/t/p/w500${t.poster_path}`:"dist/images/no-image.jpg";n("show",t.backdrop_path),console.log(t),document.querySelector("#show-poster").src=a,document.querySelector("#show-name").textContent=t.name,document.querySelector("#show-first-air-date").textContent=`Release date: ${t.first_air_date}`,document.querySelector("#show-rating").innerHTML=`\n  <i class="fas fa-star text-primary"></i>\n  ${t.vote_average.toFixed(1)} / 10\n`,document.querySelector("#show-overview").textContent=t.overview,document.querySelector("#show-genres-list").innerHTML=t.genres.map((e=>`<li class="list-group__item">${e.name}</li>`)).join(""),document.querySelector("#show-homepage").href=t.homepage,document.querySelector("#show-info-list").innerHTML=`\n    <li><span class="text-secondary">Number Of Seasons:</span> ${t.number_of_seasons}</li>\n    <li><span class="text-secondary">Last Episode To Air:</span> Episode: ${t.last_episode_to_air.episode_number} - ${t.last_episode_to_air.name}</li>\n    <li><span class="text-secondary">Status:</span> ${t.status}</li>\n`,document.querySelector("#show-production-companies").innerHTML=t.production_companies.map((e=>`<span>${e.name}</span>`)).join(", ")})();break;case"/search.html":console.log("Search page")}document.querySelectorAll(".main-header__nav__link").forEach((t=>{t.getAttribute("href")===e&&t.classList.add("active")}))}))})();