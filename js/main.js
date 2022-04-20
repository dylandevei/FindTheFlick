var $getStarted = document.querySelector('.get-started-btn');
var $tvButton = document.querySelector('.tv-btn');
var $movieButton = document.querySelector('.movie-btn');
var $homepage = document.querySelector('.homepage-movies');
var $view = document.querySelectorAll('.view');
var $home = document.querySelector('#home');
var $generatedTV = document.querySelector('.generated-tv-pick');

$home.addEventListener('click', function (event) {
  switchViews('splash-image');
});

$getStarted.addEventListener('click', handleClick);
$tvButton.addEventListener('click', getRandomTopTv);
$movieButton.addEventListener('click', getRandomTopMovie);

function renderHomePage() {
  switchViews('home-page');
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
      $columnHalf.appendChild($img);
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
    var $columnFull = document.createElement('div');
    $columnFull.className = 'column-full tv-pick';
    var $tvInfo = document.createElement('div');
    $tvInfo.className = 'tv-information';
    $columnFull.appendChild($tvInfo);
    var $a = document.createElement('a');
    var $times = document.createElement('i');
    $times.className = 'fas fa-times';
    $a.appendChild($times);
    $tvInfo.appendChild($a);
    var $h1 = document.createElement('h1');
    $h1.className = 'tv-title';
    var $span = document.createElement('span');
    $span.textContent = xhr.response.title;
    $h1.appendChild($span);
    $tvInfo.appendChild($h1);
    var $img = document.createElement('img');
    $img.className = 'tv-poster';
    $img.setAttribute('src', xhr.response.image);
    $tvInfo.appendChild($img);
    var $h3 = document.createElement('h3');
    $h3.className = 'tv-starring';
    $h3.textContent = 'Starring:' + ' ' + xhr.response.stars;
    $tvInfo.appendChild($h3);
    var $p = document.createElement('p');
    $p.className = 'tv-plot';
    $p.textContent = xhr.response.plot;
    $tvInfo.appendChild($p);
    var $pickIcons = document.createElement('div');
    $pickIcons.className = 'pick-icons';
    var $a2 = document.createElement('a');
    var $i2 = document.createElement('i');
    $i2.className = 'fas fa-plus-circle hidden';
    $a2.appendChild($i2);
    var $a3 = document.createElement('a');
    var $i3 = document.createElement('i');
    $i3.className = 'fas fa-redo';
    $a3.appendChild($i3);
    var $a4 = document.createElement('a');
    var $i4 = document.createElement('i');
    $i4.className = 'fas fa-trash hidden';
    $a4.appendChild($i4);
    $pickIcons.append($a2, $a3, $a4);
    $columnFull.appendChild($pickIcons);
    $generatedTV.appendChild($columnFull);
  });
}
