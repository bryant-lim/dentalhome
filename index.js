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

  // --- Chatbot Trigger Integration ---
  const ctaButtons = document.querySelectorAll('.cta-btn');
  
  ctaButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
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
    });
  });

});

