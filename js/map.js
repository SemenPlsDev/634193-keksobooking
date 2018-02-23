
'use strict';

// Объявляем переменные
var MARKERS_COUNT = 8;
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'bungalo', 'house'];
var TIME = ['12:00', '13:00', '14:00'];
var FEAT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var USERS = [1, 2, 3, 4, 5, 6, 7, 8];

// ________________________________________________________________________________________________________________________________________________________________
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

// ________________________________________________________________________________________________________________________________________________________________
// Функция генерирования обьектов
function generateMarkers() {
  var arrmarkers = [];

  // С помощью цикла сгенерировать в массив 8 объектов
  for (var i = 0; i < MARKERS_COUNT; i++) {

  // Получить случайные значения для Х и Y
    var x = getRandomInt(300, 901);
    var y = getRandomInt(150, 501);

    // Добавить в массив объекты
    arrmarkers.push(
        {
          author: {
            avatar: 'img/avatars/user' + '0' + USERS[i] + '.png',
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
  return arrmarkers;
}
var markers = generateMarkers();

// РАБОТА С DOM-ДЕРЕВОМ
// ГЕНЕРАЦИЯ МЕТОК
// У блока .map убираем класс .map-faded

var userDialog = document.querySelector('.map');
var pins = userDialog.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
// Находим постоянные для метки
var pinElem = pinTemplate.querySelector('img');
var MAP_MARKER_WIDTH = pinElem.getAttribute('width') / 2; // Ищем по атрибуту
var MAP_MARKER_HEIGHT = parseFloat(pinElem.getAttribute('height'));

// Функция, которая убирает скрытость с карты
var showMap = function () {
  document.querySelector('.map').classList.toggle('map--faded', false);
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

// Шаблон функцию для заполнения блока DOM-элементами на основе массива JS-объектов
var createMapMarker = function (marker, index) {

  // Находим нужные элементы через querySelector

  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = marker.location.x - MAP_MARKER_HEIGHT + 'px';
  pinElement.style.top = marker.location.y - MAP_MARKER_WIDTH + 'px';
  pinElement.querySelector('img').src = marker.author.avatar;
  pinElement.dataset.markerIndex = index; // добавляем свойство к эоементу для нахождения ее в делегировании

  document.querySelector('.map').insertBefore(pinElement, document.querySelector('.map__filters-container'));
  // return pinElement;
};

// функцию создания DOM-элемента на основе JS-объекта(с помощью ObjectFragment)
var generateMapMarkers = function () {
  // var fragment = document.createDocumentFragment();
  for (var a = 0; a < markers.length; a++) {
    // fragment.appendChild(createMapMarker(markers[a], a));
    createMapMarker(markers[a], a);
  }
  // return pins.appendChild(fragment);
};


// Функция, которая создает объявление на основе шаблона
var generateMapCard = function (post) {

  var userDialog = document.querySelector('.map');
  // Находим нужные элементы через querySelector
  var pins = userDialog.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  // Находим постоянные для метки
  var pinElem = pinTemplate.querySelector('img');
  var MAP_MARKER_WIDTH = pinElem.getAttribute('width') / 2; // Ищем по атрибуту
  var MAP_MARKER_HEIGHT = parseFloat(pinElem.getAttribute('height'));

  // Находим нужные элементы через querySelector
  var pins = userDialog.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');

  var mapCardElement = mapCardTemplate.cloneNode(true);
  document.querySelector('.map').insertBefore(mapCardElement, document.querySelector('.map__filters-container'));
  mapCardElement.querySelector('h3').textContent = post.offer.title;
  mapCardElement.querySelector('h3 + p > small').textContent = post.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = post.offer.price + ' ₽/ночь';
  mapCardElement.querySelector('h4').textContent = getKey(post.offer.type);
  mapCardElement.querySelector('h4 + p').textContent = post.offer.rooms + ' для ' + post.offer.guests + ' гостей';
  mapCardElement.querySelector('h4 + p + p').textContent = 'Заезд после ' + post.offer.checkin + ' , выезд до ' + post.offer.checkout;
  mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;

  // Вывод картинок для объявления
  var photoTemplate = mapCardElement.querySelector('.popup__pictures');
  for (var i = 0; i < post.offer.photos.length; i++) {
    var photoPromo = photoTemplate.querySelector('li').querySelector('img');
    var photoElement = photoPromo.cloneNode(true);
    photoElement.src = post.offer.photos[i];
    photoElement.style.cssText = 'width:100px; height:100px;';
    photoTemplate.querySelector('li').appendChild(photoElement);
  }

  // Генерируем фичи
  var featureTemplate = mapCardElement.querySelector('.popup__features');
  var childrenFeatures = featureTemplate.querySelectorAll('li');

  // Удаляем всех детей
  for (var k = 0; k < childrenFeatures.length; k++) {
    featureTemplate.removeChild(childrenFeatures[k]);
  }

  // Добавляем новых детей
  for (var j = 0; j < post.offer.features.length; j++) {
    var myFeatures = document.createElement('li');

    featureTemplate.appendChild(myFeatures);
    myFeatures.className = 'feature feature--' + post.offer.features[j];
  }
};


// ________________________________________________________________________________________________________________________________________________________________

var onEventMouseUp = function (evt) {
  if (evt.target.parentNode.classList.contains('map__pin--main') && document.querySelector('.map').classList.contains('map--faded')) {
    showMap();
    generateMapMarkers();

    // Заполнение инпута "адрес" при активации карты
    document.querySelector('#address').value = ((getOffsetSum(mainPin).left - MAP_MARKER_WIDTH / 2) + ', ' + (getOffsetSum(mainPin).top - MAP_MARKER_HEIGHT));
    document.querySelector('#address').setAttribute('disabled', 'disabled'); // Нельзя редактировать поле адреса
  }
};

// Обработчик для активации карты
var onEventClick = function (evt) {
  if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
    var markerIndex = evt.target.dataset.markerIndex;
    generateMapCard(markers[markerIndex]);
  }
};

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var img = document.querySelector('.map__pin');

map.addEventListener('click', onEventClick);
map.addEventListener('mouseup', onEventMouseUp);

// ________________________________________________________________________________________________________________________________________________________________
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
}

// ________________________________________________________________________________________________________________________________________________________________

// Заполнение инпута "адрес" при загрузке страницы
var writeValueAddress = function () {
  document.querySelector('#address').value = ((getOffsetSum(mainPin).left - MAP_MARKER_WIDTH / 2) + ', ' + (getOffsetSum(mainPin).top - MAP_MARKER_HEIGHT / 2));
};
writeValueAddress();

// ________________________________________________________________________________________________________________________________________________________________

// Закрыть карту и удалить пины, объявления
var onExitClick = function () {
  var pinLength = document.querySelectorAll('.map__pin').length;
  for (var i = 1; i < pinLength; i++) {
    document.querySelectorAll('.map__pin')[1].remove();
  }

  var promoLength = document.querySelectorAll('.map__card.popup').length;
  for (var j = 0; j < promoLength; j++) {
    document.querySelectorAll('.map__card.popup')[0].remove();
  }

  var inputLength = document.querySelectorAll('input').length;
  for (var k = 0; k < inputLength; k++) {
    document.querySelectorAll('input')[k].value = '';
  }

  var selectLength = document.querySelectorAll('select').length;
  for (var n = 0; n < selectLength; n++) {
    document.querySelectorAll('select')[n].selectedIndex = 0;
  }
  document.querySelector('#description').value = '';
  hideMap();
};
document.querySelector('.form__reset').addEventListener('click', onExitClick);


// ________________________________________________________________________________________________________________________________________________________________
// Валидация формы
var onTimeSelect = function (evt) {
  var currentValue = evt.target.selectedIndex;
  // Ищет текущее значение исходя из псевдомассива
  document.querySelector('#timein').options[currentValue].selected = true;
  document.querySelector('#timeout').options[currentValue].selected = true;
};

// Проверка, сопоставляет тип жилья и минимальную цену, реагирует на изменение типа жилья
var onTypeTransform = function (evt) {
  var currentValue = evt.target.selectedIndex;
  // Ищет текущее значение исходя из псевдомассива
  var currentApartmentValue = document.querySelector('#type').options[currentValue].value;
  // Прописываем сравнение с переменной currentApartmentValue с атрибутами flat, bungalo, house, palace
  switch (currentApartmentValue) {
    case 'flat':
      document.querySelector('#price').setAttribute('min', '1000');
      break;
    case 'bungalo':
      document.querySelector('#price').setAttribute('min', '0');
      break;
    case 'house':
      document.querySelector('#price').setAttribute('min', '5000');
      break;
    case 'palace':
      document.querySelector('#price').setAttribute('min', '10000');
      break;
  }
};

// Добавляем слушатель события change для следующих атрибутов
document.querySelector('#type').addEventListener('change', onTypeTransform);
document.querySelector('#timein').addEventListener('change', onTimeSelect);
document.querySelector('#timeout').addEventListener('change', onTimeSelect);


// Функция валидации
var validation = function () {
  document.querySelector('#capacity').setCustomValidity('');
  var roomIndex = document.querySelector('#room_number').options.selectedIndex;
  var rooms = document.querySelector('#room_number').options[roomIndex].value;

  var selectIndexCapacity = document.querySelector('#capacity').options.selectedIndex;
  var capacity = document.querySelector('#capacity').options[selectIndexCapacity].value;

  if (rooms === 100 && capacity !== 0) {
    document.querySelector('#capacity').setCustomValidity('Не для гостей');
  } else if (capacity === 0 && rooms !== 100) {
    document.querySelector('#capacity').setCustomValidity('Возможно только для 100 комнат');
  } else if (capacity > rooms) {
    document.querySelector('#capacity').setCustomValidity('Число гостей не должно привышать количество комнат');

  }
  for (var i = 0; i < document.querySelectorAll('input').length; i++) {

    if (document.querySelectorAll('input')[i].checkValidity() === false) {
      document.querySelectorAll('input')[i].style.borderColor = 'red';
    }
  }
  for (var j = 0; j < document.querySelectorAll('select').length; j++) {

    if (document.querySelectorAll('select')[j].checkValidity() === false) {
      document.querySelectorAll('select')[j].style.borderColor = 'red';
    }
  }
};

// Слушаем события клика на элементе с классом form__submit
document.querySelector('.form__submit').addEventListener('click', validation);

