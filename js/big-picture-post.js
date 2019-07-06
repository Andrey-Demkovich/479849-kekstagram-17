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
  var socialCommentContainerElement = window.bigPictureElement.querySelector(
      '.social__comments'
  );
  var socialCommentElements = window.bigPictureElement.querySelectorAll(
      '.social__comment'
  );
  var socialCommentElement = window.bigPictureElement.querySelector(
      '.social__comment'
  );
  var socialCaptionElement = window.bigPictureElement.querySelector(
      '.social__caption'
  );

  var createCommentElement = function (bigPictureData) {
    console.log(bigPictureData);
    var commentElement = socialCommentElement.cloneNode(true);
    var fragmentComment = document.createDocumentFragment();
    // for (var i = 0; i < 5; i++)
    var i = 0;
    var commentElements = [];
    while (
      commentElements.length < 5 &&
      commentElements.length < bigPictureData.comments.length
    ) {
      commentElement.querySelector('.social__picture').src =
        bigPictureData.comments[i].avatar;
      commentElement.querySelector('.social__text').textContent =
        bigPictureData.comments[i].message;
      fragmentComment.appendChild(commentElement);
      console.log(fragmentComment);
      commentElements = fragmentComment.querySelectorAll('.social__comment');
      commentElement = commentElement.cloneNode(true);
      i++;
    }

    socialCommentContainerElement.innerHTML = '';
    socialCommentContainerElement.appendChild(fragmentComment);
  };

  // Заполняет данные при просмотре фотографий в полноразмерном режиме
  window.createBigPicture = function (bigPictureData) {
    bigPictureImgElement.src = bigPictureData.url;
    likesCountElement.textContent = bigPictureData.likes;
    commentsCountElement.textContent = bigPictureData.comments.length;

    createCommentElement(bigPictureData);

    // socialCommentElements.forEach(function (element, i) {
    //   element.querySelector('.social__picture').src =
    //     bigPictureData.comments[i].avatar;
    //   element.querySelector('.social__text').textContent =
    //     bigPictureData.comments[i].message;
    // });
    socialCaptionElement.textContent = bigPictureData.description;
    window.bigPictureElement
      .querySelector('.social__comment-count')
      .classList.add('visually-hidden');
    window.bigPictureElement
      .querySelector('.comments-loader')
      .classList.add('visually-hidden');
  };
})();
