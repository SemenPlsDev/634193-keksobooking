
'use strict';

// Объявляем переменные
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'bungalo', 'house'];
var TIME = ['12:00', '13:00', '14:00'];
var FEAT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var USERS = [1, 2, 3, 4, 5, 6, 7, 8];


// ФУНЦИИ
// Функция генерации случайных данных
var getRandomValue = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

  // Функция возвращает случайное целое число между min (включительно) и max (не включая max)
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

  // функция генерации случайной длины массива
var getRandomLength = function (array) {
  var randomLenght = getRandomInt(1, array.length);
  return array.slice(0, randomLenght);
};

  // Частная функция которая присвоет случайному значению массива TYPE определение
var getKey = function (key) {
  if (key === 'flat') {
    key = 'Квартира';
  }
  if (key === 'bungalo') {
    key = 'Бунгало';
  }
  if (key === 'house') {
    key = 'Дом';
  }
  return key;
};


// ОБЪЯВЛЯЕМ МАССИВ
var markers = [];

// С помощью цикла сгенерировать в массив 8 объектов
for (var i = 0; i <= 7; i++) {

  // Получить случайные значения для Х и Y
  var x = getRandomInt(300, 901);
  var y = getRandomInt(150, 501);

  // Добавить в массив объекты
  markers.push(
      {
        author: {
          avatar: 'img/avatars/user' + '0' + USERS[0 + i] + '.png',
        },

        offer: {
          title: getRandomValue(TITLE),
          address: x + ' ' + y,
          price: getRandomInt(10000, 1000001),
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


// РАБОТА С DOM-ДЕРЕВОМ
// ГЕНЕРАЦИЯ МЕТОК
// У блока .map убираем класс .map-faded
var userDialog = document.querySelector('.map');

// Находим нужные элементы через querySelector
var pins = userDialog.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

// Находим постоянные для метки
var pinElem = pinTemplate.querySelector('img');
var MAP_MARKER_WIDTH = pinElem.getAttribute('width') / 2; // Ищем по атрибуту
var MAP_MARKER_HEIGHT = parseFloat(pinElem.getAttribute('height'));

// Шаблон функцию для заполнения блока DOM-элементами на основе массива JS-объектов
var createMapMarker = function (marker, index) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = marker.location.x - MAP_MARKER_HEIGHT + 'px';
  pinElement.style.top = marker.location.y - MAP_MARKER_WIDTH + 'px';
  pinElement.querySelector('img').src = marker.author.avatar;
  pinElement.dataset.markerIndex = index; // добавляем свойство к эоементу для нахождения ее в делегировании
  return pinElement;
};

// функцию создания DOM-элемента на основе JS-объекта(с помощью ObjectFragment)
var generateMapMarkers = function () {
  var fragment = document.createDocumentFragment();
  for (var a = 0; a < markers.length; a++) {
    fragment.appendChild(createMapMarker(markers[a], a));
  }
  return pins.appendChild(fragment);
};



// БЛАНК ОБЪЯВЛЕНИЯ
// Шаблон функцию для заполнения блока DOM-элементами на основе массива JS-объектов
var createMapCard = function (post) {
  var mapCardElement = mapCardTemplate.cloneNode(true);
  // Features popup
  var featuresContainer = mapCardElement.querySelector('.popup__features');
  featuresContainer.textContent = '';
  mapCardElement.querySelector('h3').textContent = post.offer.title;
  mapCardElement.querySelector('h3 + p > small').textContent = post.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = post.offer.price + ' ₽/ночь';
  mapCardElement.querySelector('h4').textContent = getKey(post.offer.type);
  mapCardElement.querySelector('h4 + p').textContent = post.offer.rooms + ' для ' + post.offer.guests + ' гостей';
  mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;
  for (var j = 0; j < post.offer.features.length; j++) {
    featuresContainer.innerHTML += '<li class="feature feature--' + post.offer.features[j] + '"></li>';
  }
  mapCardElement.querySelector('.popup__features + p').textContent = post.offer.description;
  mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;

  return mapCardElement;
};

// функцию создания DOM-элемента на основе JS-объекта(с помощью ObjectFragment)
var outputMapCard = function (name) {
  var mapCardFragment = document.createDocumentFragment();
  mapCardFragment.appendChild(createMapCard(name)); //Отрицует обьявление исходя из индекса массива(объекта объявления)
  var statement = document.querySelector('.map');
  return statement.insertBefore(mapCardFragment, statement.querySelector('.map__filters-container'));
};



// Функция для обработичка события
var onEventMouseUp = function () {
  userDialog.classList.remove('map--faded');
  generateMapMarkers();

  // Заполнение адреса формы
  document.querySelector('#address').value = (MAP_MARKER_WIDTH + ', ' + MAP_MARKER_HEIGHT);
  document.querySelector('#address').setAttribute('disabled', 'disabled'); // Запрет редактирования поля формы
};

// Функция для обработичка события
var onEventClick = function (evt) {
  if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
    var markerIndex = evt.target.dataset.markerIndex;
    outputMapCard(markers[markerIndex]);
  }
};

// Добавляем слушателей события
userDialog.addEventListener('mouseup', onEventMouseUp);
userDialog.addEventListener('click',  onEventClick);
