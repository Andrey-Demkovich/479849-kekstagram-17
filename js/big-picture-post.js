'use strict';
// Заполняет данные при просмотре фотографий в полноразмерном режиме

(function () {
  var bigPictureImgElement = window.bigPictureElement.querySelector(
      '.big-picture__img'
  ).firstElementChild;
  var likesCountElement = window.bigPictureElement.querySelector(
      '.likes-count'
  );
  var commentsCountElement = window.bigPictureElement.querySelector(
      '.comments-count'
  );
  var socialCommentElements = window.bigPictureElement.querySelectorAll(
      '.social__comment'
  );
  var socialCaptionElement = window.bigPictureElement.querySelector(
      '.social__caption'
  );

  // Заполняет данные при просмотре фотографий в полноразмерном режиме
  window.createBigPicture = function (bigPictureData) {
    bigPictureImgElement.src = bigPictureData.url;
    likesCountElement.textContent = bigPictureData.likes;
    commentsCountElement.textContent = bigPictureData.comments.length;
    socialCommentElements.forEach(function (element, i) {
      element.querySelector('.social__picture').src =
        bigPictureData.comments[i].avatar;
      element.querySelector('.social__text').textContent =
        bigPictureData.comments[i].message;
    });
    socialCaptionElement.textContent = bigPictureData.description;
    window.bigPictureElement
      .querySelector('.social__comment-count')
      .classList.add('visually-hidden');
    window.bigPictureElement
      .querySelector('.comments-loader')
      .classList.add('visually-hidden');
  };
})();
