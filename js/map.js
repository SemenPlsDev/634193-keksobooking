'use strict';

// Объявляем переменные
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEAT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var USERS = [1, 2, 3, 4, 5, 6, 7, 8];


// Функция генерации случайных данных
var getRandomValue = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};


// Возвращает случайное целое число между min (включительно) и max (не включая max)
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


// функция генерации случайной длины массива
var getRandomLength = function (array) {
  var randomLenght = getRandomInt(1, array.length);
  return array.slice(0, randomLenght);
};


var markers = [];
// Массив из объектов
for (var i = 0; i <= 7; i++) {
  var x = getRandomInt(300, 901);
  var y = getRandomInt(150, 501);

  markers.push(
      {
        author: {
          avatar: 'img/avatars/user' + '0' + getRandomValue(USERS) + '.png',
        },

        offer: {
          title: getRandomValue(TITLE),
          address: x + ' ' + y,
          priсe: getRandomInt(10000, 1000001),
          type: getRandomValue(TYPE),
          rooms: getRandomInt(1, 6),
          guests: getRandomInt(1, 9),
          checkin: getRandomValue(TIME),
          checkout: getRandomValue(TIME),
          features: getRandomLength(FEAT),
          description: '',
          photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
        },

        location: {
          x: x,
          y: y
        }
      });

}


// У блока .map убираем класс .map-faded
var userDialog = document.querySelector('.map');
userDialog.classList.remove('map--faded');


// Находим нужные элементы через querySelect
var pins = userDialog.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');


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

  for (var a = 0; a < markers.length; a++) {
    fragment.appendChild(createMapMarker(markers[a]));
  }
  return pins.appendChild(fragment);
};


// Вызываем функцию отрицовки
generateMapMarkers(markers, pins);


// Create Map Card
var createMapCard = function (post) {
  var mapCardElement = mapCardTemplate.cloneNode(true);

  // Features popup
  var featuresContainer = mapCardElement.querySelector('.popup__features');
  featuresContainer.textContent = '';

  mapCardElement.querySelector('h3').textContent = post.offer.title;
  mapCardElement.querySelector('h3 + p > small').textContent = post.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = post.offer.price + '&#x20bd;/ночь';
  mapCardElement.querySelector('h4').textContent = post.offer.type;
  mapCardElement.querySelector('h4 + p').textContent = post.offer.rooms + ' для ' + post.offer.guests + ' гостей';
  mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;

  for (var j = 0; j < post.offer.features.length; j++) {
    featuresContainer.innerHTML += '<li class="feature feature--' + post.offer.features[i] + '"></li>';
  }
  mapCardElement.querySelector('.popup__features + p').textContent = post.offer.description;
  mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;

  return mapCardElement;
};

// Output Map Card
var outputMapCard = function () {
  var mapCardFragment = document.createDocumentFragment();

  mapCardFragment.appendChild(createMapCard(markers[0]));

  var statement = document.querySelector('.map');

  return statement.insertBefore(mapCardFragment, statement.querySelector('.map__filters-container'));
};

outputMapCard(markers);

/* pinElement.style.left = marker.location.x - MAP_MARKER_HEIGHT + 'px';
pinElement.style.top = marker.location.y - MAP_MARKER_WIDTH / 2 + 'px';*/
