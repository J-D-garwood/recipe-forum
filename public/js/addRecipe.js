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
  $('#textarea-ingredients').on('input', function () {
    let numberOfLineBreaks = (
      $('#textarea-ingredients').val().match(/\n/g) || []
    ).length;
    // alert(this.scrollHeight);
    if (numberOfLineBreaks < 9) {
      this.style.height = 'auto';
    }
    if (this.scrollHeight >= 341) {
      let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
      this.style.height = newHeight;
      this.style.height = this.scrollHeight;
      this.style.height = this.scrollHeight + 10 + 'px';
    }
  });
  $('#textarea-instructions').on('input', function () {
    let numberOfLineBreaks = (
      $('#textarea-instructions').val().match(/\n/g) || []
    ).length;
    if (numberOfLineBreaks < 9) {
      this.style.height = 'auto';
    } else {
      if (this.scrollHeight >= 341) {
        let newHeight = 20 + numberOfLineBreaks * 20 + 12 + 2;
        this.style.height = newHeight;
        this.style.height = this.scrollHeight + 10 + 'px';
      }
    }
  });
});

// $(document).ready(function () {
//   $('#textarea-ingredients').on('input', function () {
//     this.style.height = 'auto';
//     this.style.height = this.scrollHeight + 10 + 'px';
//   });
//   $('#textarea-instructions').on('input', function () {
//     this.style.height = 'auto';
//     this.style.height = this.scrollHeight + 10 + 'px';
//   });
// });
