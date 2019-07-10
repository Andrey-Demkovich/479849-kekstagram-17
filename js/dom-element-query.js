'use strict';
// Задает глобально частоиспользуемые DOM-элементы

(function () {
  window.uploadFileElement = document.querySelector('#upload-file');
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
  window.commentsLoaderElement = window.bigPictureElement.querySelector(
      '.comments-loader'
  );
  window.textHashtagsElement = window.imgUploadOverlayElement.querySelector(
      '.text__hashtags'
  );
  window.textDescriptionElement = window.imgUploadOverlayElement.querySelector(
      '.text__description'
  );
})();
