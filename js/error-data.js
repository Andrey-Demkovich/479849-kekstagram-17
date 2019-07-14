'use strict';
// Сообщение об ошибке при работе с сервером

(function () {
  var TIMEOUT_ERROR = 3000; // 3c

  window.onError = function (message) {
    scrollTo(0, 0);

    var divErrorElement = document.createElement('div');
    divErrorElement.style =
      'margin: 0 auto; padding: 15px 0; font-size: 30px; text-align: center; background-color: #ff4e4e';
    divErrorElement.style.position = 'absolute';
    divErrorElement.style.zIndex = '100';
    divErrorElement.style.left = 0;
    divErrorElement.style.right = 0;

    divErrorElement.textContent = message;

    document.body.insertAdjacentElement('afterbegin', divErrorElement);

    setTimeout(function () {
      divErrorElement.classList.add('hidden');
    }, TIMEOUT_ERROR);
  };
})();
