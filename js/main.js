const $getStarted = document.querySelector('.get-started-btn');
const $tvButton = document.querySelector('.tv-btn');
const $movieButton = document.querySelector('.movie-btn');
const $theaterButton = document.querySelector('.theater-btn');
const $confirmButton = document.querySelector('.confirm-btn');
const $homepage = document.querySelector('.homepage-movies');
const $searchpage = document.querySelector('.search-movies');
const $theaterpage = document.querySelector('.theater-movies');
const $entrypage = document.querySelector('.entry-movies');
const $view = document.querySelectorAll('.view');
const $home = document.querySelector('#home');
const $search = document.querySelector('#search');
const $homebtn = document.querySelector('.fa-home');
const $archivebtn = document.querySelector('.fa-archive');
const $exit = document.querySelector('.fa-times');
const $searchBar = document.querySelector('#search-form');
const $archive = document.querySelector('#archive');
const $add = document.querySelector('.fa-plus-circle');
const $redo = document.querySelector('.fa-sync-alt');
const $delete = document.querySelector('.fa-trash');
const $deleteX = document.querySelector('#delete');
const $popUp = document.querySelector('.popup');
const $deletePopUp = document.querySelector('.delete-popup');
const $overlay = document.querySelector('.overlay');
const $resultTitle = document.querySelector('.result-title');
const $resultRating = document.querySelector('.result-rating');
const $resultPoster = document.querySelector('.result-poster');
const $resultStarring = document.querySelector('.result-starring');
const $resultID = document.querySelector('.result-id');
const $resultType = document.querySelector('.result-type');
const $resultPlot = document.querySelector('.result-plot');
const $resultGenres = document.querySelector('.result-genres');
const $watchlistText = document.querySelector('.watchlist-text');
const $loading = document.querySelector('.lds-spinner');
const $error = document.querySelector('.error-msg');
const $splash = document.querySelector('.nav-text');
const $searchText = document.querySelector('.search-text');

function handleClick(event) {
  const viewName = event.target.getAttribute('data-view');
  switchViews(viewName);
  renderHomePage();
}

function switchViews(viewName) {
  for (let viewIndex = 0; viewIndex < $view.length; viewIndex++) {
    if ($view[viewIndex].getAttribute('data-view') === viewName) {
      $view[viewIndex].className = 'view';
    } else {
      $view[viewIndex].className = 'view hidden';
    }
  }
}

function renderEntry(entry) {
  const url = entry.imageUrl;
  const movieId = entry.movieId;
  const $div = document.createElement('div');
  $div.setAttribute('data-entry-id', entry.entryId);
  $div.className = 'column-half justify-content-center';
  const $img = document.createElement('img');
  $img.setAttribute('src', url);
  $loading.className = 'hidden';
  $img.className = 'movie-posters';
  $img.setAttribute('id', movieId);
  $div.appendChild($img);
  return $div;

}

function getInformation(item) {
  $delete.className = 'hidden';
  switchViews('random-pick');
  $loading.className = 'lds-spinner';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/Title/k_93i87hmc/' + item);
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    $loading.className = ' hidden';
    $resultTitle.textContent = xhr.response.fullTitle;
    $resultPoster.setAttribute('src', xhr.response.image);
    $resultStarring.textContent = `Starring: ${xhr.response.stars}`;
    $resultPlot.textContent = xhr.response.plot;
    $resultGenres.textContent = `Genre: ${xhr.response.genres}`;
    $resultID.textContent = xhr.response.id;
    $resultType.textContent = xhr.response.type;
    $resultRating.textContent = `IMDB Rating: ${xhr.response.imDbRating}`;
  });
}

function editClick(event) {
  if (event.target.tagName === 'IMG') {
    const closestDiv = event.target.closest('div');
    const dataID = closestDiv.getAttribute('data-entry-id');
    data.editing = parseInt(dataID);
  }
}

function deleteEntry(event) {
  $deletePopUp.className = 'hidden';
  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing === data.entries[i].entryId) {
      data.entries.splice(i, 1);
    }
  }
  const $div = document.querySelectorAll('div');
  for (let j = 0; j < $div.length; j++) {
    const parseAttribute = parseInt($div[j].getAttribute('data-entry-id'));
    if (data.editing === parseAttribute) {
      $div[j].remove();
    }
  }

  switchViews('entries');
  emptyEntries();
  $overlay.className = 'overlay';
  $popUp.className = 'popup';
  data.editing = null;
}

$searchBar.addEventListener('submit', event => {
  event.preventDefault();
  removeSearchResults();
  let title = null;
  title = $searchBar.elements.title.value;
  $loading.className = 'lds-spinner';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/Search/k_93i87hmc/' + title);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.response.results.length === 0) {
      $searchText.textContent = 'No Results Found, Try Again';
    }
    for (let i = 0; i < xhr.response.results.length; i++) {
      $searchText.textContent = 'Results for' + ' ' + title;
      $loading.className = 'lds-spinner hidden';
      $error.className = 'hidden';
      const $columnHalf = document.createElement('div');
      $columnHalf.className = 'column-half justify-content-center';
      const $img = document.createElement('img');
      $img.setAttribute('src', xhr.response.results[i].image);
      $img.className = 'movie-posters';
      const $id = document.createElement('p');
      $id.textContent = xhr.response.results[i].id;
      $id.className = 'hidden';
      $id.setAttribute('id', 'idText');
      $img.setAttribute('id', $id.textContent);
      $columnHalf.appendChild($img);
      $columnHalf.appendChild($id);
      $searchpage.appendChild($columnHalf);

    }
  });
  xhr.send();
});

function removeSearchResults() {
  const $posters = document.querySelectorAll('.movie-posters');
  for (let i = 0; i < $posters.length; i++) {
    $posters[i].remove();
    $searchBar.reset();
    $searchText.textContent = '';

  }
}

function renderHomePage() {
  switchViews('home-page');
  $homebtn.className = 'fas fa-home';
  $archivebtn.className = 'fas fa-archive';
  $search.className = 'fas fa-search';
  $loading.className = 'lds-spinner';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/MostPopularMovies/k_93i87hmc');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.items.length; i++) {
      $loading.className = 'lds-spinner hidden';
      $error.className = 'hidden';
      const $columnHalf = document.createElement('div');
      $columnHalf.className = 'column-half justify-content-center';
      const $img = document.createElement('img');
      $img.setAttribute('src', xhr.response.items[i].image);
      $img.className = 'movie-posters';
      const $id = document.createElement('p');
      $id.textContent = xhr.response.items[i].id;
      $id.className = 'hidden';
      $id.setAttribute('id', 'idText');
      $img.setAttribute('id', $id.textContent);
      $columnHalf.appendChild($img);
      $columnHalf.appendChild($id);
      $homepage.appendChild($columnHalf);
    }
  });

  xhr.send();

}

function getRandomTopTv() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/MostPopularTVs/k_93i87hmc');
  xhr.responseType = 'json';
  xhr.addEventListener('error', function () {
    $error.setAttribute = 'error-msg';
  });
  xhr.send();
  xhr.addEventListener('load', function () {
    const randomIndex = Math.floor(Math.random() * xhr.response.items.length);
    const item = xhr.response.items[randomIndex].id;
    getInformation(item);
  }
  );
}

function getRandomTopMovie() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/MostPopularMovies/k_93i87hmc');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    $loading.className = ' hidden';
    const randomIndex = Math.floor(Math.random() * xhr.response.items.length);
    const item = xhr.response.items[randomIndex].id;
    getInformation(item);
  }
  );
}

function getTheaters() {
  $error.className = 'hidden';
  $loading.className = 'lds-spinner';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/InTheaters/k_93i87hmc');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    $loading.className = 'lds-spinner hidden';
    for (let i = 0; i < xhr.response.items.length; i++) {
      $error.className = 'hidden';
      const $columnHalf = document.createElement('div');
      $columnHalf.className = 'column-half justify-content-center';
      const $img = document.createElement('img');
      $img.setAttribute('src', xhr.response.items[i].image);
      $img.className = 'movie-posters';
      const $id = document.createElement('p');
      $id.textContent = xhr.response.items[i].id;
      $id.className = 'hidden';
      $id.setAttribute('id', 'idText');
      $img.setAttribute('id', $id.textContent);
      $columnHalf.appendChild($img);
      $columnHalf.appendChild($id);
      $theaterpage.appendChild($columnHalf);
    }
  });
}

function openPopup(event) {
  $overlay.className = 'overlay-on';
  $popUp.className = 'popup-display';
}

function closePopUp(event) {
  $overlay.className = 'overlay';
  $popUp.className = 'popup';
}

function openDeletePopup(event) {
  $overlay.className = 'overlay-on';
  $deletePopUp.className = 'delete-popup-display';
}

function closeDelete(event) {
  $overlay.className = 'overlay';
  $deletePopUp.className = 'delete-popup';
}

$archive.addEventListener('click', function () {
  switchViews('entries');
});

$splash.addEventListener('click', () => {
  switchViews('splash-image');
});

function emptyEntries() {
  if (data.entries.length === 0) {
    $watchlistText.setAttribute('class', 'noto text-align watchlist-text');
  } else {
    $watchlistText.setAttribute('class', 'hidden');
  }
}

function domContentLoaded(event) {
  for (let i = 0; i < data.entries.length; i++) {
    const newEntry = renderEntry(data.entries[i]);
    $entrypage.appendChild(newEntry);
  }
  emptyEntries();
}

$getStarted.addEventListener('click', handleClick);
$tvButton.addEventListener('click', getRandomTopTv);
$movieButton.addEventListener('click', getRandomTopMovie);
$entrypage.addEventListener('click', editClick);
$confirmButton.addEventListener('click', deleteEntry);
window.addEventListener('DOMContentLoaded', domContentLoaded);

$add.addEventListener('click', function (event) {
  openPopup();
  event.preventDefault();
  let entry = null;
  entry = {
    title: $resultTitle.textContent,
    imageUrl: $resultPoster.src,
    actors: $resultStarring.textContent,
    plot: $resultPlot.textContent,
    movieId: $resultID.textContent,
    entryId: data.nextEntryId,
    rating: $resultRating.textContent,
    genres: $resultGenres.textContent,
    type: $resultType.textContent
  };
  data.nextEntryId++;
  data.entries.unshift(entry);
  $entrypage.prepend(renderEntry(entry));
  data.editing = null;
  switchViews('entries');
  $watchlistText.className = 'hidden';
});

$delete.addEventListener('click', function (event) {
  openDeletePopup();
});

$exit.addEventListener('click', function (event) {
  switchViews('entries');
  closePopUp();
});
$deleteX.addEventListener('click', function (event) {
  closeDelete();
});

$home.addEventListener('click', function (event) {
  switchViews('home-page');
  $add.className = 'fas fa-plus-circle';
  $redo.className = 'fas fa-sync-alt';
  $loading.className = 'hidden';
});

$search.addEventListener('click', function (event) {
  switchViews('search-results');
  removeSearchResults();
});

$theaterButton.addEventListener('click', function () {
  getTheaters();
  switchViews('theaters-page');
  $loading.className = 'lds-spinner';
});

$homepage.addEventListener('click', function (event) {
  const homepageID = event.target.getAttribute('id');
  getInformation(homepageID);
});

$searchpage.addEventListener('click', function (event) {
  const homepageID = event.target.getAttribute('id');
  getInformation(homepageID);
});

$entrypage.addEventListener('click', function (event) {
  const closestPoster = event.target.closest('IMG');
  const entryId = closestPoster.getAttribute('id');
  getInformation(entryId);
  $add.className = 'hidden';
  $redo.className = 'hidden';
  $delete.className = 'fas fa-trash';
});

$theaterpage.addEventListener('click', function (event) {
  const theaterID = event.target.getAttribute('id');
  getInformation(theaterID);
});

$redo.addEventListener('click', event => {
  const type = $resultType.textContent;
  if (type === 'Movie') {
    getRandomTopMovie();
  } else if (type === 'TVSeries') {
    getRandomTopTv();
  }
});
