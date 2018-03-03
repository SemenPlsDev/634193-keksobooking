'use strict';

(function () {
// ФУНЦИИ
// Функция генерации случайных данных
  window.getRandomValue = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  // Функция возвращает случайное целое число между min (включительно) и max (не включая max)
  window.getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  // функция генерации случайной длины массива
  window.getRandomLength = function (array) {
    var randomLenght = window.getRandomInt(1, array.length);
    return array.slice(0, randomLenght);
  };

  // Частная функция которая присвоет случайному значению массива TYPE определение
  window.getKey = function (key) {
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

})();
