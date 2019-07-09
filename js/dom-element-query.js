'use strict';
// Задает глобально частоиспользуемые DOM-элементы

(function () {
  window.imgUploadOverlayElement = document.querySelector(
      '.img-upload__overlay'
  );

  window.effectLevel = window.imgUploadOverlayElement.querySelector(
      '.effect-level'
  );
  window.effectLevelValueElement = window.effectLevel.querySelector(
      '.effect-level__value'
  );
  window.effectLevelLineElement = window.effectLevel.querySelector(
      '.effect-level__line'
  );
  window.effectLevelPinElement = window.effectLevel.querySelector(
      '.effect-level__pin'
  );
  window.effectLevelDepthElement = window.effectLevel.querySelector(
      '.effect-level__depth'
  );

  window.effectsRadioElements = window.imgUploadOverlayElement.querySelectorAll(
      '.effects__radio'
  );
  window.imgUploadPreviewElement = window.imgUploadOverlayElement.querySelector(
      '.img-upload__preview'
  );
  window.imageUploadPreviewElement =
    window.imgUploadPreviewElement.firstElementChild;
  window.scaleCntrolValue = window.imgUploadOverlayElement.querySelector(
      '.scale__control--value'
  );
  window.picturesContainerElement = document.querySelector('.pictures');
  window.bigPictureElement = document.querySelector('.big-picture');
  window.textHashtagsElement = document.querySelector('.text__hashtags');
})();
