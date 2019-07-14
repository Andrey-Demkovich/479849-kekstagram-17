'use strict';
//  2.2.2. Изменение интенсивности эффекта

(function () {
  var MAX_INTENSITY_PHOBOS = 3; // 3px
  var MIN_INTENSITY_HEAT = 1;
  var INTERVAL_INTENSITY_HEAT = 2;

  window.changeIntensityEffect = function () {
    window.effectLevelValueElement.value =
      (
        window.effectLevelPinElement.offsetLeft /
        window.effectLevelLineElement.clientWidth
      ).toFixed(2) * 100;

    switch (window.imageUploadPreviewElement.classList[0]) {
      case 'effects__preview--chrome':
        window.imageUploadPreviewElement.style.filter =
          'grayscale(' + window.effectLevelValueElement.value / 100 + ')';
        break;
      case 'effects__preview--sepia':
        window.imageUploadPreviewElement.style.filter =
          'sepia(' + window.effectLevelValueElement.value / 100 + ')';
        break;
      case 'effects__preview--marvin':
        window.imageUploadPreviewElement.style.filter =
          'invert(' + window.effectLevelValueElement.value + '%)';
        break;
      case 'effects__preview--phobos':
        window.imageUploadPreviewElement.style.filter =
          'blur(' +
          (window.effectLevelValueElement.value / 100) * MAX_INTENSITY_PHOBOS +
          'px)';
        break;
      case 'effects__preview--heat':
        window.imageUploadPreviewElement.style.filter =
          'brightness(' +
          (MIN_INTENSITY_HEAT +
            (window.effectLevelValueElement.value / 100) *
              INTERVAL_INTENSITY_HEAT) +
          ')';
        break;
    }
  };
})();
