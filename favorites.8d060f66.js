!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},n=e.parcelRequiredfd9;null==n&&((n=function(e){if(e in t)return t[e].exports;if(e in r){var n=r[e];delete r[e];var o={id:e,exports:{}};return t[e]=o,n.call(o.exports,o,o.exports),o.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},e.parcelRequiredfd9=n),n("eFwyf"),n("7mS1x"),n("8KqBj"),n("6PU4E");var o=n("7Mtae"),i={categoryBtn:document.querySelector(".favorite-categories"),favoriteCategoriesList:document.querySelector(".rendered-buttons"),favoriteRecipesList:document.querySelector(".favorite-list"),warning:document.querySelector(".empty-storage")};console.log(i.warning),document.addEventListener("DOMContentLoaded",(function(){var e=function(){var e=localStorage.getItem("favorites"),t=JSON.parse(e);if(e)return t.reduce((function(e,t){var r=t.title,n=t.description,i=t.preview,a=t.rating,c=t.id;return e+(0,o.default)(r,n,i,a,c)}),"");i.warning.classList.remove("isHidden")}(),t=(r=localStorage.getItem("favorites"),n=JSON.parse(r),console.log(n),r?n.flatMap((function(e){return e.category})).filter((function(e,t,r){return r.indexOf(e)===t})).reduce((function(e,t){return e+function(e){return'<li><button class="button-fav">'.concat(e,"</button></li>")}(t)}),""):"");var r,n;if(!e)throw new Error("No result");i.favoriteRecipesList.insertAdjacentHTML("beforeend",e),i.favoriteCategoriesList.insertAdjacentHTML("beforeend",t)})),i.warning.classList.add("isHidden"),i.categoryBtn.addEventListener("click",(function(e){i.favoriteRecipesList.innerHTML="";var t=e.target.textContent,r=localStorage.getItem("favorites"),n=JSON.parse(r).filter((function(e){return e.category===t}));console.log(n);var a=function(e){return e.reduce((function(e,t){var r=t.title,n=t.description,i=t.preview,a=t.rating,c=t.id;return e+(0,o.default)(r,n,i,a,c)}),"")}(n);if(console.log(a),!a)throw new Error("No result");i.favoriteRecipesList.insertAdjacentHTML("beforeend",a)}))}();
//# sourceMappingURL=favorites.8d060f66.js.map