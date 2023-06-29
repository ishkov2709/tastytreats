import Swiper, { Pagination, Autoplay} from 'swiper';
import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/pagination/pagination-element.min.css'
import changeSwiperPagTheme from './switchTheme'

import { findMasterClasses } from "../service/API"

const refs = {
  swiper: document.querySelector('.swiper-wrapper'),
  loader: document.querySelector('.loader'),
  body: document.querySelector('body')
}

createSlider()


 async function createSlider() {
    try {
        const markup = await generateIventsMarkup()
      await addIventsInSlick(markup);
    
      const swiper = await new Swiper(".swiper", {
       modules: [Pagination, Autoplay],
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        },
       autoplay: {
         delay: 6000,
        },
      });

      // const bullets = swiper.pagination.bullets;
      // const bullets2 = document.querySelectorAll('.swiper-pagination-bullet')
      // console.log(bullets2);
      // changeSwiperPagTheme(bullets)
     

    } catch {
    } 
}

async function generateIventsMarkup() {
   refs.loader.classList.remove('visible')
  
    try {
      const ivents = await findMasterClasses()
      refs.loader.classList.add('visible')
      
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


