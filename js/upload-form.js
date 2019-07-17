'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var imgUploadForm = document.querySelector('.img-upload__form');
  var mainElement = document.querySelector('main');

  // Отправляет форму и проверяет ответ сервера
  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.loadData.HttpResponse.OK) {
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

  // Сбрасывает введенные пользователем в форму данные
  var resetImgUpload = function () {
    window.domQery.textHashtagsElement.value = '';
    window.domQery.textDescriptionElement.value = '';
    window.domQery.uploadFileElement.value = '';
  };

  // Создает диалоговое окно из шаблонов и вставляет в документ (показывает)
  var openDialog = function (dialogSelector) {
    var successTemplate = document
      .querySelector('#' + dialogSelector)
      .content.querySelector('.' + dialogSelector);
    var successTemplateClone = successTemplate.cloneNode(true);

    mainElement.appendChild(successTemplateClone);
  };

  // Скрывает (удаляет) диалоговое окно при различных событиях
  var closeDialog = function (dialogSelector) {
    var dialogElement = mainElement.querySelector('.' + dialogSelector);
    var dialogButtonElements = dialogElement.querySelectorAll(
        '.' + dialogSelector + '__button'
    );

    // Скрывает (удаляет) диалоговое окно непосредственно, удаляет обработчик ESC
    var onDialogElementRemove = function () {
      dialogElement.remove();
      document.removeEventListener('keydown', onDialogEscPress);
    };

    var onDialogEscPress = function (evt) {
      if (evt.keyCode === window.formOpenClose.ESC_KEYCODE) {
        onDialogElementRemove();
      }
    };

    // Проверяет если щелчек не по диалговому окну то закрывает его
    var onDialogRemoveClick = function (evt) {
      if (!evt.target.closest('.' + dialogSelector + '__inner')) {
        onDialogElementRemove();
      }
    };

    // Закрывает нажатием на ESC
    document.addEventListener('keydown', onDialogEscPress);
    // Закрывает по клику на произвольную область экрана
    dialogElement.addEventListener('click', onDialogRemoveClick);
    // Закрывает по клику на buttons
    dialogButtonElements.forEach(function (item) {
      item.addEventListener('click', onDialogElementRemove);
    });
  };

  // Действия при успешной отправке на сервер
  var onSucces = function () {
    window.formOpenClose.closeImgUpload();
    resetImgUpload();
    openDialog('success');
    closeDialog('success');
  };

  // Действия при ошибке при отправке на сервер
  var onError = function () {
    window.formOpenClose.closeImgUpload();
    resetImgUpload();
    openDialog('error');
    closeDialog('error');
  };

  // Отправка формы нажатием на кнопку
  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    upload(new FormData(imgUploadForm), onSucces);
  });
})();
