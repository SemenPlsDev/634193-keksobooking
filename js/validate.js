
'use strict';

(function () {


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
  document.querySelector('#address').value = ((getOffsetSum(window,mainPin).left - window.MAP_MARKER_WIDTH / 2) + ', ' + (getOffsetSum(window.mainPin).top - window.MAP_MARKER_HEIGHT / 2));
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

})();
