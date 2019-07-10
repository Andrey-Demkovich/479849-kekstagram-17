'use strict';
// Загружает фото с жесткого диска пользователя в форму редактирования

(function () {
  var PICTURE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  window.uploadFileElement.addEventListener('change', function () {
    var file = window.uploadFileElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = PICTURE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.imageUploadPreviewElement.src = reader.result;
      });
    }

    reader.readAsDataURL(file);
  });
})();
