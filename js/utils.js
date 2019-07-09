'use strict';

(function () {
  window.onElementEscPress = function (evt, onClose) {
    var ESK_KEYCODE = 27;

    if (evt.keyCode === ESK_KEYCODE) {
      onClose();
    }
  };
})();
