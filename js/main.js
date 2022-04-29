var $getStarted = document.querySelector('.get-started-btn');
var $tvButton = document.querySelector('.tv-btn');
var $movieButton = document.querySelector('.movie-btn');
var $theaterButton = document.querySelector('.theater-btn');
var $confirmButton = document.querySelector('.confirm-btn');
var $homepage = document.querySelector('.homepage-movies');
var $theaterpage = document.querySelector('.theater-movies');
var $entrypage = document.querySelector('.entry-movies');
var $view = document.querySelectorAll('.view');
var $home = document.querySelector('#home');
var $homebtn = document.querySelector('.fa-home');
var $archivebtn = document.querySelector('.fa-archive');
var $exit = document.querySelector('.fa-times');
var $archive = document.querySelector('#archive');
var $add = document.querySelector('.fa-plus-circle');
var $delete = document.querySelector('.fa-trash');
var $deleteX = document.querySelector('#delete');
var $popUp = document.querySelector('.popup');
var $deletePopUp = document.querySelector('.delete-popup');
var $overlay = document.querySelector('.overlay');
var $resultTitle = document.querySelector('.result-title');
var $resultPoster = document.querySelector('.result-poster');
var $resultStarring = document.querySelector('.result-starring');
var $resultID = document.querySelector('.result-id');
var $resultPlot = document.querySelector('.result-plot');
var $watchlistText = document.querySelector('.watchlist-text');
var $loading = document.querySelector('.lds-spinner');

function handleClick(event) {
  var viewName = event.target.getAttribute('data-view');
  switchViews(viewName);
  renderHomePage();
  getTheaters();
}

function switchViews(viewName) {
  for (var viewIndex = 0; viewIndex < $view.length; viewIndex++) {
    if ($view[viewIndex].getAttribute('data-view') === viewName) {
      $view[viewIndex].className = 'view';
    } else {
      $view[viewIndex].className = 'view hidden';
    }
  }
}

function renderEntry(entry) {
  var url = entry.imageUrl;
  var movieId = entry.movieId;

  var $div = document.createElement('div');
  $div.setAttribute('data-entry-id', entry.entryId);
  $div.className = 'column-full justify-content-center';
  var $img = document.createElement('img');
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
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/Title/k_93i87hmc/' + item);
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {

    $resultTitle.textContent = xhr.response.title;
    $resultPoster.setAttribute('src', xhr.response.image);
    $resultStarring.textContent = xhr.response.stars;
    $resultPlot.textContent = xhr.response.plot;
    $resultID.textContent = xhr.response.id;
    $loading.className = 'lds-spinner hidden';
  });
}

function editClick(event) {
  if (event.target.tagName === 'IMG') {
    var closestDiv = event.target.closest('div');
    var dataID = closestDiv.getAttribute('data-entry-id');
    data.editing = parseInt(dataID);
  }
}

function deleteEntry(event) {
  $deletePopUp.className = 'hidden';
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing === data.entries[i].entryId) {
      data.entries.splice(i, 1);
    }
  }
  var $div = document.querySelectorAll('div');
  for (var j = 0; j < $div.length; j++) {
    var parseAttribute = parseInt($div[j].getAttribute('data-entry-id'));
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

function renderHomePage() {
  switchViews('home-page');
  $homebtn.className = 'fas fa-home';
  $archivebtn.className = 'fas fa-archive';
  $loading.className = 'lds-spinner';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/MostPopularMovies/k_93i87hmc');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.items.length; i++) {
      $loading.className = 'lds-spinner hidden';
      var $columnHalf = document.createElement('div');
      $columnHalf.className = 'column-half justify-content-center';
      var $img = document.createElement('img');
      $img.setAttribute('src', xhr.response.items[i].image);
      $img.className = 'movie-posters';
      var $id = document.createElement('p');
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
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/MostPopularTVs/k_93i87hmc');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    var randomIndex = Math.floor(Math.random() * xhr.response.items.length);
    var item = xhr.response.items[randomIndex].id;
    getInformation(item);
  }
  );
}

function getRandomTopMovie() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/MostPopularMovies/k_93i87hmc');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {

    var randomIndex = Math.floor(Math.random() * xhr.response.items.length);
    var item = xhr.response.items[randomIndex].id;
    getInformation(item);
  }
  );
}

function getTheaters() {
  $loading.className = 'lds-spinner';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/InTheaters/k_93i87hmc');
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    $loading.className = 'lds-spinner hidden';
    for (var i = 0; i < xhr.response.items.length; i++) {
      var $columnHalf = document.createElement('div');
      $columnHalf.className = 'column-third justify-content-center';
      var $img = document.createElement('img');
      $img.setAttribute('src', xhr.response.items[i].image);
      $img.className = 'movie-posters';
      var $id = document.createElement('p');
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

function emptyEntries() {
  if (data.entries.length === 0) {
    $watchlistText.setAttribute('class', 'noto text-align watchlist-text');
  } else {
    $watchlistText.setAttribute('class', 'hidden');
  }
}

function domContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var newEntry = renderEntry(data.entries[i]);
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
  var entry = null;
  entry = {
    title: $resultTitle.textContent,
    imageUrl: $resultPoster.src,
    actors: $resultStarring.textContent,
    plot: $resultPlot.textContent,
    movieId: $resultID.textContent,
    entryId: data.nextEntryId
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
  $loading.className = 'hidden';
});

$theaterButton.addEventListener('click', function () {
  switchViews('theaters-page');
  $loading.className = 'lds-spinner';
});

$homepage.addEventListener('click', function (event) {
  var homepageID = event.target.getAttribute('id');
  getInformation(homepageID);
});

$entrypage.addEventListener('click', function (event) {
  var entryId = event.target.getAttribute('id');
  getInformation(entryId);
  $add.className = 'hidden';
  $delete.className = 'fas fa-trash';
});

$theaterpage.addEventListener('click', function (event) {
  var theaterID = event.target.getAttribute('id');
  getInformation(theaterID);
});
