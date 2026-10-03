const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.service-card');

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
    button.classList.add('active');
    button.setAttribute('aria-selected','true');
    const selected = button.dataset.filter;
    cards.forEach(card => {
      const cats = card.dataset.cat.split(' ');
      card.classList.toggle('hidden', selected !== 'all' && !cats.includes(selected));
    });
  });
});

const requestForm = document.getElementById('requestForm');
const formNote = document.getElementById('formNote');
const maxProfile = 'https://max.ru/u/f9LHodD0cOL3pQyr5XkDK6MVtNHawLKkdbONwLSyoOXOts-p8-sgm9h1b4g';
const telegramUsername = 'ZatochkaSurgut';
const whatsappPhone = '79028549859';

function buildRequestText() {
  const data = new FormData(requestForm);
  const name = (data.get('name') || '').trim();
  const service = data.get('service') || '';
  const comment = (data.get('comment') || '').trim();
  return [
    'Здравствуйте! Хочу записаться в Студию заточки «Алмаз».',
    name ? `Имя: ${name}` : '',
    `Инструмент: ${service}`,
    comment ? `Комментарий: ${comment}` : ''
  ].filter(Boolean).join('\n');
}

requestForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = buildRequestText();
  window.open(`https://t.me/${telegramUsername}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

document.getElementById('sendWhatsApp').addEventListener('click', () => {
  const text = buildRequestText();
  window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
});

document.getElementById('sendMax').addEventListener('click', async () => {
  const text = buildRequestText();
  try {
    await navigator.clipboard.writeText(text);
    formNote.textContent = 'Текст заявки скопирован. Вставьте его в открывшийся чат MAX.';
  } catch (_) {
    formNote.textContent = 'Открылся MAX. Если текст не скопировался автоматически, отправьте сообщение вручную.';
  }
  window.open(maxProfile, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
