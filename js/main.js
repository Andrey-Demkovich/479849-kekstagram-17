'use strict';

// Файл-модуль data-mocki.js
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

// Файл-модуль gallery.js
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

// Загрузка изображения и показ формы редактирования
var ESK_KEYCODE = 27;

var uploadFileElement = document.querySelector('#upload-file');
var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
var uploadCancelElement = imgUploadOverlayElement.querySelector(
    '#upload-cancel'
);
var effectLevel = imgUploadOverlayElement.querySelector('.effect-level');
var effectsRadioElements = imgUploadOverlayElement.querySelectorAll(
    '.effects__radio'
);
var imgUploadPreviewElement = imgUploadOverlayElement.querySelector(
    '.img-upload__preview'
);
var imageUploadPreviewElement = imgUploadPreviewElement.firstElementChild;
var scaleCntrolValue = imgUploadOverlayElement.querySelector(
    '.scale__control--value'
);
var textDescriptionElement = imgUploadOverlayElement.querySelector(
    '.text__description'
);

var onImgUploadEscPress = function (evt) {
  if (evt.keyCode === ESK_KEYCODE) {
    closeImgUpload();
  }
};

var closeImgUpload = function () {
  imgUploadOverlayElement.classList.add('hidden');

  document.removeEventListener('keydown', onImgUploadEscPress);

  imageUploadPreviewElement.className = '';
  imageUploadPreviewElement.style.filter = '';
  imageUploadPreviewElement.style.transform = 'scale(1)';
};

var openImgUpload = function () {
  imgUploadOverlayElement.classList.remove('hidden');

  effectsRadioElements[0].checked = true;
  scaleCntrolValue.value = '100%';

  // Скрываем слайдер эффектов и устанавливаем на 100%
  effectLevel.classList.add('hidden');
  effectLevelValueElement.value = 100;
  effectLevelPinElement.style.left = '100%';
  effectLevelDepthElement.style.width = '100%';

  document.addEventListener('keydown', onImgUploadEscPress);
  //   2.4. Комментарий:
  //   - если фокус находится в поле ввода комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
  textDescriptionElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', onImgUploadEscPress);
  });
  textDescriptionElement.addEventListener('blur', function () {
    document.addEventListener('keydown', onImgUploadEscPress);
  });

  uploadCancelElement.addEventListener('click', function () {
    closeImgUpload();
  });
};

uploadFileElement.addEventListener('change', function () {
  openImgUpload();
});

// 2.2. Наложение эффекта на изображение:
//  2.2.1. Смена эффекта
var changeEffectsPreview = function (evt) {
  imageUploadPreviewElement.className = '';
  if (evt.target.value !== 'none') {
    effectLevel.classList.remove('hidden');
    imageUploadPreviewElement.classList.add(
        'effects__preview--' + evt.target.value
    );
  }

  if (evt.target.value === 'none') {
    imageUploadPreviewElement.style.filter = '';
    effectLevel.classList.add('hidden');
  } else if (evt.target.value === 'chrome') {
    imageUploadPreviewElement.style.filter = 'grayscale(1)';
  } else if (evt.target.value === 'sepia') {
    imageUploadPreviewElement.style.filter = 'sepia(1)';
  } else if (evt.target.value === 'marvin') {
    imageUploadPreviewElement.style.filter = 'invert(100%)';
  } else if (evt.target.value === 'phobos') {
    imageUploadPreviewElement.style.filter = 'blur(3px)';
  } else if (evt.target.value === 'heat') {
    imageUploadPreviewElement.style.filter = 'brightness(3)';
  }

  // При смене эффекта устаналиваем ползунок слайдера на 100%
  effectLevelPinElement.style.left = '100%';
  effectLevelDepthElement.style.width = '100%';
};

effectsRadioElements.forEach(function (item) {
  item.addEventListener('change', function (evt) {
    changeEffectsPreview(evt);
  });
});

//  2.2.2. Изменение интенсивности эффекта
var effectLevelValueElement = effectLevel.querySelector('.effect-level__value');
var effectLevelLineElement = effectLevel.querySelector('.effect-level__line');
var effectLevelPinElement = effectLevel.querySelector('.effect-level__pin');
var effectLevelDepthElement = effectLevel.querySelector('.effect-level__depth');

var changeIntensityEffect = function () {
  effectLevelValueElement.value =
    (
      effectLevelPinElement.offsetLeft / effectLevelLineElement.clientWidth
    ).toFixed(2) * 100;

  if (imageUploadPreviewElement.classList[0] === 'effects__preview--chrome') {
    imageUploadPreviewElement.style.filter =
      'grayscale(' + effectLevelValueElement.value / 100 + ')';
  } else if (
    imageUploadPreviewElement.classList[0] === 'effects__preview--sepia'
  ) {
    imageUploadPreviewElement.style.filter =
      'sepia(' + effectLevelValueElement.value / 100 + ')';
  } else if (
    imageUploadPreviewElement.classList[0] === 'effects__preview--marvin'
  ) {
    imageUploadPreviewElement.style.filter =
      'invert(' + effectLevelValueElement.value + '%)';
  } else if (
    imageUploadPreviewElement.classList[0] === 'effects__preview--phobos'
  ) {
    imageUploadPreviewElement.style.filter =
      'blur(' + (effectLevelValueElement.value / 100) * 3 + 'px)';
  } else if (
    imageUploadPreviewElement.classList[0] === 'effects__preview--heat'
  ) {
    imageUploadPreviewElement.style.filter =
      'brightness(' + (effectLevelValueElement.value / 100) * 3 + ')';
  }
};

// Перетаскивание слайдера эффектов
effectLevelPinElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordsX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordsX - moveEvt.clientX;
    startCoordsX = moveEvt.clientX;

    var pinElementLeft = effectLevelPinElement.offsetLeft - shiftX;

    var lineElementLeft = effectLevelLineElement.getBoundingClientRect().left;
    var lineElementRight = effectLevelLineElement.getBoundingClientRect().right;
    if (startCoordsX <= lineElementLeft) {
      pinElementLeft = 0;
    } else if (startCoordsX >= lineElementRight) {
      pinElementLeft = effectLevelLineElement.clientWidth;
    }

    effectLevelPinElement.style.left = pinElementLeft + 'px';
    effectLevelDepthElement.style.width = pinElementLeft + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousemove', changeIntensityEffect);

  document.addEventListener('mouseup', onMouseUp);
});

// Изменение положения и интенсивности эффекта по клику на слайдер
effectLevel.addEventListener('click', function (clickEvt) {
  var coordsX = clickEvt.clientX;
  var lineElementLeft = effectLevelLineElement.getBoundingClientRect().left;
  var lineElementRight = effectLevelLineElement.getBoundingClientRect().right;

  var elementLeft = coordsX - lineElementLeft;

  if (coordsX <= lineElementLeft) {
    elementLeft = 0;
  } else if (coordsX >= lineElementRight) {
    elementLeft = effectLevelLineElement.clientWidth;
  }

  effectLevelPinElement.style.left = elementLeft + 'px';
  effectLevelDepthElement.style.width = elementLeft + 'px';
});

effectLevel.addEventListener('click', changeIntensityEffect);

// 2.1. Масштаб:
var MIN_SCALE = 0;
var MAX_SCALE = 100;
var STEP = 25;
var scaleControlSmaller = imgUploadOverlayElement.querySelector(
    '.scale__control--smaller'
);
var scaleControlBigger = imgUploadOverlayElement.querySelector(
    '.scale__control--bigger'
);

var outZoom = function () {
  var scaleSmaller = parseInt(scaleCntrolValue.value, 10) - STEP;

  if (scaleSmaller <= MIN_SCALE) {
    scaleSmaller = MIN_SCALE;
  }
  scaleCntrolValue.value = scaleSmaller + '%';

  imageUploadPreviewElement.style.transform =
    'scale(' + scaleSmaller / 100 + ')';
};

var inZoom = function () {
  var scaleBigger = parseInt(scaleCntrolValue.value, 10) + STEP;

  if (scaleBigger >= MAX_SCALE) {
    scaleBigger = MAX_SCALE;
  }
  scaleCntrolValue.value = scaleBigger + '%';

  imageUploadPreviewElement.style.transform =
    'scale(' + scaleBigger / 100 + ')';
};

scaleControlSmaller.addEventListener('click', function () {
  outZoom();
});

scaleControlBigger.addEventListener('click', function () {
  inZoom();
});
