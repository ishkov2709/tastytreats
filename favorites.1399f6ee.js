!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},r=t.parcelRequiredfd9;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){i[e]=t},t.parcelRequiredfd9=r);var a=r("8nrFW");r("eFwyf"),r("7mS1x"),r("8KqBj"),r("bZSqA");var o=r("6PU4E"),l=r("7Mtae"),s=r("5IDkG"),c=(o=r("6PU4E"),r("6JpON")),d={favoriteCategoriesList:document.querySelector(".favorite-categories"),favoriteRecipesList:document.querySelector(".favorite-list"),warning:document.querySelector(".empty-storage"),paginationBox:document.getElementById("pagination"),categoryBtn:document.querySelector(".favorite-categories"),allBtn:document.querySelector(".all-btn"),hiroImg:document.querySelector(".fav-hero"),recipesBox:document.getElementById("image-container"),modal:document.getElementById("scroll-rec")},f="";function u(){var e=window.innerWidth;return e<768?9:e>=768?12:void 0}function v(e,t){for(var n={},i=0;i<e.length;i+=t){n[Math.floor(i/t)+1]=e.slice(i,i+t)}return n}function g(){var e=function(){var e=localStorage.getItem("favorites"),t=JSON.parse(e);return e?t.flatMap((function(e){return e.category})).filter((function(e,t,n){return n.indexOf(e)===t})).reduce((function(e,t){return e+y(t)}),""):""}(),t=JSON.parse(localStorage.getItem("favorites"));d.favoriteRecipesList.innerHTML="",d.favoriteCategoriesList.innerHTML="",t.length&&(d.favoriteCategoriesList.innerHTML="".concat('<button class="button-fav all-btn onActive" name="all">All categories</button>').concat(e)),p()}function p(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=localStorage.getItem("favorites"),n=JSON.parse(t);if(d.allBtn.style.display="none",n.length){d.allBtn.style.display="block";var i=u(),r=v(n,i),a=Object.keys(r).length;a>1?(d.paginationBox.style.display="block",(0,s.default)(e,i,a,p)):d.paginationBox.style.display="none";var o=r[e].reduce((function(e,t){var n=t.title,i=t.description,r=t.preview,a=t.rating,o=t.id,s=t.category;return e+(0,l.default)(n,i,r,a,o,s)}),"");d.favoriteRecipesList.innerHTML=o}else d.warning.classList.remove("is-hidden"),d.allBtn.classList.add("is-hidden"),window.innerWidth<768&&d.hiroImg.classList.add("is-hidden")}function y(e){return'<button class="button-fav">'.concat(e,"</button>")}document.addEventListener("DOMContentLoaded",g),d.categoryBtn.addEventListener("click",(function t(n){var i,r=[];if(d.favoriteRecipesList.innerHTML="",n!==Number(n)&&"BUTTON"===n.target.nodeName){if(function(e){var t=e.target,n=document.querySelector(".onActive");if(!n)return d.allBtn.classList.add("onActive");n.classList.remove("onActive"),t.classList.add("onActive")}(n),"all"===n.target.name)return p();f=n.target.textContent}var o=localStorage.getItem("favorites");r=JSON.parse(o),i=e(a)(r.filter((function(e){return e.category===f})));var c=1;Number(n)===n&&(c=n);var g=u(),y=v(i,g),m=Object.keys(y).length;m>1?(d.paginationBox.style.display="block",(0,s.default)(c,g,m,t)):d.paginationBox.style.display="none";var L=y[c].reduce((function(e,t){var n=t.title,i=t.description,r=t.preview,a=t.rating,o=t.id,s=t.category;return e+(0,l.default)(n,i,r,a,o,s)}),"");d.favoriteRecipesList.innerHTML=L})),d.recipesBox.addEventListener("click",(function(t){var n=t.target;if(n.closest("button")){var i=n.closest("button");"favorite"===i.name&&(function(t){var n,i=JSON.parse(t.dataset.info);t.classList.toggle("active");var r=null!==(n=JSON.parse(localStorage.getItem("favorites")))&&void 0!==n?n:[];if(t.classList.contains("active")){if(r.find((function(e){return e.id===i.id})))return e(c).Notify.info("Recipe was added earlier");localStorage.setItem("favorites",JSON.stringify(e(a)(r).concat([i])))}else localStorage.setItem("favorites",JSON.stringify(e(a)(r.filter((function(e){return e.id!==i.id})))))}(i),function(t){var n=t.closest("div.recipe-item").dataset.category,i=JSON.parse(localStorage.getItem("favorites")),r=i.find((function(e){return e.category===n})),o=e(a)(d.favoriteCategoriesList.children).find((function(e){return e.textContent===n}));!r&&o?o.remove():r&&!o&&d.favoriteCategoriesList.insertAdjacentHTML("beforeend",y(n)),i.length?d.allBtn.style.display="block":d.allBtn.style.display="none"}(n)),"details"===i.name&&(0,o.OpenModal)(i)}})),d.modal.addEventListener("click",(function(e){return e.target.className="save-recipes-btn",g()}))}();
//# sourceMappingURL=favorites.1399f6ee.js.map
