'use strict';
//  2.2.2. Изменение интенсивности эффекта

(function () {
  window.changeIntensityEffect = function () {
    window.effectLevelValueElement.value =
      (
        window.effectLevelPinElement.offsetLeft /
        window.effectLevelLineElement.clientWidth
      ).toFixed(2) * 100;

    if (
      window.imageUploadPreviewElement.classList[0] ===
      'effects__preview--chrome'
    ) {
      window.imageUploadPreviewElement.style.filter =
        'grayscale(' + window.effectLevelValueElement.value / 100 + ')';
    } else if (
      window.imageUploadPreviewElement.classList[0] ===
      'effects__preview--sepia'
    ) {
      window.imageUploadPreviewElement.style.filter =
        'sepia(' + window.effectLevelValueElement.value / 100 + ')';
    } else if (
      window.imageUploadPreviewElement.classList[0] ===
      'effects__preview--marvin'
    ) {
      window.imageUploadPreviewElement.style.filter =
        'invert(' + window.effectLevelValueElement.value + '%)';
    } else if (
      window.imageUploadPreviewElement.classList[0] ===
      'effects__preview--phobos'
    ) {
      window.imageUploadPreviewElement.style.filter =
        'blur(' + (window.effectLevelValueElement.value / 100) * 3 + 'px)';
    } else if (
      window.imageUploadPreviewElement.classList[0] === 'effects__preview--heat'
    ) {
      window.imageUploadPreviewElement.style.filter =
        'brightness(' + (window.effectLevelValueElement.value / 100) * 3 + ')';
    }
  };
})();
