'use strict';

// Константы кнопок
var ESC_KEYCODE = 27;
var COUNT = 8;


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

/**
 * Функция создания DOM-элементов меткок на карте
 */
var generateMapMarkers = function () {
  var mapPins = document.querySelector('.map__pins');
  var buttons = document.createDocumentFragment();
  for (var s = 0; s < COUNT; s++) {
    var positionX = markers[s].location.x + MAP_MARKER_WIDTH / 2;
    var positionY = markers[s].location.y + MAP_MARKER_HEIGHT / 2;
    var button = document.createElement('button');
    button.setAttribute('data-id', s);
    button.className = 'map__pin';
    button.style = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
    button.innerHTML = '<img src=' + markers[s].author.avatar + ' width="40" height="40" draggable="false">';
    buttons.appendChild(button);
  }

  mapPins.appendChild(buttons);
};


// Функция создания PopUp окна с предложением на карте

var generateMapCard = function (post) {

  var mapFilters = document.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('template').content;
  var mapCardTemplate = pinTemplate.querySelector('article');
  var mapCardElement = mapCardTemplate.cloneNode(true);

  mapCardElement.querySelector('.popup__close').addEventListener('click', closePopUp);
  mapCardElement.querySelector('h3').textContent = post.offer.title;
  mapCardElement.querySelector('p small').textContent = post.offer.address;
  mapCardElement.querySelector('.popup__price').innerHTML = post.offer.price + ' &#x20bd;' + ' /ночь';
  mapCardElement.querySelector('h4').textContent = getKey(post.offer.type);
  mapCardElement.querySelectorAll('h4 + p').textContent = post.offer.rooms + ' комнаты для ' + post.offer.guests + ' гостей';
  mapCardElement.querySelectorAll('p + p').textContent = 'Заезд после ' + post.offer.checkin + ', выезд до ' + post.offer.checkout;
  mapCardElement.querySelectorAll('p')[4].textContent = post.description;
  mapCardElement.querySelector('.popup__avatar').src = post.author.avatar;
  var features = mapCardElement.querySelector('.popup__features');
  features.innerHTML = '';

  for (var i = 0; i < post.offer.features.length; i++) {
    var featureLi = document.createElement('li');
    featureLi.className = 'feature feature--' + post.offer.features[i];
    features.appendChild(featureLi);
  }
  var pictures = mapCardElement.querySelector('.popup__pictures');
  for (var i = 0; i < post.offer.photos.length; i++) {
    var photoLi = document.createElement('li');
    photoLi.innerHTML = '<img src="' + post.offer.photos[i] + '" width="65" height="65">';
    pictures.appendChild(photoLi);
  }

  closePopUp();
  map.addEventListener('keydown', onPopupEscPress);
  map.insertBefore(mapCardElement, mapFilters);
};


var onPinClickhandler = function (evt) {
  var target = evt.currentTarget;
  var offerId = target.getAttribute('data-id');
  generateMapCard(markers[offerId]);
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
var closePopUp = function () {
  var card = document.querySelector('.map__card');
  if (card) {
    map.removeChild(card);
    document.removeEventListener('keydown', onPopupEscPress);
    map.removeEventListener('keydown', onPopupEscPress);
  }
};
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopUp();
  }
};


// ________________________________________________________________________________________________________________________________________________________________



var onEventMouseUp = function (evt) {
  if (evt.target.parentNode.classList.contains('map__pin--main') && document.querySelector('.map').classList.contains('map--faded')) {
    showMap();
    generateMapMarkers();
    openPopUp();
   // Заполнение инпута "адрес" при активации карты
    document.querySelector('#address').value = ((getOffsetSum(mainPin).left - MAP_MARKER_WIDTH / 2) + ', ' + (getOffsetSum(mainPin).top - MAP_MARKER_HEIGHT));
    document.querySelector('#address').setAttribute('disabled', 'disabled'); // Нельзя редактировать поле адреса

  }
};

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');

//map.addEventListener('click', onEventClick);
mainPin.addEventListener('mouseup', onEventMouseUp);



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
