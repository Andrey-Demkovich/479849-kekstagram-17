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
  window.insertFragment = function (posts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < posts.length; i++) {
      fragment.appendChild(createPicterPost(posts[i]));
    }
    window.picturesContainerElement.appendChild(fragment);
  };

  window.load(URL, window.insertFragment);
})();
