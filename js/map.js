
(function () {

  var ESC_KEYCODE = 27;
  var MAIN_BUTTON_WIDTH = 65;
  var MAIN_BUTTON_HEIGHT = 87;
  var LIMIT_FOR_BOTTOM = 500;
  var LIMIT_FOR_TOP = 150;
  var MAIN_BUTTON_WIDTH = 65;
  var MAIN_BUTTON_HEIGHT = 87;
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinElem = pinTemplate.querySelector('img');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  window.MAP_MARKER_WIDTH = pinElem.getAttribute('width') / 2; // Ищем по атрибуту
  window.MAP_MARKER_HEIGHT = parseFloat(pinElem.getAttribute('height'));


  // Функция, которая убирает скрытость с карты
  var showMap = function () {
    document.querySelector('.map').classList.toggle('map--faded', false);
    document.querySelector('.notice__form').classList.toggle('notice__form--disabled', false);
    removeDisabled();
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


  // Функция отрисовки ОБЪЯЫЛЕНИЯ окна по нажатию на метку
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
      document.removeEventListener('keydown', window.onPopupEscPress);
      map.removeEventListener('keydown', window.onPopupEscPress);
    }
  };
  window.onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.closePopUp();
    }
  };


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
  // MD- mouse down
  var mainPinMDHandler = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // MM - mouse move
    var mainPinMMHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var mainPinY = mainPin.offsetTop + MAIN_BUTTON_HEIGHT;
      var mainPinX = mainPin.offsetLeft + MAIN_BUTTON_WIDTH / 2;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mainPinX - shift.x <= map.offsetWidth) && (mainPinX - shift.x >= mainPin.offsetWidth)) {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      if ((mainPinY - shift.y <= LIMIT_FOR_BOTTOM) && (mainPinY - shift.y >= LIMIT_FOR_TOP)) {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      setAddress();
      document.removeEventListener('mousemove', mainPinMMHandler);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', mainPinMMHandler);
    document.addEventListener('mouseup', onMouseUp);
  };
  var noticeForm = document.querySelector('.notice__form');


  /**
 * Функция получения координат главной метки
 * @return {number} координаты x, y
 */
  var getMainPinCoordinates = function () {
    var x = window.mainPin.offsetLeft - MAIN_BUTTON_WIDTH / 2;
    var y = window.mainPin.offsetTop + MAIN_BUTTON_HEIGHT;

    return x + ', ' + y;
  };

  /**
 * Функция добавления координат главной точки в поле адрес
 */
  var setAddress = function () {
    noticeForm.querySelector('#address').value = getMainPinCoordinates();
  };

  window.mainPin.addEventListener('mousedown', mainPinMDHandler);
  window.mainPin.addEventListener('mouseup', onEventMouseUp);


})();


