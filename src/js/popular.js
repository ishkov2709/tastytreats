
import axios from "axios";

async function fetchPopularRecipes() {
    const url = `https://tasty-treats-backend.p.goit.global/api/recipes/popular`
    const res = await axios.get(url);
    return res.data;
}

const popularList = document.querySelector('.js-popular-list');
document.addEventListener("DOMContentLoaded", onReload);

async function onReload(){
    try {
        const markup = await generatePopularRecipeListMarkup();
        if(markup === undefined) throw new Error;
       
       updateRecipeList(markup); 

    } catch(err) {
        onError(err);
    }
}

async function generatePopularRecipeListMarkup(){
    try {
       const popularRecipes = await fetchPopularRecipes();
       return popularRecipes.reduce((markup, recipeCard) => markup + renderPopularRecipeMarkup(recipeCard), '')

   } catch(err) {
       onError(err);
   }
}

function renderPopularRecipeMarkup({title, description, _id, preview}){
    return `
    <li class="list-item" data-id="${_id}">
        <img class="img-popular" src="${preview}" alt="${title}">
        <div class="popular-text">
            <h3 class="popular-title">${title}</h3>
            <p class="popular-desc">${description}</p>
        </div>
    </li>
    `
}

function updateRecipeList(markup){
    popularList.insertAdjacentHTML('beforeend', markup);
}

function onError(){ 
    popularList.innerHTML = '';
}

