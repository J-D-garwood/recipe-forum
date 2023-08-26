// Dealing with Textarea Height
function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  // min-height + lines x line-height + padding + border
  let newHeight = 20 + numberOfLineBreaks * 40 + 12 + 2;
  return newHeight;
}

let textarea = document.querySelector('.resize-ta');
// textarea.addEventListener('onchange', () => {
textarea.style.height = calcHeight(textarea.value) + 'px';
textarea.setAttribute('readonly', true);

let textareaIn = document.querySelector('.resize-ingredients');
textareaIn.style.height = calcHeight(textareaIn.value) + 'px';
textareaIn.setAttribute('readonly', true);
// textarea.setAttribute('readonly', true);
// });
let iconLove = document.querySelector('#love');
let iconBeat = document.querySelector('#beat');
let likeLink = document.querySelector('#like-link');
iconLove.addEventListener('click', (event) => {
  alert(hello);
  iconBeat.setAttribute('visibility', true);
});
$('#love').on('click', function () {
  alert(hello);
});

iconLove.addEventListener('mouseover', (event) => {
  likeLink.setAttribute('class', 'opacity-100 position-relative');
  iconLove.setAttribute('class', 'fa-solid fa-heart fa-fade fa-lg');
  iconLove.setAttribute('style', 'color: #9c162a;');
});
iconLove.addEventListener('mouseleave', (event) => {
  // var color = $(this).css('background-color');

  // if (color === '#9c162a') {
  //   iconLove.setAttribute('style', 'color:#c47f88;');
  // }
  iconLove.setAttribute('class', 'fa-solid fa-heart');
});

iconLove.addEventListener('click', (event) => {
  likeLink.setAttribute('class', 'opacity-100 position-relative');
  iconLove.setAttribute('class', 'fa-solid fa-heart');
  var color = $(this).css('background-color');
  console.log(color);
  if (color !== '#9c162a') {
    iconLove.setAttribute('style', 'color: #9c162a;');
  } else {
    iconLove.setAttribute('style', 'color: #c47f88;');
  }
});

const newFormHandler = async (event) => {
  event.preventDefault();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const comment = document.querySelector('#text-comment').value.trim();
  if (comment) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace(`/recipe/${id}`);
    } else {
      alert('Failed to save comment');
    }
  }
};
document
  .querySelector('.comment-form')
  .addEventListener('submit', newFormHandler);
