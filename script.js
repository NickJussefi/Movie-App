// Set a variable to know at which page we are

const globalState = window.location.pathname;


// Fetch the data from TMDB API


// Highlight the logo of which page we surf at

const moviesShowsLink = document.querySelectorAll('.nav-link');
function highlightAction () {
    moviesShowsLink.forEach((link) => {
        
        if(globalState === link.getAttribute('href')) {
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


function searchtype (e) {
    e.preventDefault();
    
    
    
}
    
    
async function showMoviesAndShows() {

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const searched = document.getElementById('search-term');
    const searchedTerm = searched.value;
    const movies = await fetchApiData('movie/popular');
    const shows = await fetchApiData('tv/popular');

    radioButtons.forEach((button) => {
        if(button.id === "movie") {
  
            console.log(searchedTerm);
            const searchedMovies = movies.filter((movie) => {
                movie.title.includes(searchedTerm);
                console.log(movie.title.includes(searchedTerm));
            })
        
            searchedMovies.forEach((searchedMovie) => {
                
                console.log(searchedMovie);
                
                const searchDiv = document.createElement('div');
                searchDiv.innerHTML = `
                <div class="card">
                <a href="movie-details.html?${searchedMovie.id}">
                ${searchedMovie.poster_path ?
                    `<img
                    src="https://image.tmdb.org/t/p/w500${searchedMovie.poster_path}"
                    class="card-img-top"
                    alt="${searchedMovie.title}"/>` : 
                    `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="Movie Title"
                    />
                    `
            }
                </a>
                <div class="card-body">
                    <h5 class="card-title">${searchedMovie.title}</h5>
                    <p class="card-text">
                    <small class="text-muted">Release: ${searchedMovie.release_date}</small>
                    </p>
                </div>
                </div>
                `;
                document.querySelector('#search-results').appendChild(searchDiv);
            } )
        }

        else{
            showshows();
        }
    })



} 

async function showshows(){

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


function showSpinner () {
    spinner = document.querySelector(".spinner");
    spinner.classList.add("show")
}

function hideSpinner () {
    spinner = document.querySelector(".spinner");
    spinner.classList.remove("show");
}


// Router

switch (globalState) {
    case '/':
    case '/index.html':
        displayMovies();
        displaySwiper();
        showMoviesAndShows();
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
        showMoviesAndShows();
        break;
}