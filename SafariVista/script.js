document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-cta');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('nav-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navbar.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const tripForm = document.querySelector('.trip-form');
  const bookingForm = document.getElementById('bookingForm');

  const showStatus = (selector, message, type) => {
    const status = document.querySelector(`[data-form="${selector}"]`);
    if (!status) return;

    status.textContent = message;
    status.classList.remove('success', 'error');
    status.classList.add(type, 'visible');

    setTimeout(() => {
      status.classList.remove('visible');
    }, 2600);
  };

  if (tripForm) {
    tripForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const destination = tripForm.querySelector('#destination');
      const experience = tripForm.querySelector('#experience');

      if (!destination || !experience) {
        showStatus('trip', 'Please select your travel preferences.', 'error');
        return;
      }

      if (destination.value === 'Select destination' || experience.value === 'What interests you?') {
        showStatus('trip', 'Please choose a destination and experience.', 'error');
        return;
      }

      showStatus('trip', `Your ${experience.value.toLowerCase()} to ${destination.value} is ready to plan.`, 'success');
      tripForm.reset();
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = bookingForm.querySelector('#name');
      const email = bookingForm.querySelector('#email');

      if (!name || !email || !name.value.trim() || !email.value.trim()) {
        showStatus('booking', 'Please complete your name and email before sending.', 'error');
        return;
      }

      showStatus('booking', 'Your safari enquiry has been sent successfully.', 'success');
      bookingForm.reset();
    });
  }
});
