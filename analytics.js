(function () {
  'use strict';
  const id = Number((window.ALMAZ_CONFIG || {}).metricaId);
  const enabled = Number.isSafeInteger(id) && id > 0;
  window.almazGoal = function (goal, params) {
    if (enabled && typeof window.ym === 'function') {
      try { window.ym(id, 'reachGoal', goal, params || {}); } catch (_) {}
    }
  };
  if (!enabled) return;
  // Имена и комментарии из формы не передаются в аналитику.
  (function (m, e, t, r, i, k, a) {
    m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
    m[i].l = Date.now();
    k = e.createElement(t); a = e.getElementsByTagName(t)[0];
    k.async = true; k.src = r; a.parentNode.insertBefore(k, a);
  })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
  window.ym(id, 'init', { trackLinks: true, accurateTrackBounce: true, clickmap: false, webvisor: false });
  document.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href.startsWith('tel:')) window.almazGoal('click_phone');
    else if (href.startsWith('https://t.me/')) window.almazGoal('click_telegram');
    else if (href.startsWith('https://max.ru/')) window.almazGoal('click_max');
    else if (href.startsWith('https://wa.me/')) window.almazGoal('click_whatsapp');
    else if (href === '#contact') window.almazGoal('open_request');
  });
})();
