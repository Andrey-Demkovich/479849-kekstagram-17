'use strict';
// Создает галерею картинок-постов и вставляет ее в .pictures

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var picterTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  // Создаем картинку с постом для галереи
  var createPicterPost = function (post) {
    var picterElement = picterTemplate.cloneNode(true);

    picterElement.querySelector('.picture__img').src = post.url;
    picterElement.querySelector('.picture__likes').textContent = post.likes;
    picterElement.querySelector('.picture__comments').textContent =
      post.comments.length;

    return picterElement;
  };

  // Создаем галерею картинок-постов и вставлям ее в .pictures
  window.gallery = {
    insertFragment: function (posts) {
      var fragment = document.createDocumentFragment();
      posts.forEach(function (item) {
        fragment.appendChild(createPicterPost(item));
      });
      window.domQery.picturesContainerElement.appendChild(fragment);
    }
  };

  window.loadData.load(URL, window.gallery.insertFragment);
})();
