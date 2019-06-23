'use strict';
// Создает галерею картинок-постов и вставляет ее в .pictures

(function () {
  var picterTemplate = document
    .querySelector('#picture')
    .content.querySelector('.picture');
  var picturesContainerElement = document.querySelector('.pictures');

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
  var insertFragment = function (posts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < posts.length; i++) {
      fragment.appendChild(createPicterPost(posts[i]));
    }
    picturesContainerElement.appendChild(fragment);
  };

  insertFragment(window.pictersPosts);
})();
