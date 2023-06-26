const header = document.getElementById('js-header');
const checkBoxes = document.querySelectorAll('.toggle-checkbox');
const body = document.body;

// Start

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);

  if (savedTheme === 'dark') {
    checkBoxes.forEach(el => (el.checked = true));
  }
}

header.addEventListener('click', ({ target }) => {
  if (target.name === 'switch-theme') {
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      body.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light');
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }
});
