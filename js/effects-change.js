'use strict';
//  2.2.1. Смена эффекта

(function () {
  var changeEffectsPreview = function (evt) {
    window.domQery.imageUploadPreviewElement.className = '';
    if (evt.target.value !== 'none') {
      window.domQery.effectLevel.classList.remove('hidden');
      window.domQery.imageUploadPreviewElement.classList.add(
          'effects__preview--' + evt.target.value
      );
    }

    switch (evt.target.value) {
      case 'none':
        window.domQery.imageUploadPreviewElement.style.filter = '';
        window.domQery.effectLevel.classList.add('hidden');
        break;
      case 'chrome':
        window.domQery.imageUploadPreviewElement.style.filter = 'grayscale(1)';
        break;
      case 'sepia':
        window.domQery.imageUploadPreviewElement.style.filter = 'sepia(1)';
        break;
      case 'marvin':
        window.domQery.imageUploadPreviewElement.style.filter = 'invert(100%)';
        break;
      case 'phobos':
        window.domQery.imageUploadPreviewElement.style.filter = 'blur(3px)';
        break;
      case 'heat':
        window.domQery.imageUploadPreviewElement.style.filter = 'brightness(3)';
        break;
    }

    // При смене эффекта устаналиваем ползунок слайдера на 100%
    window.domQery.effectLevelPinElement.style.left = '100%';
    window.domQery.effectLevelDepthElement.style.width = '100%';
  };

  window.domQery.effectsRadioElements.forEach(function (item) {
    item.addEventListener('change', function (evt) {
      changeEffectsPreview(evt);
    });
  });
})();
