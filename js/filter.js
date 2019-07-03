'use strict';

(function () {
  var imgFiltersElement = document.querySelector('.img-filters');
  var filterPopularElement = imgFiltersElement.querySelector('#filter-popular');
  var filterNewElement = imgFiltersElement.querySelector('#filter-new');
  var filterDiscussedElement = imgFiltersElement.querySelector(
      '#filter-discussed'
  );
  window.imgFiltersButtonElements = imgFiltersElement.querySelectorAll(
      '.img-filters__button'
  );

  // Создаем с помощью getElementsBy* «живой поисковой запрос» для многократного повторного использования (специальный объект, имеющий тип NodeList или HTMLCollection)
  var pictureElements = window.picturesContainerElement.getElementsByClassName(
      'picture'
  );

  // Удаляем все элементы
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

  filterPopularElement.addEventListener('click', function () {
    elementsRemoveClass('img-filters__button--active');
    filterPopularElement.classList.add('img-filters__button--active');
    elementsRemove(pictureElements);
    window.insertFragment(window.XhrDataImgPosts);
  });

  filterNewElement.addEventListener('click', function () {
    elementsRemoveClass('img-filters__button--active');
    filterNewElement.classList.add('img-filters__button--active');
    window.NewPosts = shuffle(window.XhrDataImgPosts).slice(0, 10);
    elementsRemove(pictureElements);
    window.insertFragment(window.NewPosts);
  });

  filterDiscussedElement.addEventListener('click', function () {
    elementsRemoveClass('img-filters__button--active');
    filterDiscussedElement.classList.add('img-filters__button--active');
    window.discussedPosts = window.XhrDataImgPosts.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    elementsRemove(pictureElements);
    window.insertFragment(window.discussedPosts);
  });
})();
