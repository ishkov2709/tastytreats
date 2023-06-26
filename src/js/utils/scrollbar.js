import SmoothScrollbar from 'smooth-scrollbar';
import { fetchCategories } from "../service/API"

function createCategoryButton(category, onClick) {
    const button = document.createElement('button');
    button.textContent = category;
    button.addEventListener('click', onClick);
    return button;
  }
  
  async function createCategoriesBlock() {
    const categoriesContainer = document.getElementById('categoriesContainer');
    const scrollContent = categoriesContainer.querySelector('.scroll-content');
  
    scrollContent.innerHTML = '';
    const categories = await fetchCategories();
  
    const allCategoriesButton = createCategoryButton('All categories', () => {
      console.log('Вибрано всі категорії');
      categoryButtons.forEach(button => {
        button.classList.remove('active');
      });
    });
  
    scrollContent.appendChild(allCategoriesButton);
  
    const categoryButtons = [];
  
    categories.forEach(category => {
      const button = createCategoryButton(category.name, () => {
       
        console.log(`Вибрано категорію: ${category.name}`);
        categoryButtons.forEach(button => {
          button.classList.remove('active');
        });
        
        button.classList.add('active');
      });
  
      categoryButtons.push(button);
      scrollContent.appendChild(button);
    });
  
    const scrollbar = SmoothScrollbar.init(categoriesContainer, {
      alwaysShowTracks: true
    });
  }
  
  createCategoriesBlock();