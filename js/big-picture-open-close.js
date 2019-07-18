'use strict';
// Открытие/закрытие большой фотографии из загруженной галереи

(function () {
  var bigPictureCancelElement = window.domQery.bigPictureElement.querySelector(
      '.big-picture__cancel'
  );

  // Обработчик закрытия при нажатии Esc
  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.formOpenClose.ESC_KEYCODE) {
      onBigPictureClose();
    }
  };

  // Обработчик закрытия большого фото
  var onBigPictureClose = function () {
    window.domQery.bigPictureElement.classList.add('hidden');

    document.body.classList.remove('modal-open');

    // При закрытии фото удаляем обработчик кнопки 'Загрузить еще'
    window.domQery.commentsLoaderElement.removeEventListener(
        'click',
        window.bigPicture.onCommentsLoaderClick
    );

    // Удаляем обработчик закрытия при нажатии Esc
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  // Обработчик открытия большого фото
  var onBigPictureOpen = function (evt) {
    // Определяем элемент на котором произошло событие
    var target = evt.target;
    // Определяем произошло событие на .picture или на каком-то вложенном элементе
    var picture = target.closest('.picture');
    // Если клик не на .picture элементе то выходим из функции
    if (!picture) {
      return;
    }

    // Из ТЗ - Элементу body задаётся класс modal-open.
    document.body.classList.add('modal-open');
    // Фильтруем загруженные данные и определяем по src кликнутой картинки какой объект с данными нужен для отрисовки большого фото
    var filterDataElement = window.loadData.XhrDataImgPosts.filter(function (
        object
    ) {
      return object.url === picture.querySelector('img').getAttribute('src');
    })[0];
    // Заполняет данные для просмотра фото в полноразмерном режиме
    window.bigPicture.createBigPicture(filterDataElement);
    // Открываем большое фото
    window.domQery.bigPictureElement.classList.remove('hidden');

    // При открытии большого фото, добовляем события его закрытия
    bigPictureCancelElement.addEventListener('click', onBigPictureClose);
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  // Событие открытия большого изображения по клику (использует делегирование)
  window.domQery.picturesContainerElement.addEventListener(
      'click',
      onBigPictureOpen
  );
})();
