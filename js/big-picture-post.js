'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureImgElement = bigPictureElement.querySelector(
      '.big-picture__img'
  ).firstElementChild;
  var likesCountElement = bigPictureElement.querySelector('.likes-count');
  var commentsCountElement = bigPictureElement.querySelector('.comments-count');
  var socialCommentElements = bigPictureElement.querySelectorAll(
      '.social__comment'
  );
  var socialCaptionElement = bigPictureElement.querySelector(
      '.social__caption'
  );

  bigPictureElement.classList.remove('hidden');

  window.createBigPicture = function () {
    console.log(XhrDataImgPosts[0]);
    bigPictureImgElement.src = window.XhrDataImgPosts[0].url;
    likesCountElement.textContent = window.XhrDataImgPosts[0].likes;
    commentsCountElement.textContent =
      window.XhrDataImgPosts[0].comments.length;
    socialCommentElements.forEach(function (element, i) {
      element.querySelector('.social__picture').src =
        window.XhrDataImgPosts[0].comments[i].avatar;
      element.querySelector('.social__text').textContent =
        window.XhrDataImgPosts[0].comments[i].message;
    });
    socialCaptionElement.textContent = window.XhrDataImgPosts[0].description;
    bigPictureElement
      .querySelector('.social__comment-count')
      .classList.add('visually-hidden');
    bigPictureElement
      .querySelector('.comments-loader')
      .classList.add('visually-hidden');
  };

  window.load(window.URL, window.createBigPicture);
})();
