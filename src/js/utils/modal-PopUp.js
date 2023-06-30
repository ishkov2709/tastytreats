const orderNowBtn = document.querySelector('.order-now-btn');
const modal = document.getElementById('modal');
const sendBtn = document.getElementById('send-btn');
const closeBtn = document.querySelector('.close-btn');

orderNowBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

sendBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('email').value;
  const comment = document.getElementById('comment').value;

  // Виконуємо логіку для відправки даних

  modal.style.display = 'none';
});
