function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},o=t.parcelRequiredfd9;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){i[e]=t},t.parcelRequiredfd9=o),o("9c7ox"),o("lF9VE"),o("18cvE"),o("aahN2");var a=o("2LJO6"),r=o("cYlGq"),s=o("JcIhZ"),l=(a=o("2LJO6"),o("7Y9D8"));const c={favoriteCategoriesList:document.querySelector(".favorite-categories"),favoriteRecipesList:document.querySelector(".favorite-list"),warning:document.querySelector(".empty-storage"),paginationBox:document.getElementById("pagination"),categoryBtn:document.querySelector(".favorite-categories"),allBtn:document.querySelector(".all-btn"),hiroImg:document.querySelector(".fav-hero"),recipesBox:document.getElementById("image-container")};let d="";function f(){const e=window.innerWidth;return e<768?9:e>=768?12:void 0}function u(e,t){const n={};for(let i=0;i<e.length;i+=t){n[Math.floor(i/t)+1]=e.slice(i,i+t)}return n}function g(e=1){const t=localStorage.getItem("favorites"),n=JSON.parse(t);if(c.allBtn.style.display="none",t){c.allBtn.style.display="block";const t=f(),i=u(n,t),o=Object.keys(i).length;o>1?(c.paginationBox.style.display="block",(0,s.default)(e,t,o,g)):c.paginationBox.style.display="none";const a=i[e].reduce(((e,{title:t,description:n,preview:i,rating:o,id:a,category:s})=>e+(0,r.default)(t,n,i,o,a,s)),"");c.favoriteRecipesList.innerHTML=a}else c.warning.classList.remove("is-hidden"),c.allBtn.classList.add("is-hidden"),window.innerWidth<768&&c.hiroImg.classList.add("is-hidden")}function p(e){return`<button class="button-fav">${e}</button>`}document.addEventListener("DOMContentLoaded",(function(){const e=function(){const e=localStorage.getItem("favorites"),t=JSON.parse(e);return e?t.flatMap((e=>e.category)).filter(((e,t,n)=>n.indexOf(e)===t)).reduce(((e,t)=>e+p(t)),""):""}();c.favoriteCategoriesList.insertAdjacentHTML("beforeend",e),g()})),c.categoryBtn.addEventListener("click",(function e(t){let n,i=[];if(c.favoriteRecipesList.innerHTML="",t!==Number(t)&&"BUTTON"===t.target.nodeName){if(function({target:e}){const t=document.querySelector(".onActive");if(!t)return c.allBtn.classList.add("onActive");t.classList.remove("onActive"),e.classList.add("onActive")}(t),"all"===t.target.name)return g();d=t.target.textContent}const o=localStorage.getItem("favorites");i=JSON.parse(o),n=[...i.filter((e=>e.category===d))];let a=1;Number(t)===t&&(a=t);const l=f(),p=u(n,l),v=Object.keys(p).length;v>1?(c.paginationBox.style.display="block",(0,s.default)(a,l,v,e)):c.paginationBox.style.display="none";const y=p[a].reduce(((e,{title:t,description:n,preview:i,rating:o,id:a,category:s})=>e+(0,r.default)(t,n,i,o,a,s)),"");c.favoriteRecipesList.innerHTML=y})),c.recipesBox.addEventListener("click",(function({target:t}){if(!t.closest("button"))return;const n=t.closest("button");"favorite"===n.name&&(function(t){const n=JSON.parse(t.dataset.info);var i;t.classList.toggle("active");const o=null!==(i=JSON.parse(localStorage.getItem("favorites")))&&void 0!==i?i:[];if(t.classList.contains("active")){if(o.find((e=>e.id===n.id)))return e(l).Notify.info("Recipe was added earlier");localStorage.setItem("favorites",JSON.stringify([...o,n]))}else localStorage.setItem("favorites",JSON.stringify([...o.filter((e=>e.id!==n.id))]))}(n),function(e){const t=e.closest("div.recipe-item").dataset.category,n=JSON.parse(localStorage.getItem("favorites")),i=n.find((e=>e.category===t)),o=[...c.favoriteCategoriesList.children].find((e=>e.textContent===t));!i&&o?o.remove():i&&!o&&c.favoriteCategoriesList.insertAdjacentHTML("beforeend",p(t)),n.length?c.allBtn.style.display="block":c.allBtn.style.display="none"}(t)),"details"===n.name&&(0,a.OpenModal)(n)}));
//# sourceMappingURL=favorites.77010400.js.map
