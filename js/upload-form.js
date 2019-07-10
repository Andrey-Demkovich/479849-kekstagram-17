'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var imgUploadForm = document.querySelector('.img-upload__form');
  var mainElement = document.querySelector('main');

  // Отправляет форму и проверяет ответ сервера
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

  // Сбрасывает введенные пользователем в форму данные
  var resetImgUpload = function () {
    window.textHashtagsElement.value = '';
    window.textDescriptionElement.value = '';
    window.uploadFileElement.value = '';
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
    var dialogElementRemove = function () {
      dialogElement.remove();
      document.removeEventListener('keydown', onElementEscPress);
    };

    // Обработчик клавиши ESC
    var onElementEscPress = function (evt) {
      window.onElementEscPress(evt, dialogElementRemove);
    };

    // Проверяет если щелчек не по диалговому окну то закрывает его
    var dialogRemove = function (evt) {
      if (!evt.target.closest('.' + dialogSelector + '__inner')) {
        dialogElementRemove();
      }
    };

    // Закрывает нажатием на ESC
    document.addEventListener('keydown', onElementEscPress);
    // Закрывает по клику на произвольную область экрана
    dialogElement.addEventListener('click', dialogRemove);
    // Закрывает по клику на buttons
    dialogButtonElements.forEach(function (item) {
      item.addEventListener('click', dialogElementRemove);
    });
  };

  // Действия при успешной отправке на сервер
  var onSucces = function () {
    window.closeImgUpload();
    resetImgUpload();
    openDialog('success');
    closeDialog('success');
  };

  // Действия при ошибке при отправке на сервер
  var onError = function () {
    window.closeImgUpload();
    resetImgUpload();
    openDialog('error');
    closeDialog('error');
  };

  // Отправка формы нажатием на кнопку
  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(imgUploadForm), onSucces);
  });
})();
