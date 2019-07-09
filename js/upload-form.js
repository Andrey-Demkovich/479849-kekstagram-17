'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var imgUploadForm = document.querySelector('.img-upload__form');
  var mainElement = document.querySelector('main');

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };

  var resetImgUpload = function () {
    window.textHashtagsElement.value = '';
    window.textDescriptionElement.value = '';
    window.uploadFileElement.value = '';
  };

  var openDialog = function (dialogSelector) {
    var successTemplate = document
      .querySelector('#' + dialogSelector)
      .content.querySelector('.' + dialogSelector);
    var successTemplateClone = successTemplate.cloneNode(true);

    mainElement.appendChild(successTemplateClone);
  };

  var closeDialog = function (dialogSelector) {
    var dialogElement = mainElement.querySelector('.' + dialogSelector);
    var dialogButtonElements = dialogElement.querySelectorAll(
        '.' + dialogSelector + '__button'
    );

    var dialogElementRemove = function () {
      dialogElement.remove();
      document.removeEventListener('keydown', onElementEscPress);
    };

    var onElementEscPress = function (evt) {
      window.onElementEscPress(evt, dialogElementRemove);
    };

    var dialogRemove = function (evt) {
      if (!evt.target.closest('.' + dialogSelector + '__inner')) {
        dialogElementRemove();
      }
    };

    document.addEventListener('keydown', onElementEscPress);
    dialogElement.addEventListener('click', dialogRemove);
    dialogButtonElements.forEach(function (item) {
      item.addEventListener('click', dialogElementRemove);
    });
  };

  var onSucces = function () {
    window.closeImgUpload();
    resetImgUpload();
    openDialog('success');
    closeDialog('success');
  };

  var onError = function () {
    window.closeImgUpload();
    resetImgUpload();
    openDialog('error');
    closeDialog('error');
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(imgUploadForm), onSucces);
  });
})();
