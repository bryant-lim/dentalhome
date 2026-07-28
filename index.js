document.addEventListener('DOMContentLoaded', () => {
  
  // --- Mobile Menu Toggle ---
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on any link
    const links = navLinks.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // --- Modal & Chatbot Integration ---
  const bookingModal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const bookingForm = document.getElementById('bookingForm');
  const ctaButtons = document.querySelectorAll('.cta-btn');

  // Open Lead Modal when CTA button is clicked
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingModal) {
        bookingModal.classList.add('active');
      }
    });
  });

  // Close Modal
  if (modalClose && bookingModal) {
    modalClose.addEventListener('click', () => {
      bookingModal.classList.remove('active');
    });

    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
      }
    });
  }

  // Handle Form Submission -> Pass visitor details to NXLiveChat.setUserInfo
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstNameInput = document.getElementById('firstName');
      const lastNameInput = document.getElementById('lastName');
      const emailInput = document.getElementById('userEmail');
      const phoneInput = document.getElementById('userPhone');

      const firstName = firstNameInput ? firstNameInput.value.trim() : '';
      const lastName = lastNameInput ? lastNameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';

      if (firstName && lastName && email) {
        // Pass all visitor details to NXLink Live Chat SDK
        if (window.NXLiveChat && typeof window.NXLiveChat.setUserInfo === 'function') {
          window.NXLiveChat.setUserInfo({
            first_name: firstName,
            last_name: lastName,
            name: `${firstName} ${lastName}`,
            email: email,
            phone: phone
          });
        }

        // Close modal after setting user info
        if (bookingModal) {
          bookingModal.classList.remove('active');
        }

        // Open chat window
        const chatButton = document.getElementById('chat-button');
        if (chatButton) {
          chatButton.click();
        } else if (window.NXLiveChat && typeof window.NXLiveChat.showChatBtn === 'function') {
          window.NXLiveChat.showChatBtn();
          setTimeout(() => {
            const reFoundBtn = document.getElementById('chat-button');
            if (reFoundBtn) reFoundBtn.click();
          }, 100);
        }
      }
    });
  }

});

