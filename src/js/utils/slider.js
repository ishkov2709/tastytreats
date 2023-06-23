import Swiper, { Pagination } from 'swiper';
import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/pagination/pagination-element.min.css'

import { findMasterClasses } from "../service/API"

const refs = {
  swiper: document.querySelector('.swiper-wrapper')
}

createSlider()

async function createSlider() {
    try {
        const markup = await generateIventsMarkup()
      await addIventsInSlick(markup);
    
      new Swiper(".swiper", {
       modules: [Pagination],
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
    } catch {
    }
}

async function generateIventsMarkup() {
    try {
        const ivents = await findMasterClasses()
    return ivents.reduce((markup, ivent) => markup + createMarkup(ivent), "")
    } catch {

    }
}

function createMarkup(ivent) {
    const { name, previewUrl, area } = ivent.topic;
    const cookName = ivent.cook.name;
    const cookImgUrl = ivent.cook.imgUrl;
  return `<div class="swiper-slide">
    <div class="slide-item">
      <img
        class="slider-cook"
        src="${cookImgUrl}"
        alt="${cookName}"
      />
      <div class="slide-ivent-box">
        <img
          class="slider-ivent"
          src="${previewUrl}"
          alt=""
        />
        <div class="ivent-info-box">
        <p class="ivent-title">${name}</p>
        <p class="ivent-country">${area}</p>
        </div>
      </div>
      <div
        class="dish-box"
        style="
          background-image: url('${previewUrl}');
        ">
        </div>
    </div>
</div>
    `
}

function addIventsInSlick(markup) {
    refs.swiper.insertAdjacentHTML("beforeend", markup)
}


