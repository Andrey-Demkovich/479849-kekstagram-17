'use strict';
// Загружаем данные для картинок-постов с сервера

(function () {
  var TIMEOUT_REQUEST = 10000; // 10c

  window.loadData = {
    HttpResponse: {
      OK: 200,

      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      NOT_FOUND: 404,

      SERVER_ERROR: 500
    }
  };

  window.loadData.load = function (URL, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case window.loadData.HttpResponse.OK:
          window.loadData.XhrDataImgPosts = xhr.response;
          onSuccess(window.loadData.XhrDataImgPosts);

          // Показываем меню филтрации загруженных изображений
          document
            .querySelector('.img-filters')
            .classList.remove('img-filters--inactive');
          break;

        case window.loadData.HttpResponse.BAD_REQUEST:
          window.errorData.onError('Не верный запрос');
          break;
        case window.loadData.HttpResponse.UNAUTHORIZED:
          window.errorData.onError('Пользователь не авторизован');
          break;
        case window.loadData.HttpResponse.NOT_FOUND:
          window.errorData.onError('Данных не найдено');
          break;

        case window.loadData.HttpResponse.SERVER_ERROR:
          window.errorData.onError('Ошибка сервера');
          break;

        default:
          window.errorData.onError(
              'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText
          );
      }
    });

    xhr.addEventListener('error', function () {
      window.errorData.onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      window.errorData.onError(
          'Запрос не успел выполниться за ' + xhr.timeout + 'мс'
      );
    });
    xhr.timeout = TIMEOUT_REQUEST;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
