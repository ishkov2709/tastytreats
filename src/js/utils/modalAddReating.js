import Notiflix from 'notiflix'; 
import { getRating } from '../service/API';

const modal = document.getElementById("modal");
    const openButton = document.getElementById("addrating");
    const closeButton = document.querySelector(".close");
    const stars = document.querySelectorAll(".star");
    const ratingForm = document.getElementById("ratingForm");
    const emailInput = document.getElementById("email");
    const ratingCount = document.getElementById("ratingCount");

    let rating = 0.0;

    function openModal() {
      modal.style.display = "block";
    }

    function closeModal() {
      modal.style.display = "none";
      resetForm();
    }

    function resetForm() {
      rating = 5;
      emailInput.value = "";
      stars.forEach((star, index) => {
        star.classList.remove("checked");
        if (index < rating) {
          star.classList.add("checked");
        }
      });
      updateRatingCount();
    }

    function updateRatingCount() {
      ratingCount.textContent = `${rating}.0`;
    }

    function highlightStars(index) {
      stars.forEach((star, i) => {
        if (i <= index) {
          star.classList.add("checked");
        } else {
          star.classList.remove("checked");
        }
      });
    }

    function handleStarClick(event) {
      const starIndex = Array.from(stars).indexOf(event.target);
      rating = starIndex + 1;
      highlightStars(starIndex);
      updateRatingCount();
    }

    function handleFormSubmit(event) {
      event.preventDefault();
      const recipeId = "your_recipe_id"; // Заміни це на recipeId
      const data = {
        rate: rating,
        email: emailInput.value.trim(),
      };

      if (data.email === "" || data.rate === undefined) {
        Notiflix.Notify.failure("Будь ласка, заповніть усі поля форми.");
        return;
      }

      getRating()
        .then(() => {
          Notiflix.Notify.success("Рейтинг успішно додано.");
          closeModal();
        })
        .catch(() => {
          Notiflix.Notify.failure("Помилка при додаванні рейтингу.");
        });
    }

    openButton.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
    stars.forEach((star, index) => {
      star.addEventListener("click", handleStarClick);
      star.addEventListener("mouseover", () => {
        highlightStars(index);
      });
    });
    ratingForm.addEventListener("submit", handleFormSubmit);

    
    updateRatingCount();