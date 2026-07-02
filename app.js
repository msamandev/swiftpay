/* ============================================================
   SwiftPay — app.js (final)
   Modul: Nav toggle · Billing toggle · Signup form
   Semua fitur di-guard agar aman jika elemen tidak ada.
   ============================================================ */

/* ------------------------------------------------------------
   1) MOBILE NAV TOGGLE — keyboard + pointer + touch
   ------------------------------------------------------------ */
(function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('navmenu');
  if (!toggle || !menu) return; // guard

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // Tutup dengan Escape dan kembalikan fokus ke tombol
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
})();

/* ------------------------------------------------------------
   2) BILLING TOGGLE — harga + catatan dinamis per plan
   ------------------------------------------------------------ */
(function initBilling() {
  const billingBtns = document.querySelectorAll('.billing-toggle button');
  const amounts = document.querySelectorAll('.plan .amount');
  const notes = document.querySelectorAll('.plan .plan-note');
  if (billingBtns.length === 0) return; // guard

  function applyBilling(mode) {
    billingBtns.forEach((b) =>
      b.setAttribute('aria-pressed', String(b.dataset.billing === mode))
    );
    // Setiap .amount punya data-monthly / data-yearly sendiri
    amounts.forEach((a) => {
      if (a.dataset[mode] != null) a.textContent = a.dataset[mode];
    });
    // Setiap .plan-note punya data-* UNIK per plan (Fix #1)
    notes.forEach((n) => {
      if (n.dataset[mode] != null) n.textContent = n.dataset[mode];
    });
  }

  billingBtns.forEach((btn) =>
    btn.addEventListener('click', () => applyBilling(btn.dataset.billing))
  );

  applyBilling('monthly'); // inisialisasi
})();

/* ------------------------------------------------------------
   3) SIGNUP / CONTACT FORM — validasi + loading + error + success
   ------------------------------------------------------------ */
(function initForm() {
  const form = document.querySelector('.signup-form');
  if (!form) return; // guard

  const submitBtn = form.querySelector('button[type="submit"]');
  const formError = document.querySelector('.form-error');
  const success = document.querySelector('.form-success');

  const rules = {
    name: (v) => (v.trim() ? '' : 'Enter your full name.'),
    email: (v) =>
      !v.trim()
        ? 'Enter your email address.'
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? ''
        : 'Enter a valid email address.',
    message: (v) => (v.trim() ? '' : 'Tell us how we can help.'),
  };

  function setFieldError(id, msg) {
    const input = document.getElementById(`f-${id}`);
    const err = document.getElementById(`e-${id}`);
    if (!input) return true; // field tak ada → anggap valid (guard)

    input.setAttribute('aria-invalid', String(!!msg));
    if (msg) {
      input.setAttribute('aria-describedby', `e-${id}`);
      if (err) { err.textContent = msg; err.hidden = false; }
    } else {
      input.removeAttribute('aria-describedby');
      if (err) err.hidden = true;
    }
    return !msg;
  }

  // Bersihkan error saat pengguna memperbaiki field
  Object.keys(rules).forEach((field) => {
    const input = document.getElementById(`f-${field}`);
    if (!input) return;
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true') {
        setFieldError(field, rules[field](input.value));
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (formError) formError.hidden = true;

    let firstInvalid = null;
    let valid = true;

    for (const field of Object.keys(rules)) {
      const input = document.getElementById(`f-${field}`);
      if (!input) continue; // Fix #2 — guard null
      const ok = setFieldError(field, rules[field](input.value));
      if (!ok && !firstInvalid) firstInvalid = field;
      valid = valid && ok;
    }

    if (!valid) {
      // Pindahkan fokus ke field invalid pertama (a11y)
      document.getElementById(`f-${firstInvalid}`)?.focus();
      return;
    }

    // ---- Loading state ----
    if (submitBtn) {
      submitBtn.classList.add('is-loading');
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.textContent = 'Sending…';
    }

    try {
      // Simulasi request — ganti dengan fetch() ke API asli
      await new Promise((res, rej) =>
        setTimeout(() => (Math.random() > 0.15 ? res() : rej()), 1200)
      );

      // ---- Success state ----
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus(); // Fix #3 — elemen harus punya tabindex="-1"
      }
    } catch {
      // ---- Error state ----
      if (formError) {
        formError.textContent =
          'Something went wrong. Please try again in a moment.';
        formError.hidden = false;
      }
    } finally {
      if (submitBtn) {
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
        submitBtn.textContent = 'Request access';
      }
    }
  });
})();