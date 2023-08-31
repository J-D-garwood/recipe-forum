$(document).ready(function () {
  let imagesPreview = function (input, placeToInsertImagePreview) {
    if (input.files) {
      let filesAmount = input.files.length;
      for (i = 0; i < filesAmount; i++) {
        let reader = new FileReader();
        reader.onload = function (event) {
          $(
            $.parseHTML(
              '<img style="width: 100%; height: 100%; object-fit: cover;">'
            )
          )
            .attr('src', event.target.result)
            .appendTo(placeToInsertImagePreview);
        };
        reader.readAsDataURL(input.files[i]);
      }
    }
  };
  $('#input-files').on('change', function () {
    $('.preview-images').empty();
    imagesPreview(this, 'div.preview-images');
  });
});

$(document).ready(function () {
  $('#textarea-ingredients').on('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 10 + 'px';
  });
  $('#textarea-instructions').on('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 10 + 'px';
  });
});
