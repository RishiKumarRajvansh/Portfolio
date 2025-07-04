/* Main JavaScript file - minimal remaining functionality after modularization */

/* All major functionality has been moved to separate JS files:
 * - navigation.js: Mobile navigation toggle and smooth scrolling
 * - hero.js: Typewriter animation for the hero section
 * - animations.js: Scroll effects, intersection observer, and animations
 * - contact.js: Contact form handling and notifications
 * - testimonials.js: Testimonials carousel functionality
 * - doodle.js: Floating doodles and technical animations
 * - starfield.js: Starfield background effects
 */

// Any remaining global functionality can be added here
console.log('Portfolio JavaScript modules loaded successfully');

// Global utility functions can be added here if needed
window.portfolioUtils = {
    // Add any shared utility functions here
    log: function(message) {
        console.log('[Portfolio]', message);
    },
    
    // Example utility function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Initialize any global event listeners or setup here if needed
document.addEventListener('DOMContentLoaded', function() {
    window.portfolioUtils.log('Portfolio fully loaded and initialized');
});
