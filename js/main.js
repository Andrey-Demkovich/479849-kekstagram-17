'use strict';

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

var picterTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

var picturesContainerElement = document.querySelector('.pictures');

var generateRandomInteger = function (min, max) {
  return min + Math.floor((max + 1 - min) * Math.random());
};

var generatePosts = function (urls, comments, comentators) {
  var posts = [];
  var urlsClone = urls.slice();
  for (var i = 0; i < urls.length; i++) {
    posts[i] = {};

    posts[i].url = urlsClone
      .splice(generateRandomInteger(0, urlsClone.length - 1), 1)
      .toString();

    posts[i].likes = generateRandomInteger(LIKES_MIN, LIKES_MAX);

    posts[i].comments = [];
    var commentorsClone = comentators.slice();
    var commentsClone = comments.slice();
    for (var j = 0; j < generateRandomInteger(2, 5); j++) {
      var commentator = commentorsClone.splice(
          generateRandomInteger(0, commentorsClone.length - 1),
          1
      );

      posts[i].comments[j] = {};
      posts[i].comments[j].avatar = commentator[0].avatar;
      posts[i].comments[j].message = commentsClone
        .splice(generateRandomInteger(0, commentsClone.length - 1), 1)
        .toString();
      posts[i].comments[j].name = commentator[0].name;
    }
  }

  return posts;
};

var createPicterPost = function (post) {
  var picterElement = picterTemplate.cloneNode(true);

  picterElement.querySelector('.picture__img').src = post.url;
  picterElement.querySelector('.picture__likes').textContent = post.likes;
  picterElement.querySelector('.picture__comments').textContent =
    post.comments.length;

  return picterElement;
};

var insertFragment = function (posts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < posts.length; i++) {
    fragment.appendChild(createPicterPost(posts[i]));
  }
  picturesContainerElement.appendChild(fragment);
};

insertFragment(generatePosts(URLS, COMMENTS, COMMENTATORS));
