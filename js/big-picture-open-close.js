'use strict';

(function () {
  var bigPictureCancelElement = window.bigPictureElement.querySelector(
      '.big-picture__cancel'
  );

  var closebigPicture = function () {
    window.bigPictureElement.classList.add('hidden');
  };

  bigPictureCancelElement.addEventListener('click', closebigPicture);

  window.picturesContainerElement.addEventListener('click', function (evt) {
    var target = evt.target;
    console.log('target:', target);
    var picture = target.closest('.picture');
    console.log('picture:', picture);
    if (!picture) {
      return;
    }

    var fil = window.XhrDataImgPosts.filter(function (object) {
      return object.url === target.getAttribute('src');
    })[0];
    console.log(fil);
    window.bigPictureElement.classList.remove('hidden');
    window.createBigPicture(fil);
  });
})();
