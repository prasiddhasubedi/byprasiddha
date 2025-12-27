// Add subtle animations and interactions
document.addEventListener('DOMContentLoaded', function() {
  // Animate stanzas on scroll
  const stanzas = document.querySelectorAll('.stanza');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Initially hide stanzas and set up animation
  stanzas.forEach((stanza, index) => {
    stanza.style.opacity = '0';
    stanza.style.transform = 'translateY(20px)';
    stanza.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(stanza);
  });
  
  // Add floating animation to decorative elements
  const floralElements = document.querySelectorAll('.floral-bg');
  
  floralElements.forEach((element, index) => {
    element.style.animation = `float ${3 + index}s ease-in-out infinite`;
  });
  
  // Create floating keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
      50% { transform: translateY(-10px) rotate(var(--rotation, 0deg)); }
    }
  `;
  document.head.appendChild(style);
  
  // Set rotation variables for floral elements
  document.querySelector('.floral-1').style.setProperty('--rotation', '-15deg');
  document.querySelector('.floral-2').style.setProperty('--rotation', '25deg');
  document.querySelector('.floral-3').style.setProperty('--rotation', '-10deg');
  
  // Add click effect to title
  const title = document.querySelector('.main-title');
  title.addEventListener('click', function() {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1.02)';
    }, 150);
  });
  
  // Add subtle parallax effect to background elements
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    
    floralElements.forEach((element, index) => {
      const speed = 0.2 + (index * 0.1);
      element.style.transform += ` translateY(${parallax * speed}px)`;
    });
  });
});
