'use strict';
//  2.2.2. Изменение интенсивности эффекта

(function () {
  var MAX_INTENSITY_PHOBOS = 3; // 3px
  var MIN_INTENSITY_HEAT = 1;
  var INTERVAL_INTENSITY_HEAT = 2;

  window.onIntensityEffectChange = function () {
    window.domQery.effectLevelValueElement.value =
      (
        window.domQery.effectLevelPinElement.offsetLeft /
        window.domQery.effectLevelLineElement.clientWidth
      ).toFixed(2) * 100;

    switch (window.domQery.imageUploadPreviewElement.classList[0]) {
      case 'effects__preview--chrome':
        window.domQery.imageUploadPreviewElement.style.filter =
          'grayscale(' +
          window.domQery.effectLevelValueElement.value / 100 +
          ')';
        break;
      case 'effects__preview--sepia':
        window.domQery.imageUploadPreviewElement.style.filter =
          'sepia(' + window.domQery.effectLevelValueElement.value / 100 + ')';
        break;
      case 'effects__preview--marvin':
        window.domQery.imageUploadPreviewElement.style.filter =
          'invert(' + window.domQery.effectLevelValueElement.value + '%)';
        break;
      case 'effects__preview--phobos':
        window.domQery.imageUploadPreviewElement.style.filter =
          'blur(' +
          (window.domQery.effectLevelValueElement.value / 100) *
            MAX_INTENSITY_PHOBOS +
          'px)';
        break;
      case 'effects__preview--heat':
        window.domQery.imageUploadPreviewElement.style.filter =
          'brightness(' +
          (MIN_INTENSITY_HEAT +
            (window.domQery.effectLevelValueElement.value / 100) *
              INTERVAL_INTENSITY_HEAT) +
          ')';
        break;
    }
  };
})();
