const themeToggle = document.getElementById('themeToggle');
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const clock = document.getElementById('clock');
const cards = document.querySelectorAll('.card');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  document.querySelector('meta[name="theme-color"]').setAttribute(
    'content',
    theme === 'light' ? '#f8fafc' : '#0f172a'
  );
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleString('zh-CN', {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

updateClock();
setInterval(updateClock, 1000);

function filterCards() {
  const keyword = searchInput.value.trim().toLowerCase();

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const keywords = (card.dataset.keywords || '').toLowerCase();
    const show = keyword === '' || text.includes(keyword) || keywords.includes(keyword);
    card.classList.toggle('hidden', !show);
  });
}

searchInput.addEventListener('input', filterCards);

clearBtn.addEventListener('click', () => {
  searchInput.value = '';
  filterCards();
  searchInput.focus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    searchInput.value = '';
    filterCards();
  }
});
