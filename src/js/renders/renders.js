import svg from '../../images/sprite.svg';

export function measureRating(position, pating) {
  if (position <= pating) {
    return 'rate-item-active';
  }
  return 'rate-item';
}

function checkOnFavor(id) {
  const storage = localStorage.getItem('favorites');
  const data = JSON.parse(storage);
  if (storage && data.find(el => el.id === id)) {
    return 'active';
  }
  return '';
}

export function ratingScale(rating) {
  return `<ul class='rate-list'>
             <li class=${measureRating(1, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${svg}#star'></use>
              </svg>
            </li>
            <li class=${measureRating(2, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${svg}#star'></use>
              </svg>
            </li>
            <li class=${measureRating(3, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${svg}#star'></use>
              </svg>
            </li>
            <li class=${measureRating(4, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${svg}#star'></use>
              </svg>
            </li>
            <li class=${measureRating(5, rating)}>
              <svg class='star-icon' width='18' height='18'>
                <use href='${svg}#star'></use>
              </svg>
            </li>
          </ul>`;
}

function renderItem(title, description, preview, rating, id, category) {
  const infoRecipe = {
    title: title,
    description: description.replace("'", ''),
    preview: preview,
    rating: rating,
    id: id,
    category: category,
  };

  const fixRating = rating > 5 ? Number(5).toFixed(1) : rating.toFixed(1);
  return `<div data-category='${category}' class='recipe-item animate__animated animate__fadeIn' 
                style='
                      background: linear-gradient(0deg, rgba(5, 5, 5, 0.6),
                      rgba(5, 5, 5, 0)),
                      url(${preview}); 
                      background-position: center;
                      background-size: cover;'>

                  <div class='inter-box'>

                    <button type='button' 
                    class='favorite-btn ${checkOnFavor(id)}'
                    data-info='${JSON.stringify(infoRecipe)}'
                    name='favorite'>
                      <svg class='heart-icon' width='22' height='22'>
                          <use href='${svg}#heart'></use>
                        </svg>
                    </button> 

                    <h2 class='title-item overflow-ellipsis'>${title}</h2>
                    <p class='title-descr ellipsis-multiline'>${description}</p>

                    <div class='rate-details-box'>
                    <p class='rate'>${fixRating}</p>
                    ${ratingScale(fixRating)}
                    <button type='button' name='details' class='button item-rec' data-id=${id}>See recipe</button>
                    </div>
                  </div>
                </div>`;
}

export default renderItem;
