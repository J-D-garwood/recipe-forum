let iconLike = document.querySelector('#icon-like');
let spanLike = document.querySelector('#span-like');
let recipeLike = document.querySelector('#recipe-likes');
let textareaInstructions = document.querySelector('.resize-instructions');
let textareaIngredients = document.querySelector('.resize-ingredients');

//Calculates the Textarea Height
function calcHeight(value) {
  let numberOfLineBreaks = (value.match(/\n/g) || []).length;
  //// min-height + lines x line-height + padding + border
  let newHeight = 20 + numberOfLineBreaks * 38 + 12 + 2;
  return newHeight;
}

//sets the height of the textArea on size change
function textAreaSize() {
  textareaInstructions.style.height =
    calcHeight(textareaInstructions.value) + 'px';
  textareaInstructions.setAttribute('readonly', true);
  textareaInstructions.style.height = textareaInstructions.scrollHeight;
  textareaIngredients.style.height = textareaIngredients.scrollHeight;
  textareaIngredients.setAttribute('readonly', true);
}
textAreaSize();
new ResizeObserver(textAreaSize).observe(textareaInstructions);
new ResizeObserver(textAreaSize).observe(textareaIngredients);

function setOpacity() {
  if (
    spanLike.getAttribute('class') ===
    'opacity-75 m-4 badge rounded-pill fw-lighter'
  ) {
    spanLike.setAttribute(
      'class',
      'opacity-50 m-4 badge rounded-pill fw-lighter'
    );
  }
}

//when mouse hovers on the like icon
iconLike.addEventListener('mouseover', (event) => {
  setOpacity();
  iconLike.setAttribute('class', 'fa-solid fa-heart fa-fade');
});

//when mouse moves out of the like icon
iconLike.addEventListener('mouseleave', (event) => {
  setOpacity();
  iconLike.setAttribute('class', 'fa-solid fa-heart');
});

//click event of like button. the recipe will be added to the db as favorite with the user id if not liked already
iconLike.addEventListener('click', async (event) => {
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/recipe/like`, {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  //if the user liked the recipe
  // if (response.status === 201) {
  if (result.liked === 1) {
    iconLike.setAttribute('class', 'fa-solid fa-heart');
    const noOfLikes = recipeLike.innerHTML.split(' ');
    const likes = parseInt(noOfLikes[0]) + 1;
    recipeLike.innerHTML = likes + ' likes';
    spanLike.setAttribute(
      'class',
      'opacity-100 m-4 badge rounded-pill fw-lighter'
    );
    return;
  }
  //if the user removed the like for the recipe
  // else if (response.status === 204) {
  else {
    const noOfLikes = recipeLike.innerHTML.split(' ');
    const likes = parseInt(noOfLikes[0]) - 1;
    recipeLike.innerHTML = likes + ' likes';
    spanLike.setAttribute(
      'class',
      'opacity-50 m-4 badge rounded-pill fw-lighter'
    );
  }
  spanLike.setAttribute(
    'style',
    'padding: 10px 10px 10px 10px; color: a2041c;'
  );
});

//to save comment
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
