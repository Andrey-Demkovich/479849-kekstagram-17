'use strict';
// 2.1. Масштаб:

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP = 25;
  var scaleControlSmaller = window.domQery.imgUploadOverlayElement.querySelector(
      '.scale__control--smaller'
  );
  var scaleControlBigger = window.domQery.imgUploadOverlayElement.querySelector(
      '.scale__control--bigger'
  );

  var outZoom = function () {
    var scaleSmaller =
      parseInt(window.domQery.scaleCntrolValue.value, 10) - STEP;

    if (scaleSmaller <= MIN_SCALE) {
      scaleSmaller = MIN_SCALE;
    }
    window.domQery.scaleCntrolValue.value = scaleSmaller + '%';

    window.domQery.imageUploadPreviewElement.style.transform =
      'scale(' + scaleSmaller / 100 + ')';
  };

  var inZoom = function () {
    var scaleBigger =
      parseInt(window.domQery.scaleCntrolValue.value, 10) + STEP;

    if (scaleBigger >= MAX_SCALE) {
      scaleBigger = MAX_SCALE;
    }
    window.domQery.scaleCntrolValue.value = scaleBigger + '%';

    window.domQery.imageUploadPreviewElement.style.transform =
      'scale(' + scaleBigger / 100 + ')';
  };

  scaleControlSmaller.addEventListener('click', function () {
    outZoom();
  });

  scaleControlBigger.addEventListener('click', function () {
    inZoom();
  });
})();
