import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.js-order-form'),

  inputs: document.querySelectorAll('.order-now-input'),
  inputName: document.querySelector('.js-input-name'),
  inputTel: document.querySelector('.js-input-tel'),
  inputEmail: document.querySelector('.js-input-email'),
  inputComment: document.querySelector('.js-input-comment'),

  btn: document.querySelector('.js-order-btn'),
  btnsOpen: document.querySelectorAll('.js-open-order'),

  backdrop: document.querySelector('.backdrop-recipes'),
};

function submitForm(e) {
  e.preventDefault();

  console.log({
    name: refs.inputName.value,
    tel: refs.inputTel.value,
    email: refs.inputEmail.value,
    comment: refs.inputComment.value,
  });

  Notiflix.Notify.success(
    `Hi, ${refs.inputName.value}. Please confirm the order by email: ${refs.inputEmail.value}`
  );

  refs.inputName.style.borderColor = '';
  refs.inputEmail.style.borderColor = '';
  refs.inputTel.style.borderColor = '';

  e.target.reset();

  addClassHidden();
  removeListeners();
}

function checkInput() {
  let validateName = false;
  let validateEmail = false;
  let validateTel = false;
  if (!isValidName(refs.inputName.value)) {
    refs.inputName.style.borderColor = '#b83245';
  } else {
    refs.inputName.style.borderColor = '#9bb537';
    validateName = true;
  }

  if (!isValidEmail(refs.inputEmail.value)) {
    refs.inputEmail.style.borderColor = '#b83245';
  } else {
    refs.inputEmail.style.borderColor = '#9bb537';
    validateEmail = true;
  }

  if (!isValidPhone(refs.inputTel.value)) {
    refs.inputTel.style.borderColor = '#b83245';
  } else {
    refs.inputTel.style.borderColor = '#9bb537';
    validateTel = true;
  }

  if (validateName && validateEmail && validateTel) {
    refs.btn.disabled = false;
  } else refs.btn.disabled = true;
}

function isValidName(name) {
  const regex = /^[a-zA-Zа-яА-Я\s]{2,30}$/;
  return regex.test(name);
}

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function isValidPhone(phone) {
  const regex = /^\d{10}$/;
  return regex.test(phone);
}

function openModalOrder() {
  removeClassHidden();

  refs.backdrop.addEventListener('click', closeModalHandler);
  window.addEventListener('keydown', onKeydownCloseModalHandler);
}

function onKeydownCloseModalHandler({ code }) {
  if (code === 'Escape') {
    addClassHidden();
    removeListeners();
    return;
  }
}

function removeClassHidden() {
  refs.backdrop.classList.remove('is-hidden-modal');
  refs.form.classList.remove('is-hidden-modal');
  toggleScroll();
}

function addClassHidden() {
  refs.backdrop.classList.add('is-hidden-modal');
  refs.form.classList.add('is-hidden-modal');
  toggleScroll();
}

function closeModalHandler({ currentTarget, target }) {
  if (currentTarget === target || target.closest('.close-modal')) {
    addClassHidden();
    removeListeners();
    return;
  }
}

function removeListeners() {
  refs.backdrop.removeEventListener('click', closeModalHandler);
  window.removeEventListener('keydown', onKeydownCloseModalHandler);
}

function toggleScroll() {
  const body = document.body;
  body.classList.toggle('overflow-hidden');
}

refs.inputs.forEach(el => el.addEventListener('input', checkInput));

refs.form.addEventListener('submit', submitForm);

refs.btnsOpen.forEach(el => el.addEventListener('click', openModalOrder));
