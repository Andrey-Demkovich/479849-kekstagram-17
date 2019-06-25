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

    switch (evt.target.value) {
      case 'none':
        window.imageUploadPreviewElement.style.filter = '';
        window.effectLevel.classList.add('hidden');
        break;
      case 'chrome':
        window.imageUploadPreviewElement.style.filter = 'grayscale(1)';
        break;
      case 'sepia':
        window.imageUploadPreviewElement.style.filter = 'sepia(1)';
        break;
      case 'marvin':
        window.imageUploadPreviewElement.style.filter = 'invert(100%)';
        break;
      case 'phobos':
        window.imageUploadPreviewElement.style.filter = 'blur(3px)';
        break;
      case 'heat':
        window.imageUploadPreviewElement.style.filter = 'brightness(3)';
        break;
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
