'use strict';

(function () {
// Константы кнопок
var ESC_KEYCODE = 27;





// РАБОТА С DOM-ДЕРЕВОМ
// ГЕНЕРАЦИЯ МЕТОК
// У блока .map убираем класс .map-faded

var userDialog = document.querySelector('.map');
var pins = userDialog.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
// Находим постоянные для метки
var pinElem = pinTemplate.querySelector('img');
window.MAP_MARKER_WIDTH = pinElem.getAttribute('width') / 2; // Ищем по атрибуту
window.MAP_MARKER_HEIGHT = parseFloat(pinElem.getAttribute('height'));

// Функция, которая убирает скрытость с карты
var showMap = function () {
  document.querySelector('.map').classList.toggle('map--faded', false);
  document.querySelector('.notice__form').classList.toggle('notice__form--disabled', false);
  removeDisabled();
};

var hideMap = function () {
  document.querySelector('.map').classList.toggle('map--faded', true);
  addDisabled();
};

// Делаем поля ввода не активными
var addDisabled = function () {
  var fieldset = document.querySelectorAll('fieldset');
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].setAttribute('disabled', 'disabled');
  }
};
// Заглушка для форм
addDisabled();

// Делаем поля ввода активными
var removeDisabled = function () {
  var fieldset = document.querySelectorAll('fieldset');
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].removeAttribute('disabled');
  }
};

// ________________________________________________________________________________________________________________________________________________________________



var onPinClickhandler = function (evt) {
  var target = evt.currentTarget;
  var offerId = target.getAttribute('data-id');
  window.generateMapCard(window.markers[offerId]);
};


 //Функция отрисовки ОБЪЯЫЛЕНИЯ окна по нажатию на метку

var openPopUp = function () {
  var mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var d = 0; d < mapPin.length; d++) {
    mapPin[d].addEventListener('click', onPinClickhandler);
  }
};

/**
 * Функция закрытия ОБЪЯВЛЕНИЯ окна при клике
 */
window.closePopUp = function () {
  var card = document.querySelector('.map__card');
  if (card) {
    map.removeChild(card);
    document.removeEventListener('keydown', onPopupEscPress);
    map.removeEventListener('keydown', onPopupEscPress);
  }
};
window.onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    window.closePopUp();
  }
};


// ________________________________________________________________________________________________________________________________________________________________



var onEventMouseUp = function (evt) {
  if (evt.target.parentNode.classList.contains('map__pin--main') && document.querySelector('.map').classList.contains('map--faded')) {
    showMap();
    window.generateMapMarkers();
    openPopUp();
   // Заполнение инпута "адрес" при активации карты
    document.querySelector('#address').value = ((getOffsetSum(window.mainPin).left - window.MAP_MARKER_WIDTH / 2) + ', ' + (getOffsetSum(window.mainPin).top - window.MAP_MARKER_HEIGHT));
    document.querySelector('#address').setAttribute('disabled', 'disabled'); // Нельзя редактировать поле адреса

  }
};

window.map = document.querySelector('.map');
window.mainPin = document.querySelector('.map__pin--main');

//map.addEventListener('click', onEventClick);
window.mainPin.addEventListener('mouseup', onEventMouseUp);


// Поиск координат центральной кнопки
function getOffsetSum(elem) {
  var top = 0;
  var left = 0;
  while (elem) {
    top = top + parseFloat(elem.offsetTop);
    left = left + parseFloat(elem.offsetLeft);
    elem = elem.offsetParent;
  }
  return {top: Math.round(top), left: Math.round(left)};
};




})();


