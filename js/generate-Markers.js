'use strict';

(function () {

  var COUNT = 8;
  /**
 * Функция создания DOM-элементов меткок на карте
 */
  window.generateMapMarkers = function () {
    var mapPins = document.querySelector('.map__pins');
    var buttons = document.createDocumentFragment();
    for (var s = 0; s < COUNT; s++) {
      var positionX = window.markers[s].location.x + window.MAP_MARKER_WIDTH / 2;
      var positionY = window.markers[s].location.y + window.MAP_MARKER_HEIGHT / 2;
      var button = document.createElement('button');
      button.setAttribute('data-id', s);
      button.className = 'map__pin';
      button.style = 'left: ' + positionX + 'px; top: ' + positionY + 'px;';
      button.innerHTML = '<img src=' + window.markers[s].author.avatar + ' width="40" height="40" draggable="false">';
      buttons.appendChild(button);
    }

    mapPins.appendChild(buttons);
  };


  // Функция создания PopUp окна с предложением на карте

  window.generateMapCard = function (post) {

    var mapFilters = document.querySelector('.map__filters-container');
    var pinTemplate = document.querySelector('template').content;
    var mapCardTemplate = pinTemplate.querySelector('article');
    var mapCardElement = mapCardTemplate.cloneNode(true);

    mapCardElement.querySelector('.popup__close').addEventListener('click', window.closePopUp);
    mapCardElement.querySelector('h3').textContent = post.offer.title;
    mapCardElement.querySelector('p small').textContent = post.offer.address;
    mapCardElement.querySelector('.popup__price').innerHTML = post.offer.price + ' &#x20bd;' + ' /ночь';
    mapCardElement.querySelector('h4').textContent = window.getKey(post.offer.type);
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
    for (var k = 0; k < post.offer.photos.length; k++) {
      var photoLi = document.createElement('li');
      photoLi.innerHTML = '<img src="' + post.offer.photos[k] + '" width="65" height="65">';
      pictures.appendChild(photoLi);
    }

    window.closePopUp();
    window.map.addEventListener('keydown', window.onPopupEscPress);
    window.map.insertBefore(mapCardElement, mapFilters);
  };

})();
