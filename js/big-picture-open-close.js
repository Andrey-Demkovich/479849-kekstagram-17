'use strict';
// Открытие/закрытие большой фотографии из загруженной галереи

(function () {
  var bigPictureCancelElement = window.bigPictureElement.querySelector(
      '.big-picture__cancel'
  );

  // Обработчик закрытия при нажатии Esc
  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeBigPicture();
    }
  };

  // Обработчик закрытия большого фото
  var closeBigPicture = function () {
    window.bigPictureElement.classList.add('hidden');

    window.commentsLoaderElement.removeEventListener(
        'click',
        window.onCommentsLoaderElementClick
    );

    // Удаляем обработчик закрытия при нажатии Esc
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  // Обработчик открытия большого фото
  var openBigPicture = function (evt) {
    // Определяем элемент на котором произошло событие
    var target = evt.target;
    // Определяем произошло событие на .picture или на каком-то вложенном элементе
    var picture = target.closest('.picture');
    // Если клик не на .picture элементе то выходим из функции
    if (!picture) {
      return;
    }

    // Фильтруем загруженные данные и определяем по src кликнутой картинки какой объект с данными нужен для отрисовки большого фото
    var filterDataElement = window.XhrDataImgPosts.filter(function (object) {
      return object.url === picture.querySelector('img').getAttribute('src');
    })[0];
    // Заполняет данные для просмотра фото в полноразмерном режиме
    window.createBigPicture(filterDataElement);
    // Открываем большое фото
    window.bigPictureElement.classList.remove('hidden');

    // При открытии большого фото, добовляем события его закрытия
    bigPictureCancelElement.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  // Событие открытия большого изображения по клику (использует делегирование)
  window.picturesContainerElement.addEventListener('click', openBigPicture);
})();
