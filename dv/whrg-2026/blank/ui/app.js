const tabs = document.querySelectorAll('.tab');
const navButtons = document.querySelectorAll('.nav-btn');
const rows = [...document.querySelectorAll('.results-table tbody tr')];
const searchInput = document.querySelector('.search input');

function activate(group, target) {
  group.forEach((item) => item.classList.remove('active'));
  target.classList.add('active');
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activate(tabs, tab));
});

navButtons.forEach((button) => {
  button.addEventListener('click', () => activate(navButtons, button));
});

searchInput?.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  rows.forEach((row) => {
    row.hidden = query && !row.textContent.toLowerCase().includes(query);
  });
});

document.querySelectorAll('.play').forEach((button) => {
  button.addEventListener('click', () => {
    button.animate(
      [
        { transform: 'scale(1)' },
        { transform: 'scale(.88)' },
        { transform: 'scale(1)' },
      ],
      { duration: 240, easing: 'ease-out' }
    );
  });
});
