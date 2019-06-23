'use strict';
// 2.1. Масштаб:

(function () {
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
})();
