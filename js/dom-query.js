'use strict';
// Задает глобально частоиспользуемые DOM-элементы

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
  var effectLevel = imgUploadOverlayElement.querySelector('.effect-level');
  var imgUploadPreviewElement = imgUploadOverlayElement.querySelector(
      '.img-upload__preview'
  );

  window.domQery = {
    uploadFileElement: document.querySelector('#upload-file'),
    imgUploadOverlayElement: imgUploadOverlayElement,
    effectLevel: effectLevel,
    effectLevelValueElement: effectLevel.querySelector('.effect-level__value'),
    effectLevelLineElement: effectLevel.querySelector('.effect-level__line'),
    effectLevelPinElement: effectLevel.querySelector('.effect-level__pin'),
    effectLevelDepthElement: effectLevel.querySelector('.effect-level__depth'),
    effectsRadioElements: imgUploadOverlayElement.querySelectorAll(
        '.effects__radio'
    ),
    imageUploadPreviewElement: imgUploadPreviewElement.firstElementChild,
    scaleCntrolValue: imgUploadOverlayElement.querySelector(
        '.scale__control--value'
    ),
    picturesContainerElement: document.querySelector('.pictures'),
    bigPictureElement: bigPictureElement,
    commentsLoaderElement: bigPictureElement.querySelector('.comments-loader'),
    textHashtagsElement: imgUploadOverlayElement.querySelector(
        '.text__hashtags'
    ),
    textDescriptionElement: imgUploadOverlayElement.querySelector(
        '.text__description'
    )
  };
})();
