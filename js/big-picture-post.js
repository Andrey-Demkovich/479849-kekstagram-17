'use strict';
// Заполняет данные при просмотре фотографий в полноразмерном режиме

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

  // Заполняет данные при просмотре фотографий в полноразмерном режиме
  window.createBigPicture = function (bigPictureData) {
    bigPictureImgElement.src = bigPictureData[0].url;
    likesCountElement.textContent = bigPictureData[0].likes;
    commentsCountElement.textContent = bigPictureData[0].comments.length;
    socialCommentElements.forEach(function (element, i) {
      element.querySelector('.social__picture').src =
        bigPictureData[0].comments[i].avatar;
      element.querySelector('.social__text').textContent =
        bigPictureData[0].comments[i].message;
    });
    socialCaptionElement.textContent = bigPictureData[0].description;
    bigPictureElement
      .querySelector('.social__comment-count')
      .classList.add('visually-hidden');
    bigPictureElement
      .querySelector('.comments-loader')
      .classList.add('visually-hidden');
  };
})();
