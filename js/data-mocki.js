'use strict';
// создает данные - моки

(function () {
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;

  var URLS = [];
  for (var k = 1; k <= 25; k++) {
    URLS.push('photos/' + k + '.jpg');
  }

  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var COMMENTATORS = [
    {name: 'Андрей', avatar: 'img/avatar-1.jpg'},
    {name: 'Геннадий', avatar: 'img/avatar-2.jpg'},
    {name: 'Игорь', avatar: 'img/avatar-3.jpg'},
    {name: 'Виктор', avatar: 'img/avatar-4.jpg'},
    {name: 'Екатерина', avatar: 'img/avatar-5.jpg'},
    {name: 'Елена', avatar: 'img/avatar-6.jpg'}
  ];

  var generateRandomInteger = function (min, max) {
    return min + Math.floor((max + 1 - min) * Math.random());
  };

  // генерируем комментарий
  var generateComment = function () {
    var commentator =
      COMMENTATORS[generateRandomInteger(0, COMMENTATORS.length - 1)];
    var message = COMMENTS[generateRandomInteger(0, COMMENTS.length - 1)];

    return {
      avatar: commentator.avatar,
      name: commentator.name,
      message: message
    };
  };

  // генерируем много комментариев
  var generateComments = function (commentsTotal) {
    var comments = [];
    for (var t = 0; t < commentsTotal; t++) {
      comments.push(generateComment());
    }

    return comments;
  };

  // генерируем пост
  var generatePost = function (url) {
    var commentsTotal = generateRandomInteger(1, 10);
    var comments = generateComments(commentsTotal);
    var likes = generateRandomInteger(LIKES_MIN, LIKES_MAX);
    var post = {
      url: url,
      comments: comments,
      likes: likes
    };

    return post;
  };

  // все вместе
  var generatePostsAlt = function (urls) {
    var urlsClone = urls.slice();
    var posts = urls.map(function () {
      var url = urlsClone.splice(
          generateRandomInteger(0, urlsClone.length - 1),
          1
      )[0];

      return generatePost(url);
    });

    return posts;
  };

  // Генерируем массив данных для дальнейшего использования
  window.pictersPosts = generatePostsAlt(URLS);
})();
