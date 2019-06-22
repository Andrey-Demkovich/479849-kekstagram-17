'use strict';
//  2.2.1. Смена эффекта

(function () {
  var changeEffectsPreview = function (evt) {
    window.imageUploadPreviewElement.className = '';
    if (evt.target.value !== 'none') {
      window.effectLevel.classList.remove('hidden');
      window.imageUploadPreviewElement.classList.add(
          'effects__preview--' + evt.target.value
      );
    }

    if (evt.target.value === 'none') {
      window.imageUploadPreviewElement.style.filter = '';
      window.effectLevel.classList.add('hidden');
    } else if (evt.target.value === 'chrome') {
      window.imageUploadPreviewElement.style.filter = 'grayscale(1)';
    } else if (evt.target.value === 'sepia') {
      window.imageUploadPreviewElement.style.filter = 'sepia(1)';
    } else if (evt.target.value === 'marvin') {
      window.imageUploadPreviewElement.style.filter = 'invert(100%)';
    } else if (evt.target.value === 'phobos') {
      window.imageUploadPreviewElement.style.filter = 'blur(3px)';
    } else if (evt.target.value === 'heat') {
      window.imageUploadPreviewElement.style.filter = 'brightness(3)';
    }

    // При смене эффекта устаналиваем ползунок слайдера на 100%
    window.effectLevelPinElement.style.left = '100%';
    window.effectLevelDepthElement.style.width = '100%';
  };

  window.effectsRadioElements.forEach(function (item) {
    item.addEventListener('change', function (evt) {
      changeEffectsPreview(evt);
    });
  });
})();
