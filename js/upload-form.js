'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var imgUploadForm = document.querySelector('.img-upload__form');
  var mainElement = document.querySelector('main');

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          console.log(100);
          console.log(xhr.status);
          console.log(xhr.statusText);

          onSuccess();
          break;

        case 400:
          window.onError('Не верный запрос');
          break;
        case 401:
          window.onError('Пользователь не авторизован');
          break;
        case 404:
          window.onError('Данных не найдено');
          break;

        case 500:
          window.onError('Ошибка сервера');
          break;

        default:
          window.onError(
              'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText
          );
      }
    });

    xhr.addEventListener('error', function () {
      error('Произошла ошибка соединения');
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

  var closeSuccesDialog = function () {
    var successElement = mainElement.querySelector('.success');
    var successButtonElement = successElement.querySelector('.success__button');
    var successInnerElement = successElement.querySelector('.success__inner');

    var successElementRemove = function () {
      successElement.remove();
      document.removeEventListener('keydown', onElementEscPress);
    };

    var onElementEscPress = function (evt) {
      window.onElementEscPress(evt, successElementRemove);
    };

    document.addEventListener('keydown', onElementEscPress);
    successButtonElement.addEventListener('click', successElementRemove);
    successElement.addEventListener('click', function (evt) {
      if (!evt.target.closest('.success__inner')) {
        successElementRemove();
      }
    });
  };

  var onSucces = function () {
    window.closeImgUpload();
    resetImgUpload();
    openDialog('success');
    closeSuccesDialog();
  };

  var error = function () {
    window.closeImgUpload();
    openDialog('error');
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    console.log(1);
    window.upload(new FormData(imgUploadForm), onSucces);
  });
})();
