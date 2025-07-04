// Testimonials functionality
document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Navigation Functions
    let currentTestimonial = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialContainer = document.querySelector('.testimonial-cards-container');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');

    function updateTestimonials() {
        if (!testimonialContainer || !testimonialCards.length) return;

        // Update container transform
        const translateX = -(currentTestimonial * 25); // 25% per testimonial
        testimonialContainer.style.transform = `translateX(${translateX}%)`;

        // Update active card
        testimonialCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentTestimonial);
        });

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentTestimonial);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        updateTestimonials();
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        updateTestimonials();
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        updateTestimonials();
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToTestimonial(index));
    });

    // Auto-advance testimonials (optional)
    let autoAdvanceInterval;

    function startAutoAdvance() {
        autoAdvanceInterval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
    }

    function stopAutoAdvance() {
        if (autoAdvanceInterval) {
            clearInterval(autoAdvanceInterval);
            autoAdvanceInterval = null;
        }
    }

    // Pause auto-advance on hover
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', stopAutoAdvance);
        testimonialCarousel.addEventListener('mouseleave', startAutoAdvance);
    }

    // Initialize testimonials on page load
    if (testimonialCards.length > 0) {
        updateTestimonials();
        startAutoAdvance();
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!testimonialCarousel) return;
        
        // Only handle keyboard if testimonials are in view
        const rect = testimonialCarousel.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevTestimonial();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextTestimonial();
            }
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        testimonialCarousel.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous
                prevTestimonial();
            } else {
                // Swipe left - go to next
                nextTestimonial();
            }
        }
    }

    // Expose functions globally for potential external control
    window.testimonialNavigation = {
        next: nextTestimonial,
        prev: prevTestimonial,
        goTo: goToTestimonial,
        startAuto: startAutoAdvance,
        stopAuto: stopAutoAdvance
    };
});
