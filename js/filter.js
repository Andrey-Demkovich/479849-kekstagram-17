'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var NEW_POSTS = 10;

  var imgFiltersElement = document.querySelector('.img-filters');
  var filterPopularButtonElement = imgFiltersElement.querySelector(
      '#filter-popular'
  );
  var filterNewButtonElement = imgFiltersElement.querySelector('#filter-new');
  var filterDiscussedButtonElement = imgFiltersElement.querySelector(
      '#filter-discussed'
  );
  var imgFiltersButtonElements = imgFiltersElement.querySelectorAll(
      '.img-filters__button'
  );
  var lastTimeout = null;

  // Удаляем все элементы elements
  var elementsRemove = function (elements) {
    Array.from(elements).forEach(function (element) {
      element.remove();
    });
  };

  // Удаляем подсветку активной кнопки
  var elementsRemoveClass = function (className) {
    imgFiltersButtonElements.forEach(function (element) {
      if (element.classList.contains(className)) {
        element.classList.remove(className);
      }
    });
  };

  // Алгоритм тасования Фишера-Йетса в варианте Дурштенфельда (Кнута)
  var shuffle = function (arr) {
    // Using Durstenfeld shuffle algorithm
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  // Переключаем состояние(отрисовку активной кнопки)
  var onToggleButtonActive = function (filterButtonElement) {
    elementsRemoveClass('img-filters__button--active');
    filterButtonElement.classList.add('img-filters__button--active');
  };

  // Находим и удаляем все старые картинки посты и вставляем новые
  var onFilterButtonClick = function (dataPosts) {
    var pictureElements = window.picturesContainerElement.querySelectorAll(
        '.picture'
    );
    elementsRemove(pictureElements);
    window.insertFragment(dataPosts);
  };

  // Обработчик кнопки "Популярные"
  var onFilterPopularButtonClick = function () {
    onFilterButtonClick(window.XhrDataImgPosts);
  };

  // Обработчик кнопки "Новые"
  var onFilterNewButtonClick = function () {
    var NewPosts = shuffle(window.XhrDataImgPosts.slice()).slice(0, NEW_POSTS);
    onFilterButtonClick(NewPosts);
  };

  // Обработчик кнопки "Обсуждаемые"
  var onFilterDiscussedButtonClick = function () {
    var discussedPosts = window.XhrDataImgPosts.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    onFilterButtonClick(discussedPosts);
  };

  // Функция устранения "дребезга" (debounce)
  var debounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };

  filterPopularButtonElement.addEventListener('click', function () {
    onToggleButtonActive(filterPopularButtonElement);
    debounce(onFilterPopularButtonClick);
  });

  filterNewButtonElement.addEventListener('click', function () {
    onToggleButtonActive(filterNewButtonElement);
    debounce(onFilterNewButtonClick);
  });

  filterDiscussedButtonElement.addEventListener('click', function () {
    onToggleButtonActive(filterDiscussedButtonElement);
    debounce(onFilterDiscussedButtonClick);
  });
})();
