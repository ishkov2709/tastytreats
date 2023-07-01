const refs = {
  form: document.querySelector('.js-order-form'),
  inputs: document.querySelectorAll('.js-order-input'),
  btn: document.querySelector('.js-order-btn'),
};

const obj = {};

refs.inputs.forEach(el =>
  el.addEventListener('input', e => {
    obj[el.name] = el.value;
    if (
      Object.keys(obj).length <= 3 &&
      Object.values(obj).some(el => el == '')
    ) {
      refs.btn.disabled = true;
    } else if (
      Object.keys(obj).length === 3 &&
      Object.values(obj).some(el => el !== '')
    ) {
      refs.btn.disabled = false;
    }
    console.log(Object.values(obj));
  })
);

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(e.target.elements.name.value);
  console.log(e.target.elements.tel.value);
  console.log(e.target.elements.email.value);
  console.log(e.target.elements.comment.value);

  e.target.elements.name.value = '';
  e.target.elements.tel.value = '';
  e.target.elements.email.value = '';
  e.target.elements.comment.value = '';
});
