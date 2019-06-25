'use strict';
// Перетаскивание слайдера эффектов

(function () {
  // Перемещаем ползунок слайдера (для перетаскивания или клика)
  window.onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var startCoordsX =
      window.effectLevelPinElement.getBoundingClientRect().left +
      window.effectLevelPinElement.offsetWidth / 2;

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
})();
