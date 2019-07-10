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
  var socialCommentElement = window.bigPictureElement.querySelector(
      '.social__comment'
  );
  var socialCaptionElement = window.bigPictureElement.querySelector(
      '.social__caption'
  );
  var socialCommentCountElement = window.bigPictureElement.querySelector(
      '.social__comment-count'
  );

  window.commentsLoaderElement = window.bigPictureElement.querySelector(
      '.comments-loader'
  );

  // Создаем комментарий
  var createCommentElement = function (elementData) {
    // Если создается первый комментарий клонируем его из HTML
    if (!commentElement) {
      var commentElement = socialCommentElement.cloneNode(true);
    }

    // Заполняем комментарий данными
    commentElement.querySelector('.social__picture').src = elementData.avatar;
    commentElement.querySelector('.social__text').textContent =
      elementData.message;

    commentElement = commentElement.cloneNode(true);

    return commentElement;
  };

  // Создаем 5 комментариев или меньше (если данные содержат меньше 5 комментов) и вставляем в документ
  var createCommentElements = function (bigPictureData) {
    var MAX_COMMENTS_PAGE = 5;
    var fragmentComment = document.createDocumentFragment();
    var bigPictureDataClone = bigPictureData.comments.slice();
    // Используем 5 комментариев
    var bigPictureDataFives = bigPictureDataClone.splice(0, MAX_COMMENTS_PAGE);

    bigPictureDataFives.forEach(function (item) {
      fragmentComment.appendChild(createCommentElement(item));
    });

    // Очищаем содержимое контейнера для комментариев от комментариев начальной HTML разметки
    socialCommentContainerElement.innerHTML = '';
    socialCommentContainerElement.appendChild(fragmentComment);
    if (bigPictureDataClone.length === 0) {
      commentsLoaderElement.classList.add('visually-hidden');
    }

    window.onCommentsLoaderElementClick = function () {
      bigPictureDataFives = bigPictureDataClone.splice(0, MAX_COMMENTS_PAGE);

      bigPictureDataFives.forEach(function (item) {
        fragmentComment.appendChild(createCommentElement(item));
      });
      socialCommentContainerElement.appendChild(fragmentComment);

      if (bigPictureDataClone.length === 0) {
        commentsLoaderElement.classList.add('visually-hidden');
      }
    };

    commentsLoaderElement.addEventListener(
        'click',
        window.onCommentsLoaderElementClick
    );
  };

  // Заполняет данные при просмотре фотографий в полноразмерном режиме
  window.createBigPicture = function (bigPictureData) {
    bigPictureImgElement.src = bigPictureData.url;
    likesCountElement.textContent = bigPictureData.likes;
    commentsCountElement.textContent = bigPictureData.comments.length;

    commentsLoaderElement.classList.remove('visually-hidden');

    createCommentElements(bigPictureData);

    socialCaptionElement.textContent = bigPictureData.description;
    socialCommentCountElement.classList.add('visually-hidden');
  };
})();
