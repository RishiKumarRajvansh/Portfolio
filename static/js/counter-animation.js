// Numerical Counter Animation for Stats
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔢 Counter animation loaded');
    
    // Store original values
    const originalValues = new Map();
    
    // Counter animation function
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format the number
            const displayValue = Math.floor(current);
            const suffix = originalValues.get(element).includes('+') ? '+' : '';
            element.textContent = displayValue + suffix;
        }, 16);
    }
    
    // Enhanced intersection observer for counter animation
    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                
                // Reset animation state
                entry.target.classList.remove('animated');
                
                // Add visual effect
                entry.target.style.transform = 'scale(1.1)';
                entry.target.style.transition = 'transform 0.3s ease';
                
                setTimeout(() => {
                    entry.target.style.transform = 'scale(1)';
                }, 300);
                
                // Start counter animation
                animateCounter(entry.target, target);
                entry.target.classList.add('animated');
                
                console.log(`🎯 Counter animated for target: ${target}`);
            } else {
                // Reset when element leaves viewport
                entry.target.classList.remove('animated');
                if (originalValues.has(entry.target)) {
                    entry.target.textContent = originalValues.get(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Initialize after a delay and also on window load
    setTimeout(() => {
        // Find all stat numbers and observe them
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        statNumbers.forEach(element => {
            // Store original value
            originalValues.set(element, element.textContent);
            counterObserver.observe(element);
        });
        
        console.log(`🔢 Observing ${statNumbers.length} counter elements`);
    }, 400);
    
    // Also initialize on window load
    window.addEventListener('load', () => {
        setTimeout(() => {
            const statNumbers = document.querySelectorAll('.stat-number[data-target]');
            console.log(`🔢 Window load check: ${statNumbers.length} counter elements`);
        }, 100);
    });
});
