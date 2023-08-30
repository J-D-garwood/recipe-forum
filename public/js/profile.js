const addNewRecipe = async (event) => {
    event.preventDefault();
    document.location.replace('/addnewrecipe');
}

document
        .querySelector(".addNewRecipeBtn")
        .addEventListener("click", addNewRecipe)