'use strict';
// Заполняет данные при просмотре фотографий в полноразмерном режиме

(function () {
  var MAX_COMMENTS_PAGE = 5;

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

  // Создает 1 комментарий
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

  // Создает 5 комментариев и вставляем в документ
  var createFiveCommentsElements = function (dataFives) {
    var fragmentComment = document.createDocumentFragment();
    dataFives.forEach(function (item) {
      fragmentComment.appendChild(createCommentElement(item));
    });
    socialCommentContainerElement.appendChild(fragmentComment);

    // Подсчитываем колличество показанных комментариев и показываем их в посте (socialCommentCountElement)
    var countAddComments = socialCommentContainerElement.querySelectorAll(
        '.social__comment'
    ).length;
    socialCommentCountElement.firstChild.textContent =
      countAddComments + ' из ';
  };

  // Делает выборку данных для 5 первых комментариев при открытии окна и при нажатии на кнопку 'Загрузить еще'
  var createCommentElements = function (bigPictureData) {
    // Клонируем массив комментариев
    var bigPictureCommentsClone = bigPictureData.comments.slice();

    // Очищаем контейнер для вставки комментариев при открытии окна
    socialCommentContainerElement.innerHTML = '';

    // Вырезает первых пять комментариев массива и вставляет их в пост
    window.createFiveElements = function () {
      var bigPictureDataFives = bigPictureCommentsClone.splice(
          0,
          MAX_COMMENTS_PAGE
      );

      // Если массив комментариев пуст скрываем кнопку 'Загрузить еще'
      if (bigPictureCommentsClone.length === 0) {
        window.commentsLoaderElement.classList.add('visually-hidden');
      }

      // Создает 5 комментариев и вставляет в пост
      createFiveCommentsElements(bigPictureDataFives);
    };

    // Создаем первых 5 комментариев и вставляем в пост
    window.createFiveElements();

    // При клике на кнопке 'Загрузить еще' вставит еще 5 комментариев
    window.commentsLoaderElement.addEventListener(
        'click',
        window.createFiveElements
    );
  };

  // Заполняет данные при просмотре фотографий в полноразмерном режиме
  window.createBigPicture = function (bigPictureData) {
    bigPictureImgElement.src = bigPictureData.url;
    likesCountElement.textContent = bigPictureData.likes;
    commentsCountElement.textContent = bigPictureData.comments.length;

    // Если кнопка 'Загрузить еще' скрыта, показываем ее
    window.commentsLoaderElement.classList.remove('visually-hidden');
    // Вставляем 5 комментариев
    createCommentElements(bigPictureData);

    socialCaptionElement.textContent = bigPictureData.description;
    // socialCommentCountElement.classList.add('visually-hidden');
  };
})();
