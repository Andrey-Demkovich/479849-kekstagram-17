'use strict';
// Проверяем валидность хэш-тегов

(function () {
  var MAX_LONG_HASHTAG = 20;
  var MAX_AMOUNT_HASHTAG = 5;

  window.domQery.textHashtagsElement.addEventListener('change', function () {
    var invalidMessage = []; // Для хранения сообщений об ошибках

    // Получаем содержание input и приводим к одному регистру
    var inputText = window.domQery.textHashtagsElement.value.toLowerCase();
    // Если input пустой то выходим из функции и ничего не делаем
    if (!inputText) {
      return;
    }

    // Для удобства обработки хэш-тегов преобразуем их в массив, пробельные символы не считаем элементом (фильтрация)
    var inputArray = inputText.split(' ').filter(function (item) {
      return item !== '';
    });

    // Выполняем проверки:
    var isStartNotHashtag = inputArray.some(function (item) {
      return item[0] !== '#';
    });
    if (isStartNotHashtag) {
      invalidMessage.push('Хэш-тег должен начинаеться с символа #');
    }

    var isOnlyLatticeHashtag = inputArray.some(function (item) {
      return item === '#';
    });
    if (isOnlyLatticeHashtag) {
      invalidMessage.push('Хеш-тег не может состоять только из одной решётки');
    }

    var isSplitSpaceHashtag = inputArray.some(function (item) {
      return ~item.indexOf('#', 1);
    });
    if (isSplitSpaceHashtag) {
      invalidMessage.push('Хэш-теги разделяются пробелами');
    }

    var isRepeatHashtag = inputArray.some(function (item, i, arr) {
      return ~arr.indexOf(item, i + 1);
    });
    if (isRepeatHashtag) {
      invalidMessage.push(
          'Один и тот же хэш-тег не может быть использован дважды'
      );
    }

    var isLongHashtag = inputArray.some(function (item) {
      return item.length > MAX_LONG_HASHTAG;
    });
    if (isLongHashtag) {
      invalidMessage.push(
          'Максимальная длина одного хэш-тега 20 символов, включая решётку'
      );
    }

    if (inputArray.length > MAX_AMOUNT_HASHTAG) {
      invalidMessage.push('Нельзя указать больше пяти хэш-тегов');
    }

    // Преобразуем массив сообщений об ошибках в строку и с помощью setCustomValidity задаем сообщение об ошибках
    window.domQery.textHashtagsElement.setCustomValidity(
        invalidMessage.join('. \n')
    );

    // Неверно заполненные поля подсвечиваются красной рамкой
    if (window.domQery.textHashtagsElement.validationMessage) {
      window.domQery.textHashtagsElement.style.outlineColor = 'red';
    }
  });
})();
