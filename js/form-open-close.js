'use strict';
// Загрузка изображения и показ(скрытие) формы редактирования

(function () {
  var uploadCancelElement = window.domQery.imgUploadOverlayElement.querySelector(
      '#upload-cancel'
  );

  var onImgUploadEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      window.closeImgUpload();
    }
  };

  window.closeImgUpload = function () {
    window.domQery.imgUploadOverlayElement.classList.add('hidden');

    document.removeEventListener('keydown', onImgUploadEscPress);

    window.domQery.imageUploadPreviewElement.className = '';
    window.domQery.imageUploadPreviewElement.style.filter = '';
    window.domQery.imageUploadPreviewElement.style.transform = 'scale(1)';
  };

  // Если фокус находится на элементе, нажатие на Esc не должно приводить к закрытию формы
  var forbidCloseFormElementFocus = function (element) {
    element.addEventListener('focus', function () {
      document.removeEventListener('keydown', onImgUploadEscPress);
    });
    element.addEventListener('blur', function () {
      document.addEventListener('keydown', onImgUploadEscPress);
    });
  };

  var openImgUpload = function () {
    window.domQery.imgUploadOverlayElement.classList.remove('hidden');

    window.domQery.effectsRadioElements[0].checked = true;
    window.domQery.scaleCntrolValue.value = '100%';

    // Скрываем слайдер эффектов и устанавливаем на 100%
    window.domQery.effectLevel.classList.add('hidden');
    window.domQery.effectLevelValueElement.value = 100;
    window.domQery.effectLevelPinElement.style.left = '100%';
    window.domQery.effectLevelDepthElement.style.width = '100%';

    document.addEventListener('keydown', onImgUploadEscPress);

    // Если фокус находится в поле ввода комментария или хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
    forbidCloseFormElementFocus(window.domQery.textDescriptionElement);
    forbidCloseFormElementFocus(window.domQery.textHashtagsElement);

    uploadCancelElement.addEventListener('click', function () {
      window.closeImgUpload();
    });
  };

  window.domQery.uploadFileElement.addEventListener('change', function () {
    openImgUpload();
  });
})();
