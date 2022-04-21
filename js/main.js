var $getStarted = document.querySelector('.get-started-btn');
var $tvButton = document.querySelector('.tv-btn');
var $movieButton = document.querySelector('.movie-btn');
var $homepage = document.querySelector('.homepage-movies');
var $view = document.querySelectorAll('.view');
var $home = document.querySelector('#home');
var $homebtn = document.querySelector('.fa-home');
var $archivebtn = document.querySelector('.fa-archive');
var $exit = document.querySelector('.fa-times');
var $archive = document.querySelector('#archive');
var $add = document.querySelector('.fa-plus-circle');
var $popUp = document.querySelector('.popup');
var $overlay = document.querySelector('.overlay');
var $tvTitle = document.querySelector('.tv-title');
var $tvPoster = document.querySelector('.tv-poster');
var $starring = document.querySelector('.tv-starring');
var $tvPlot = document.querySelector('.tv-plot');
var $ul = document.querySelector('ul');
var $watchlistText = document.querySelector('.watchlist-text');

$getStarted.addEventListener('click', handleClick);
$tvButton.addEventListener('click', getRandomTopTv);
$movieButton.addEventListener('click', getRandomTopMovie);

function renderHomePage() {
  switchViews('home-page');
  $homebtn.className = 'fas fa-home';
  $archivebtn.className = 'fas fa-archive';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/MostPopularMovies/k_93i87hmc');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.items.length; i++) {
      var $columnHalf = document.createElement('div');
      $columnHalf.className = 'column-quarter justify-content-center';
      var $img = document.createElement('img');
      $img.setAttribute('src', xhr.response.items[i].image);
      $img.className = 'movie-posters';
      var $id = document.createElement('p');
      $id.textContent = xhr.response.items[i].id;
      $id.className = 'hidden';
      $id.setAttribute('id', 'idText');
      $columnHalf.appendChild($img);
      $columnHalf.appendChild($id);
      $homepage.appendChild($columnHalf);
    }
  });
  xhr.send();
}

function handleClick(event) {
  var viewName = event.target.getAttribute('data-view');
  switchViews(viewName);
  renderHomePage();
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

function getInformation(item) {
  switchViews('random-pick');
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://imdb-api.com/en/API/Title/k_93i87hmc/' + item);
  xhr.responseType = 'json';
  xhr.send();
  xhr.addEventListener('load', function () {
    $tvTitle.textContent = xhr.response.title;
    $tvPoster.setAttribute('src', xhr.response.image);
    $starring.textContent = 'Starring:' + ' ' + xhr.response.stars;
    $tvPlot.textContent = xhr.response.plot;
  });
}

$add.addEventListener('click', function (event) {
  overlay();
  var entry = null;
  entry = {
    title: $tvTitle.textContent,
    imageUrl: $tvPoster.src,
    actors: $starring.textContent,
    plot: $tvPlot.textContent,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entry);
  $ul.prepend(renderEntry(entry));
  data.editing = null;
});

$exit.addEventListener('click', function (event) {
  switchViews('entries');
  closePopUp();

});

$home.addEventListener('click', function (event) {
  switchViews('home-page');
});

function overlay(event) {
  $overlay.className = 'overlay-on';
  $popUp.className = 'popup-display';
}

function closePopUp(event) {
  $overlay.className = 'overlay';
  $popUp.className = 'popup';
}

$archive.addEventListener('click', function () {
  switchViews('entries');
});

window.addEventListener('DOMContentLoaded', domContentLoaded);

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
    $ul.appendChild(newEntry);
  }
  emptyEntries();
}

function renderEntry(entry) {
  var title = entry.title;
  var url = entry.imageUrl;
  var actors = entry.actors;
  var plot = entry.plot;

  var $li = document.createElement('li');
  var $generatedPick = document.createElement('div');
  var $columnFull = document.createElement('div');
  var $tvInformation = document.createElement('div');
  var $h1 = document.createElement('h1');
  var $tvPoster = document.createElement('img');
  var $h3 = document.createElement('h3');
  var $plot = document.createElement('p');
  var $pickIcons = document.createElement('div');
  var $a = document.createElement('a');
  var $plusCircle = document.createElement('i');
  var $a2 = document.createElement('a');
  var $trashIcon = document.createElement('i');

  $li.className = 'row';
  $generatedPick.className = 'generated-random-pick';
  $columnFull.className = 'column-full tv-pick';
  $tvInformation.className = 'tv-information';
  $h1.className = 'tv-title';
  $h1.textContent = title;
  $tvPoster.className = 'tv-poster';
  $tvPoster.setAttribute('src', url);
  $h3.text = actors;
  $h3.className = 'tv-starring';
  $plot.className = 'tv-plot';
  $plot.textContent = plot;
  $pickIcons.className = 'pick-icons';
  $plusCircle.className = 'fas fa-plus-circle hidden';
  $trashIcon.className = 'fas fa-trash hidden';

  $a.appendChild($plusCircle);
  $a2.appendChild($trashIcon);

  $li.appendChild($generatedPick);
  $generatedPick.appendChild($columnFull);
  $columnFull.appendChild($tvInformation);
  $tvInformation.append($h1, $tvPoster, $h3, $plot);
  $columnFull.appendChild($pickIcons);
  $pickIcons.append($a, $plusCircle);
  $pickIcons.append($a2, $trashIcon);

  return $li;
}

// for (var i = 0; i < data.entries.length; i++) {
//   var object = renderEntry(data.entries[i]);
//   $ul.appendChild(object);
// }
