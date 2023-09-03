const addNewRecipe = async (event) => {
  event.preventDefault();
  document.location.replace('/addnewrecipe');
};

document
  .querySelector('.addNewRecipeBtn')
  .addEventListener('click', addNewRecipe);

$(document).ready(function () {
  // $('.text-container').addClass('hidden');

  $('.text-container').click(function () {
    var $this = $(this);

    if ($this.hasClass('hidden')) {
      $(this).removeClass('hidden').addClass('visible');
    } else {
      $(this).removeClass('visible').addClass('hidden');
    }
  });
});
