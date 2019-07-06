'use strict';
// Загружаем данные для картинок-постов с сервера

(function () {
  window.load = function (URL, onSuccess1, onSuccess2) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          window.XhrDataImgPosts = xhr.response;
          onSuccess1(window.XhrDataImgPosts);
          // Показываем меню филтрации загруженных изображений
          document
            .querySelector('.img-filters')
            .classList.remove('img-filters--inactive');

          onSuccess2(window.XhrDataImgPosts);
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
      window.onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      window.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
