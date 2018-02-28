'use strict';

(function () {
// Объявляем переменные
var MARKERS_COUNT = 8;
var TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPE = ['flat', 'bungalo', 'house'];
var TIME = ['12:00', '13:00', '14:00'];
var FEAT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var USERS = [1, 2, 3, 4, 5, 6, 7, 8];



// ________________________________________________________________________________________________________________________________________________________________
// Функция генерирования обьектов
function generateMarkers() {
  var arrmarkers = [];

  // С помощью цикла сгенерировать в массив 8 объектов
  for (var i = 0; i < MARKERS_COUNT; i++) {

  // Получить случайные значения для Х и Y
    var x =window.getRandomInt(300, 901);
    var y = window.getRandomInt(150, 501);

    // Добавить в массив объекты
    arrmarkers.push(
        {
          author: {
            avatar: 'img/avatars/user' + '0' + USERS[i] + '.png',
          },

          offer: {
            title: window.getRandomValue(TITLE),
            address: x + ' ' + y,
            price: window.getRandomInt(10000, 1000001),
            type: window.getRandomValue(TYPE),
            rooms: window.getRandomInt(1, 6),
            guests: window.getRandomInt(1, 9),
            checkin: window.getRandomValue(TIME),
            checkout: window.getRandomValue(TIME),
            features: window.getRandomLength(FEAT),
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
window.markers = generateMarkers();


})();
