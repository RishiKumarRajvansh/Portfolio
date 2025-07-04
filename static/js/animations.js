// Scroll effects and animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Animations.js loaded - DOM ready');
    
    // Consolidated and optimized scroll handler
    let ticking = false;
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';

    // Navigation background and active link updates
    function updateNavigation() {
        const navbar = document.querySelector('.navbar');
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (!navbar) return;

        // Update navbar background based on scroll
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active navigation link
        let current = '';
        const scrollPos = window.scrollY + 100; // Offset for better detection

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Track scroll direction
    function updateScrollDirection() {
        const currentScrollY = window.scrollY;
        const diff = currentScrollY - lastScrollY;
        
        if (Math.abs(diff) > 5) {
            scrollDirection = diff > 0 ? 'down' : 'up';
        }
        
        lastScrollY = currentScrollY;
    }

    // Optimized scroll event handler
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateNavigation();
                updateScrollDirection();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', onScroll, { passive: true });

    console.log('📜 Basic scroll animations initialized');
});
