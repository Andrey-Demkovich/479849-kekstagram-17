'use strict';
// Перетаскивание и перемещение по клику ползунка слайдера эффектов, и реакция эфекта на это

(function () {
  // Drag-end-drop
  window.domQery.effectLevelPinElement.addEventListener('mousedown', function (
      evt
  ) {
    evt.preventDefault();

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(
          'mousemove',
          window.sliderMouseMove.onMouseMove
      );
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', window.sliderMouseMove.onMouseMove);
    document.addEventListener(
        'mousemove',
        window.effectsIntensity.onIntensityEffectChange
    );

    document.addEventListener('mouseup', onMouseUp);
  });

  // Изменение положения ползунка и интенсивности эффекта по клику на слайдер
  window.domQery.effectLevel.addEventListener(
      'click',
      window.sliderMouseMove.onMouseMove
  );
  window.domQery.effectLevel.addEventListener(
      'click',
      window.effectsIntensity.onIntensityEffectChange
  );
})();
