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
  window.imgFiltersButtonElements = imgFiltersElement.querySelectorAll(
      '.img-filters__button'
  );
  var lastTimeout = null;

  // Создаем с помощью getElementsBy* «живой поисковой запрос» для многократного повторного использования (специальный объект, имеющий тип NodeList или HTMLCollection)
  var pictureElements = window.picturesContainerElement.getElementsByClassName(
      'picture'
  );

  // Удаляем все элементы elements
  var elementsRemove = function (elements) {
    Array.from(elements).forEach(function (element) {
      element.remove();
    });
  };

  // Удаляем подсветку активной кнопки
  var elementsRemoveClass = function (className) {
    Array.from(imgFiltersButtonElements).forEach(function (element) {
      if (element.classList.contains(className)) {
        element.classList.remove(className);
      }
    });
  };

  // Алгоритм тасования Фишера-Йетса в варианте Дурштенфельда (Кнута)
  var shuffle = function (arr) {
    // Using Durstenfeld shuffle algorithm
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var onFilterPopularButtonClick = function () {
    elementsRemove(pictureElements);
    window.insertFragment(window.XhrDataImgPosts);
  };

  var onFilterNewButtonClick = function () {
    window.NewPosts = shuffle(window.XhrDataImgPosts.slice()).slice(
        0,
        NEW_POSTS
    );
    elementsRemove(pictureElements);
    window.insertFragment(window.NewPosts);
  };

  var onFilterDiscussedButtonClick = function () {
    window.discussedPosts = window.XhrDataImgPosts.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    elementsRemove(pictureElements);
    window.insertFragment(window.discussedPosts);
  };

  var debounce = function (func) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
  };

  filterPopularButtonElement.addEventListener('click', function () {
    elementsRemoveClass('img-filters__button--active');
    filterPopularButtonElement.classList.add('img-filters__button--active');

    debounce(onFilterPopularButtonClick);
  });

  filterNewButtonElement.addEventListener('click', function () {
    elementsRemoveClass('img-filters__button--active');
    filterNewButtonElement.classList.add('img-filters__button--active');

    debounce(onFilterNewButtonClick);
  });

  filterDiscussedButtonElement.addEventListener('click', function () {
    elementsRemoveClass('img-filters__button--active');
    filterDiscussedButtonElement.classList.add('img-filters__button--active');

    debounce(onFilterDiscussedButtonClick);
  });
})();
