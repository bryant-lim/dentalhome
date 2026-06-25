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
      
      // Try to find the chat button created by the live chat script
      const chatButton = document.getElementById('chat-button');
      
      if (chatButton) {
        // Trigger click event on the chat button to open live chat
        chatButton.click();
      } else {
        // Fallback: If not immediately loaded, show a loading status and try again
        console.warn('Chat button not found. Checking if NXLiveChat API is available...');
        
        if (window.NXLiveChat && typeof window.NXLiveChat.showChatBtn === 'function') {
          window.NXLiveChat.showChatBtn();
          
          // Re-attempt to click the button in the next animation frame
          setTimeout(() => {
            const reFoundBtn = document.getElementById('chat-button');
            if (reFoundBtn) reFoundBtn.click();
          }, 100);
        } else {
          alert('Initializing live chat... Please try again in a moment.');
        }
      }
    });
  });

});
