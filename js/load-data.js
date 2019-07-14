'use strict';
// Загружаем данные для картинок-постов с сервера

(function () {
  var TIMEOUT_REQUEST = 10000; // 10c

  window.HttpResponse = {
    OK: 200,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,

    SERVER_ERROR: 500
  };

  window.load = function (URL, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case window.HttpResponse.OK:
          window.XhrDataImgPosts = xhr.response;
          onSuccess(window.XhrDataImgPosts);

          // Показываем меню филтрации загруженных изображений
          document
            .querySelector('.img-filters')
            .classList.remove('img-filters--inactive');
          break;

        case window.HttpResponse.BAD_REQUEST:
          window.onError('Не верный запрос');
          break;
        case window.HttpResponse.UNAUTHORIZED:
          window.onError('Пользователь не авторизован');
          break;
        case window.HttpResponse.NOT_FOUND:
          window.onError('Данных не найдено');
          break;

        case window.HttpResponse.SERVER_ERROR:
          window.onError('Ошибка сервера');
          break;

        default:
          window.onError(
              'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText
          );
      }
    });

    xhr.addEventListener('error', function () {
      window.onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      window.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_REQUEST;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
