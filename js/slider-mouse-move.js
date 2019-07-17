'use strict';
// Перетаскивание слайдера эффектов

(function () {
  window.sliderMouseMove = {
    // Перемещаем ползунок слайдера (для перетаскивания или клика)
    onMouseMove: function (moveEvt) {
      moveEvt.preventDefault();

      var startCoordsX =
        window.domQery.effectLevelPinElement.getBoundingClientRect().left +
        window.domQery.effectLevelPinElement.offsetWidth / 2;

      var shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;

      var pinElementLeft =
        window.domQery.effectLevelPinElement.offsetLeft - shiftX;

      var lineElementLeft = window.domQery.effectLevelLineElement.getBoundingClientRect()
        .left;
      var lineElementRight = window.domQery.effectLevelLineElement.getBoundingClientRect()
        .right;
      if (startCoordsX <= lineElementLeft) {
        pinElementLeft = 0;
      } else if (startCoordsX >= lineElementRight) {
        pinElementLeft = window.domQery.effectLevelLineElement.clientWidth;
      }

      window.domQery.effectLevelPinElement.style.left = pinElementLeft + 'px';
      window.domQery.effectLevelDepthElement.style.width =
        pinElementLeft + 'px';
    }
  };
})();
