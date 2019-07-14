'use strict';
// Загрузка изображения и показ(скрытие) формы редактирования

(function () {
  var uploadCancelElement = window.imgUploadOverlayElement.querySelector(
      '#upload-cancel'
  );

  var onImgUploadEscPress = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      window.closeImgUpload();
    }
  };

  window.closeImgUpload = function () {
    window.imgUploadOverlayElement.classList.add('hidden');

    document.removeEventListener('keydown', onImgUploadEscPress);

    window.imageUploadPreviewElement.className = '';
    window.imageUploadPreviewElement.style.filter = '';
    window.imageUploadPreviewElement.style.transform = 'scale(1)';
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
    window.imgUploadOverlayElement.classList.remove('hidden');

    window.effectsRadioElements[0].checked = true;
    window.scaleCntrolValue.value = '100%';

    // Скрываем слайдер эффектов и устанавливаем на 100%
    window.effectLevel.classList.add('hidden');
    window.effectLevelValueElement.value = 100;
    window.effectLevelPinElement.style.left = '100%';
    window.effectLevelDepthElement.style.width = '100%';

    document.addEventListener('keydown', onImgUploadEscPress);

    // Если фокус находится в поле ввода комментария или хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
    forbidCloseFormElementFocus(window.textDescriptionElement);
    forbidCloseFormElementFocus(window.textHashtagsElement);

    uploadCancelElement.addEventListener('click', function () {
      window.closeImgUpload();
    });
  };

  window.uploadFileElement.addEventListener('change', function () {
    openImgUpload();
  });
})();
