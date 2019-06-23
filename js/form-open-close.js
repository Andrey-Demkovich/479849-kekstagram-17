'use strict';
// Загрузка изображения и показ(скрытие) формы редактирования

(function () {
  var ESK_KEYCODE = 27;

  var uploadFileElement = document.querySelector('#upload-file');

  var uploadCancelElement = window.imgUploadOverlayElement.querySelector(
      '#upload-cancel'
  );
  var textDescriptionElement = window.imgUploadOverlayElement.querySelector(
      '.text__description'
  );

  var onImgUploadEscPress = function (evt) {
    if (evt.keyCode === ESK_KEYCODE) {
      closeImgUpload();
    }
  };

  var closeImgUpload = function () {
    window.imgUploadOverlayElement.classList.add('hidden');

    document.removeEventListener('keydown', onImgUploadEscPress);

    window.imageUploadPreviewElement.className = '';
    window.imageUploadPreviewElement.style.filter = '';
    window.imageUploadPreviewElement.style.transform = 'scale(1)';
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
    //   2.4. Комментарий:
    //   - если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
    textDescriptionElement.addEventListener('focus', function () {
      document.removeEventListener('keydown', onImgUploadEscPress);
    });
    textDescriptionElement.addEventListener('blur', function () {
      document.addEventListener('keydown', onImgUploadEscPress);
    });

    uploadCancelElement.addEventListener('click', function () {
      closeImgUpload();
    });
  };

  uploadFileElement.addEventListener('change', function () {
    openImgUpload();
  });
})();
