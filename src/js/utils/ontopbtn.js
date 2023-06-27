import '../../../node_modules/animate.css/animate.css';

window.addEventListener("scroll", handleScroll) 

 
const toTopBtn = document.querySelector('.to-top')
toTopBtn.addEventListener('click', onTopScroll)

 function handleScroll() {
    
      const offsetTrigger = 400;
  const pageOffset = window.pageYOffset;

  pageOffset > offsetTrigger
    ? toTopBtn.classList.remove('is-hidden')
    : toTopBtn.classList.add('is-hidden'); 
}


function onTopScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

