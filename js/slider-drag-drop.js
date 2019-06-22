'use strict';
// Перетаскивание слайдера эффектов

(function () {
  window.effectLevelPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;

      var pinElementLeft = window.effectLevelPinElement.offsetLeft - shiftX;

      var lineElementLeft = window.effectLevelLineElement.getBoundingClientRect()
        .left;
      var lineElementRight = window.effectLevelLineElement.getBoundingClientRect()
        .right;
      if (startCoordsX <= lineElementLeft) {
        pinElementLeft = 0;
      } else if (startCoordsX >= lineElementRight) {
        pinElementLeft = window.effectLevelLineElement.clientWidth;
      }

      window.effectLevelPinElement.style.left = pinElementLeft + 'px';
      window.effectLevelDepthElement.style.width = pinElementLeft + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousemove', window.changeIntensityEffect);

    document.addEventListener('mouseup', onMouseUp);
  });

  // Изменение положения и интенсивности эффекта по клику на слайдер
  window.effectLevel.addEventListener('click', function (clickEvt) {
    var coordsX = clickEvt.clientX;
    var lineElementLeft = window.effectLevelLineElement.getBoundingClientRect()
      .left;
    var lineElementRight = window.effectLevelLineElement.getBoundingClientRect()
      .right;

    var elementLeft = coordsX - lineElementLeft;

    if (coordsX <= lineElementLeft) {
      elementLeft = 0;
    } else if (coordsX >= lineElementRight) {
      elementLeft = window.effectLevelLineElement.clientWidth;
    }

    window.effectLevelPinElement.style.left = elementLeft + 'px';
    window.effectLevelDepthElement.style.width = elementLeft + 'px';
  });

  window.effectLevel.addEventListener('click', window.changeIntensityEffect);
})();
