import { findRecipes } from "../service/API";
const refs = {
    closeModalBtn: document.querySelector(".close-modal"),
    backdropModal: document.querySelector(".backdrop-recipes"),
    modalRecipes: document.querySelector(".modal-recipes-js"),

};
// open\close a modal window
const openModalBtn = document.querySelector(".open-modal-test");
openModalBtn.addEventListener("click", OpenModal);
refs.closeModalBtn.addEventListener("click", CloseModal);
function OpenModal() {
    refs.backdropModal.classList.remove("is-hidden");
    genereteRecipe(openModalBtn.dataset.id);
    ToggleScroll();
}
function CloseModal() {
    refs.backdropModal.classList.add("is-hidden");
    refs.modalRecipes.innerHTML = "";
    ToggleScroll();
}
// bild the page

async function genereteRecipe(id) {
    try {
        const recipe = await findRecipes(id) 
        return addData(CreateMarkup(recipe));
    }
    catch(err) {
        console.error(err);
    }
}
function CreateMarkup(data) {
    const ingr = data.ingredients;
    const src = !data.youtube ? data.thumb : data.youtube.replace('watch?v=', 'embed/');
    const tags = data.tags;
    let tagslist = "";
    if (!tags[0]) {
        // document.querySelector(".recipe-tags").classList.add("is-hidden");
        console.log("Zero");
    } else {
       
        for (let k = 0; k < tags.length; k++){
            tagslist += `<li class="recipe-tag">#${tags[k]}</li>` 
        };
    };
    let ingrList = "";
    for (let i = 0; i < ingr.length; i++){
        ingrList += `<li class="recipe-ingridient">${ingr[i].name} <span class="recipe-ps">${ingr[i].measure}</span></li>`
    };

    return `<div class="recipe-parts">
    <iframe
      class="recipe-frame"
      src="${src}"
      frameborder="0"
      alt="${data.description}"
    ></iframe>
    <div class="recipe-title">
      <h2 class="recipe-title-txt">${data.title}</h2>
      <div class="rating-part">
        <p>${data.rating}?????????</p>
        <p class="recipe-time">${data.time} min</p>
      </div>
      <ul class="ingridients">
        ${ingrList}
      </ul>
    </div>
  </div>
  <ul class="recipe-tags">
    ${tagslist}
  </ul>
  <p class="recipe-instr">${data.instructions}</p>
`;
  
}

function addData(markup) {
    refs.modalRecipes.insertAdjacentHTML("afterbegin", markup)
}
function ToggleScroll() {
    const body = document.querySelector("body");
    body.classList.toggle("overflow-hidden");
}