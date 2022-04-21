/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousTodosJSON = localStorage.getItem('javascript-local-storage');
if (previousTodosJSON !== null) {
  data = JSON.parse(previousTodosJSON);
}

window.addEventListener('beforeunload', unloadWindow);

function unloadWindow(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
}
