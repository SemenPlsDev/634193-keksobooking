'use strict';

// Объявляем переменные
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEAT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var USERS = ['01', '02', '03', '04', '05', '06', '07', '08'];


// Функция генерации случайных данных
var getRandomValue = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};


// Возвращает случайное целое число между min (включительно) и max (не включая max)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var markers = [{}];
// Массив из объектов
for (var i = 0; i <= 7; i++){
markers[i] =
  {
    author: {
      avatar: 'img/avatars/user' + getRandomValue(USERS) + '.png',
    },

    offer: {
      title: getRandomValue(TITLE),
      address: 'location.x, location.y',
      priсe: getRandomInt(1000, 1000001),
      type: getRandomValue(TYPE),
      rooms: getRandomInt(1, 6),
      guests: getRandomInt(1, 9),
      checkin: getRandomValue(TIME),
      checkout: getRandomValue(TIME),
      features: getRandomValue(FEAT),
      description: '',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },

    location: {
      x: getRandomInt(300, 901),
      y: getRandomInt(150, 501)
    }
  }

};


// У блока .map убираем класс .map-faded
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');


// Находим нужные элементы через querySelect
var Pins = userDialog.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card popup');


// Функи=ция создания DOM-элементов
var createMapMarker = function (marker) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = marker.location.x + 'px';
  pinElement.style.top = marker.location.y + 'px';
  pinElement.querySelector('img').src = marker.author.avatar;

  return pinElement;
};


// Функция генерации DOM-элементов
var generateMapMarkers = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < markers.length; i++) {
    fragment.appendChild(createMapMarker(markers[i]));
  }
  return Pins.appendChild(fragment);
};


// Вызываем функцию отрицовки
generateMapMarkers(markers, Pins);


// Create Map Card
var createMapCard = function (post) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  // Features popup
  var featuresContainer = mapCardElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';

  mapCardElement.querySelector('h3').textContent = post.offer.title;
  mapCardElement.querySelector('h3 + p > small').textContent = post.offer.address;
  mapCardElement.querySelector('.popup__price').innerHTML = post.offer.price + '&#x20bd;/ночь';
  mapCardElement.querySelector('h4').textContent = post.offer.type;
  mapCardElement.querySelector('h4 + p').textContent = post.offer.rooms + ' для ' + post.offer.guests + ' гостей';
  mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;

  for (var i = 0; i < post.offer.features.length; i++) {
    featuresContainer.innerHTML += '<li class="feature feature--' + post.offer.features[i] + '"></li>';
  }
  mapCardElement.querySelector('.popup__features + p').textContent = post.offer.description;
  mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;

  return mapCardElement;
};

// Output Map Card
var outputMapCard = function () {
  var mapCardFragment = document.createDocumentFragment();
  for (var i = 0; i < markers.length; i++) {
    mapCardFragment.appendChild(createMapCard(markers[i]));
  }
  var eto = document.querySelector('.map');

  return eto.insertBefore(mapCardFragment, eto.querySelector('.map__filters-container'));
};

outputMapCard(markers);

/* pinElement.style.left = marker.location.x - MAP_MARKER_HEIGHT + 'px';
pinElement.style.top = marker.location.y - MAP_MARKER_WIDTH / 2 + 'px';*/
