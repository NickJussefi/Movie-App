// Set a variable to know at which page we are

const global = {
    currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
}


// Fetch the data from TMDB API


// Highlight the logo of which page we surf at

const moviesShowsLink = document.querySelectorAll('.nav-link');
function highlightAction () {
    moviesShowsLink.forEach((link) => {
        
        if(global.currentPage === link.getAttribute('href')) {
            link.style.color = "#FFFF66";
            link.style.fontWeight = "700";
        }
    })
}

highlightAction();

// Set up the popular movies page

async function fetchApiData (endpoint) {
    showSpinner();
    apiKey = '93a02209f529ec1f825e904cc4900210';
    apiUrl = 'https://api.themoviedb.org/3/';
    
    const res = await fetch(`${apiUrl}${endpoint}?api_key=${apiKey}&language=en-US`);
    const data = await res.json();
    hideSpinner();
    
    return data.results;
}

async function displayMovies() {
    const movies = await fetchApiData('movie/popular');
    movies.forEach(( movie ) => {
        
        const div = document.createElement('div');
        div.innerHTML = `<div class="card">
        <a href="movie-details.html?${movie.id}">
        ${movie.poster_path ?
            `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"/>` : 
            `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
            />
            `
        }
        </a>
        <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
        </div>
        </div>
        `;
        document.querySelector('#popular-movies').appendChild(div);
        
    })
}

async function displayShows() {
    const shows = await fetchApiData('tv/popular');
    shows.forEach(( show ) => {
        
        const div = document.createElement('div');
        div.innerHTML = `<div class="card">
        <a href="tv-details.html?${show.id}">
        ${show.poster_path ?
            `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"/>` : 
            `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
            />
            `
        }
        </a>
        <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
        <small class="text-muted">Release: ${show.first_air_date}</small>
        </p>
        </div>
        </div>
        `;
        document.querySelector('#popular-shows').appendChild(div);
        
    })
}


async function moviesDetailes () {
    
    movieId = document.location.search.split('?')[1];
    
    
    const movies = await fetchApiData(`movie/popular`);
    movies.forEach((movie) => {
        if (movie.id == movieId) {
            console.log(movie);
            const div = document.createElement('div');
            div.innerHTML = `<div class="details-top">
            <div>
            ${movie.poster_path ?
                `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="${movie.title}"
                />` :
                `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${movie.title}"
                />`
            }
            </div>
            <div>
            <h2>${movie.title}</h2>
            <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toFixed(1)} / 10    ${movie.vote_count} votes
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
            ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genre_ids.map((genre_id) => 
                `<li>${genre_id}</li>`
                ).join('')
            }
            </ul>
            <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
            </div>
            <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
            <li><span class="text-secondary">Age Range: </span> ${!movie.adult ?
                `Children and Adult` : 
                `Adult`}</li>
                
                <li><span class="text-secondary">Original language: </span> ${movie.original_language}</li>
                </ul>
                </div>`
                document.querySelector('#movie-details').appendChild(div);
                
                backgroundPicture("movie", movie.backdrop_path)
                
            }
        })
}




async function showsDetailes () {
    
    showId = document.location.search.split('?')[1];
    
    
    const shows = await fetchApiData(`tv/popular`);
    
    shows.forEach((show) => {
        console.log(`${showId} : ${show.id}`);
        if (show.id == showId) {
            console.log(show);
            const div = document.createElement('div');
            div.innerHTML = `<div class="details-top">
            <div>
            ${show.poster_path ?
                `<img
                src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                class="card-img-top"
                alt="${show.name}"
                />` :
                `<img
                src="images/no-image.jpg"
                class="card-img-top"
                alt="${show.name}"
                />`
            }
            </div>
            <div>
            <h2>${show.name}</h2>
            <p>
            <i class="fas fa-star text-primary"></i>
            ${show.vote_average}/10 : ${show.vote_count} votes
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
            ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${show.genre_ids.map((genre_id) => 
                `<li>${genre_id}</li>`).join("")}
                </ul>
                <a href="#" target="_blank" class="btn">Visit Show Homepage</a>
                </div>
                </div>`
                document.querySelector('#show-details').appendChild(div);
                
                
                backgroundPicture('show', show.backdrop_path)
            }
        })
}

async function backgroundPicture(type, picPath) {
    const ovarlayDiv = document.createElement('div');
    ovarlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${picPath})`;
    
    ovarlayDiv.style.backgroundSize = 'cover';
    ovarlayDiv.style.backgroundPosition = 'center';
    ovarlayDiv.style.backgroundRepeat = 'no-repeat';
    ovarlayDiv.style.height = '100vh';
    ovarlayDiv.style.width = '100vw';
    ovarlayDiv.style.position = 'absolute';
    ovarlayDiv.style.top = '0';
    ovarlayDiv.style.left = '0';
    ovarlayDiv.style.zIndex = '-1';
    ovarlayDiv.style.opacity = '0.1';
    
    if (type = 'movie') {
        document.querySelector('#movie-details').appendChild(ovarlayDiv);
    }
    else{
        document.querySelector('#show-details').appendChild(ovarlayDiv);
    }
}

async function initSwiper () {
    const swiper = new Swiper('.swiper', {
        speed: 400,
        spaceBetween: 100
    });
    swiper.slideNext();
}


async function displaySwiper(){
    const movies = await fetchApiData('movie/now_playing');
    movies.forEach((movie) => {

        const swiperDiv = document.createElement('div');
        swiperDiv.classList.add('swiper-slide');

        swiperDiv.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
                <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
            </h4>
            `;
            document.querySelector('.swiper-wrapper').appendChild(swiperDiv)
            initSwiper();
    })
}

function displaySearchResults(results) {
    // Clear previous results
    document.querySelector('#search-results').innerHTML = '';
    document.querySelector('#search-results-heading').innerHTML = '';
    document.querySelector('#pagination').innerHTML = '';
  
    results.forEach((result) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
            <a href="${global.search.type}-details.html?id=${result.id}">
              ${
                result.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                class="card-img-top"
                alt="${
                  global.search.type === 'movie' ? result.title : result.name
                }"
              />`
                  : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
               alt="${
                 global.search.type === 'movie' ? result.title : result.name
               }"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${
                global.search.type === 'movie' ? result.title : result.name
              }</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${
                  global.search.type === 'movie'
                    ? result.release_date
                    : result.first_air_date
                }</small>
              </p>
            </div>
          `;
  
      document.querySelector('#search-results-heading').innerHTML = `
                <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>
      `;
  
      document.querySelector('#search-results').appendChild(div);
    });
  
    displayPagination();
  }

  function displayPagination() {
    const div = document.createElement('div');
    div.classList.add('pagination');
    div.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
    `;
  
    document.querySelector('#pagination').appendChild(div);
  
    // Disable prev button if on first page
    if (global.search.page === 1) {
      document.querySelector('#prev').disabled = true;
    }
  
    // Disable next button if on last page
    if (global.search.page === global.search.totalPages) {
      document.querySelector('#next').disabled = true;
    }
  
    // Next page
    document.querySelector('#next').addEventListener('click', async () => {
      global.search.page++;
      const { results, total_pages } = await searchAPIData();
      displaySearchResults(results);
    });
  
    // Prev page
    document.querySelector('#prev').addEventListener('click', async () => {
      global.search.page--;
      const { results, total_pages } = await searchAPIData();
      displaySearchResults(results);
    });
  }

// Search Movies/Shows
async function search() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
  
    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term');
  
    if (global.search.term !== '' && global.search.term !== null) {
      const { results, total_pages, page, total_results } = await searchAPIData();
  
      global.search.page = page;
      global.search.totalPages = total_pages;
      global.search.totalResults = total_results;
  
      if (results.length === 0) {
        showAlert('No results found');
        return;
      }
  
      displaySearchResults(results);
  
      document.querySelector('#search-term').value = '';
    } else {
      showAlert('Please enter a search term');
    }
  }

  async function searchAPIData() {
    const API_KEY = '93a02209f529ec1f825e904cc4900210';
    const API_URL = "https://api.themoviedb.org/3/";
  
    showSpinner();
  
    const response = await fetch(
      `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
    );
  
    const data = await response.json();
    console.log(data);
  
    hideSpinner();
  
    return data;
  }
    
    
// async function showMoviesAndShows() {

//     const radioButtons = document.querySelectorAll('input[type="radio"]');
//     const searched = document.getElementById('search-term');
//     const searchedTerm = searched.value;
//     const movies = await fetchApiData('movie/popular');
//     const shows = await fetchApiData('tv/popular');
    
//     radioButtons.forEach((button) => {
//         if(button.id === "movie") {
  
//             console.log(searchedTerm);
//             const searchedMovies = movies.filter((movie) => {
//                 movie.title.includes(searchedTerm);
//                 console.log(movie.title.includes(searchedTerm));
//             })
            
//             searchedMovies.forEach((searchedMovie) => {
                
//                 console.log(searchedMovie);
                
//                 const searchDiv = document.createElement('div');
//                 searchDiv.innerHTML = `
//                 <div class="card">
//                 <a href="movie-details.html?${searchedMovie.id}">
//                 ${searchedMovie.poster_path ?
//                     `<img
//                     src="https://image.tmdb.org/t/p/w500${searchedMovie.poster_path}"
//                     class="card-img-top"
//                     alt="${searchedMovie.title}"/>` : 
//                     `<img
//                     src="images/no-image.jpg"
//                     class="card-img-top"
//                     alt="Movie Title"
//                     />
//                     `
//             }
//             </a>
//             <div class="card-body">
//             <h5 class="card-title">${searchedMovie.title}</h5>
//                     <p class="card-text">
//                     <small class="text-muted">Release: ${searchedMovie.release_date}</small>
//                     </p>
//                 </div>
//                 </div>
//                 `;
//                 document.querySelector('#search-results').appendChild(searchDiv);
//             } )
//         }

//         else{
//             showshows();
//         }
//     })



// } 

async function showshows(){

}




function showSpinner () {
    spinner = document.querySelector(".spinner");
    spinner.classList.add("show")
}

function hideSpinner () {
    spinner = document.querySelector(".spinner");
    spinner.classList.remove("show");
}


// Router

switch (global.currentPage) {
    case '/':
    case '/index.html':
        displayMovies();
        displaySwiper();
        // showMoviesAndShows();
        break;
    case '/shows.html':
        displayShows();
        break;
    case '/movie-details.html':
        moviesDetailes();
        break;
    case '/tv-details.html':
        showsDetailes();
    case '/search.html':
        search();
        break;
}