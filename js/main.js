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

// Файл-модуль dom-element-query.js
// Задает глобально частоиспользуемые DOM-элементы
(function () {
  window.imgUploadOverlayElement = document.querySelector(
      '.img-upload__overlay'
  );

  window.effectLevel = window.imgUploadOverlayElement.querySelector(
      '.effect-level'
  );
  window.effectLevelValueElement = window.effectLevel.querySelector(
      '.effect-level__value'
  );
  window.effectLevelLineElement = window.effectLevel.querySelector(
      '.effect-level__line'
  );
  window.effectLevelPinElement = window.effectLevel.querySelector(
      '.effect-level__pin'
  );
  window.effectLevelDepthElement = window.effectLevel.querySelector(
      '.effect-level__depth'
  );

  window.effectsRadioElements = window.imgUploadOverlayElement.querySelectorAll(
      '.effects__radio'
  );
  window.imgUploadPreviewElement = window.imgUploadOverlayElement.querySelector(
      '.img-upload__preview'
  );
  window.imageUploadPreviewElement =
    window.imgUploadPreviewElement.firstElementChild;
  window.scaleCntrolValue = window.imgUploadOverlayElement.querySelector(
      '.scale__control--value'
  );
})();

// Файл-модуль form-open-close.js
// Загрузка изображения и показ(скрытие) формы редактирования
(function () {
  var ESK_KEYCODE = 27;

  var uploadFileElement = document.querySelector('#upload-file');

  var uploadCancelElement = window.imgUploadOverlayElement.querySelector(
      '#upload-cancel'
  );
  var textDescriptionElement = window.imgUploadOverlayElement.querySelector(
      '.text__description'
  );

  var onImgUploadEscPress = function (evt) {
    if (evt.keyCode === ESK_KEYCODE) {
      closeImgUpload();
    }
  };

  var closeImgUpload = function () {
    window.imgUploadOverlayElement.classList.add('hidden');

    document.removeEventListener('keydown', onImgUploadEscPress);

    window.imageUploadPreviewElement.className = '';
    window.imageUploadPreviewElement.style.filter = '';
    window.imageUploadPreviewElement.style.transform = 'scale(1)';
  };

  var openImgUpload = function () {
    window.imgUploadOverlayElement.classList.remove('hidden');

    window.effectsRadioElements[0].checked = true;
    window.scaleCntrolValue.value = '100%';

    // Скрываем слайдер эффектов и устанавливаем на 100%
    window.effectLevel.classList.add('hidden');
    window.effectLevelValueElement.value = 100;
    window.effectLevelPinElement.style.left = '100%';
    window.effectLevelDepthElement.style.width = '100%';

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
})();

// 2.2. Наложение эффекта на изображение:
//  2.2.1. Смена эффекта
var changeEffectsPreview = function (evt) {
  window.imageUploadPreviewElement.className = '';
  if (evt.target.value !== 'none') {
    window.effectLevel.classList.remove('hidden');
    window.imageUploadPreviewElement.classList.add(
        'effects__preview--' + evt.target.value
    );
  }

  if (evt.target.value === 'none') {
    window.imageUploadPreviewElement.style.filter = '';
    window.effectLevel.classList.add('hidden');
  } else if (evt.target.value === 'chrome') {
    window.imageUploadPreviewElement.style.filter = 'grayscale(1)';
  } else if (evt.target.value === 'sepia') {
    window.imageUploadPreviewElement.style.filter = 'sepia(1)';
  } else if (evt.target.value === 'marvin') {
    window.imageUploadPreviewElement.style.filter = 'invert(100%)';
  } else if (evt.target.value === 'phobos') {
    window.imageUploadPreviewElement.style.filter = 'blur(3px)';
  } else if (evt.target.value === 'heat') {
    window.imageUploadPreviewElement.style.filter = 'brightness(3)';
  }

  // При смене эффекта устаналиваем ползунок слайдера на 100%
  window.effectLevelPinElement.style.left = '100%';
  window.effectLevelDepthElement.style.width = '100%';
};

window.effectsRadioElements.forEach(function (item) {
  item.addEventListener('change', function (evt) {
    changeEffectsPreview(evt);
  });
});

//  2.2.2. Изменение интенсивности эффекта
var changeIntensityEffect = function () {
  window.effectLevelValueElement.value =
    (
      window.effectLevelPinElement.offsetLeft /
      window.effectLevelLineElement.clientWidth
    ).toFixed(2) * 100;

  if (
    window.imageUploadPreviewElement.classList[0] === 'effects__preview--chrome'
  ) {
    window.imageUploadPreviewElement.style.filter =
      'grayscale(' + window.effectLevelValueElement.value / 100 + ')';
  } else if (
    window.imageUploadPreviewElement.classList[0] === 'effects__preview--sepia'
  ) {
    window.imageUploadPreviewElement.style.filter =
      'sepia(' + window.effectLevelValueElement.value / 100 + ')';
  } else if (
    window.imageUploadPreviewElement.classList[0] === 'effects__preview--marvin'
  ) {
    window.imageUploadPreviewElement.style.filter =
      'invert(' + window.effectLevelValueElement.value + '%)';
  } else if (
    window.imageUploadPreviewElement.classList[0] === 'effects__preview--phobos'
  ) {
    window.imageUploadPreviewElement.style.filter =
      'blur(' + (window.effectLevelValueElement.value / 100) * 3 + 'px)';
  } else if (
    window.imageUploadPreviewElement.classList[0] === 'effects__preview--heat'
  ) {
    window.imageUploadPreviewElement.style.filter =
      'brightness(' + (window.effectLevelValueElement.value / 100) * 3 + ')';
  }
};

// Перетаскивание слайдера эффектов
window.effectLevelPinElement.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordsX = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shiftX = startCoordsX - moveEvt.clientX;
    startCoordsX = moveEvt.clientX;

    var pinElementLeft = window.effectLevelPinElement.offsetLeft - shiftX;

    var lineElementLeft = window.effectLevelLineElement.getBoundingClientRect()
      .left;
    var lineElementRight = window.effectLevelLineElement.getBoundingClientRect()
      .right;
    if (startCoordsX <= lineElementLeft) {
      pinElementLeft = 0;
    } else if (startCoordsX >= lineElementRight) {
      pinElementLeft = window.effectLevelLineElement.clientWidth;
    }

    window.effectLevelPinElement.style.left = pinElementLeft + 'px';
    window.effectLevelDepthElement.style.width = pinElementLeft + 'px';
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
window.effectLevel.addEventListener('click', function (clickEvt) {
  var coordsX = clickEvt.clientX;
  var lineElementLeft = window.effectLevelLineElement.getBoundingClientRect()
    .left;
  var lineElementRight = window.effectLevelLineElement.getBoundingClientRect()
    .right;

  var elementLeft = coordsX - lineElementLeft;

  if (coordsX <= lineElementLeft) {
    elementLeft = 0;
  } else if (coordsX >= lineElementRight) {
    elementLeft = window.effectLevelLineElement.clientWidth;
  }

  window.effectLevelPinElement.style.left = elementLeft + 'px';
  window.effectLevelDepthElement.style.width = elementLeft + 'px';
});

window.effectLevel.addEventListener('click', changeIntensityEffect);

// 2.1. Масштаб:
var MIN_SCALE = 0;
var MAX_SCALE = 100;
var STEP = 25;
var scaleControlSmaller = window.imgUploadOverlayElement.querySelector(
    '.scale__control--smaller'
);
var scaleControlBigger = window.imgUploadOverlayElement.querySelector(
    '.scale__control--bigger'
);

var outZoom = function () {
  var scaleSmaller = parseInt(window.scaleCntrolValue.value, 10) - STEP;

  if (scaleSmaller <= MIN_SCALE) {
    scaleSmaller = MIN_SCALE;
  }
  window.scaleCntrolValue.value = scaleSmaller + '%';

  window.imageUploadPreviewElement.style.transform =
    'scale(' + scaleSmaller / 100 + ')';
};

var inZoom = function () {
  var scaleBigger = parseInt(window.scaleCntrolValue.value, 10) + STEP;

  if (scaleBigger >= MAX_SCALE) {
    scaleBigger = MAX_SCALE;
  }
  window.scaleCntrolValue.value = scaleBigger + '%';

  window.imageUploadPreviewElement.style.transform =
    'scale(' + scaleBigger / 100 + ')';
};

scaleControlSmaller.addEventListener('click', function () {
  outZoom();
});

scaleControlBigger.addEventListener('click', function () {
  inZoom();
});
