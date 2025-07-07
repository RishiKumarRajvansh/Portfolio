/**
 * Enhanced Card Interactions
 * Adds enhanced hover effects and interactions to cards
 * Based on the stat-card transparency and hover effects
 */

class EnhancedCardEffects {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCardEffects());
        } else {
            this.setupCardEffects();
        }
    }

    setupCardEffects() {
        // Card selectors for enhanced effects
        const cardSelectors = [
            '.experience-card',
            '.project-card-new', 
            '.about-intro-card',
            '.skills-card',
            '.interests-card',
            '.badge-category',
            '.credly-badge',
            '.embedded-badge-wrapper',
            '.embedded-category',
            '.timeline-item',
            '.contact-link-item',
            '.portfolio-card'
        ];

        cardSelectors.forEach(selector => {
            const cards = document.querySelectorAll(selector);
            cards.forEach(card => this.enhanceCard(card));
        });

        // Initialize embedded badges handling
        this.initEmbeddedBadges();

        // Initialize testimonial carousel
        setTimeout(() => {
            this.initTestimonialCarousel();
        }, 500);

        // Enhanced card effects initialized
        // console.log('✨ Enhanced card effects initialized');
    }

    initEmbeddedBadges() {
        // Handle embedded badge loading and interactions
        const embeddedWrappers = document.querySelectorAll('.embedded-badge-wrapper');
        
        embeddedWrappers.forEach(wrapper => {
            // Add loading state
            wrapper.classList.add('loading');
            
            // Check for iframe load
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1 && node.tagName === 'IFRAME') {
                            wrapper.classList.remove('loading');
                            this.enhanceEmbeddedBadge(wrapper);
                        }
                    });
                });
            });
            
            observer.observe(wrapper, { childList: true, subtree: true });
            
            // Fallback timeout
            setTimeout(() => {
                wrapper.classList.remove('loading');
            }, 5000);
        });
    }

    enhanceEmbeddedBadge(wrapper) {
        if (!wrapper) return;

        // Add hover effects for embedded badges
        wrapper.addEventListener('mouseenter', () => {
            wrapper.style.transform = 'translateY(-8px) scale(1.05)';
            wrapper.style.boxShadow = '0 15px 35px rgba(14, 165, 233, 0.25), 0 0 20px rgba(14, 165, 233, 0.2)';
        });

        wrapper.addEventListener('mouseleave', () => {
            wrapper.style.transform = '';
            wrapper.style.boxShadow = '';
        });

        // Add click interaction
        wrapper.addEventListener('click', (e) => {
            e.preventDefault();
            const iframe = wrapper.querySelector('iframe');
            if (iframe && iframe.src) {
                window.open(iframe.src, '_blank');
            }
        });
    }

    enhanceCard(card) {
        if (!card) return;

        // Add enhanced interaction data
        card.setAttribute('data-enhanced', 'true');

        // Mouse enter effect
        card.addEventListener('mouseenter', (e) => {
            this.onCardHover(e.target);
        });

        // Mouse leave effect
        card.addEventListener('mouseleave', (e) => {
            this.onCardLeave(e.target);
        });

        // Mouse move for subtle parallax effect
        card.addEventListener('mousemove', (e) => {
            this.onCardMove(e);
        });

        // Add ripple effect on click
        card.addEventListener('click', (e) => {
            this.createRippleEffect(e);
        });
    }

    onCardHover(card) {
        // Add hover class for additional CSS effects
        card.classList.add('card-enhanced-hover');
        
        // Slightly enhance z-index to bring card forward
        card.style.zIndex = '20';
        
        // Add subtle glow effect to child elements
        const icons = card.querySelectorAll('i, .icon');
        icons.forEach(icon => {
            icon.style.textShadow = '0 0 15px currentColor';
            icon.style.transition = 'text-shadow 0.3s ease';
        });
    }

    onCardLeave(card) {
        // Remove hover effects
        card.classList.remove('card-enhanced-hover');
        card.style.zIndex = '';
        
        // Reset transform to remove any tilt effects
        card.style.transform = '';
        
        // Remove glow from icons
        const icons = card.querySelectorAll('i, .icon');
        icons.forEach(icon => {
            icon.style.textShadow = '';
        });
    }

    onCardMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // More subtle tilt effect
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        // Apply subtle 3D tilt effect only during hover
        card.style.transform = `
            translateY(-8px) 
            scale(1.02) 
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    }

    createRippleEffect(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.classList.add('card-ripple');
        
        // Calculate ripple position
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Set ripple styles
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(14, 165, 233, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 20px;
            height: 20px;
            pointer-events: none;
            z-index: 100;
        `;
        
        // Add ripple to card
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Add scroll-based card animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('card-in-view');
                }
            });
        }, observerOptions);

        // Observe all enhanced cards
        const cards = document.querySelectorAll('[data-enhanced="true"]');
        cards.forEach(card => observer.observe(card));
    }

    // Add testimonial carousel functionality
    initTestimonialCarousel() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        let currentIndex = 0;

        if (testimonialCards.length === 0) return;

        // Initialize first testimonial as active
        this.showTestimonial(currentIndex, testimonialCards, dots);

        // Add event listeners for navigation buttons
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
                this.showTestimonial(currentIndex, testimonialCards, dots);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                this.showTestimonial(currentIndex, testimonialCards, dots);
            });
        }

        // Add event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                this.showTestimonial(currentIndex, testimonialCards, dots);
            });
        });

        // Auto-advance testimonials every 7 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            this.showTestimonial(currentIndex, testimonialCards, dots);
        }, 7000);
    }

    showTestimonial(index, cards, dots) {
        // Remove active class from all cards and dots
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current card and dot
        if (cards[index]) {
            cards[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }
}

// Add CSS for ripple animation
const rippleCss = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .card-enhanced-hover {
        cursor: pointer;
    }
    
    .card-in-view {
        animation: cardSlideIn 0.6s ease-out forwards;
    }
    
    @keyframes cardSlideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Enhanced card states */
    [data-enhanced="true"] {
        cursor: pointer;
        user-select: none;
    }
    
    [data-enhanced="true"]:hover {
        cursor: pointer;
    }
    
    /* Preserve existing functionality */
    .experience-card,
    .project-card-new,
    .about-intro-card,
    .skills-card,
    .interests-card,
    .badge-category,
    .credly-badge,
    .timeline-item,
    .contact-link-item,
    .portfolio-card {
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    }
    
    /* Enhance specific card elements */
    .stat-number {
        transition: all 0.3s ease;
    }
    
    .card-enhanced-hover .stat-number {
        transform: scale(1.1);
        text-shadow: 0 0 20px currentColor;
    }
    
    .card-enhanced-hover .experience-title,
    .card-enhanced-hover .project-title-new,
    .card-enhanced-hover .card-title {
        color: var(--primary-color);
        text-shadow: 0 0 10px rgba(14, 165, 233, 0.5);
    }
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCss;
document.head.appendChild(style);

// Initialize enhanced card effects
const enhancedCards = new EnhancedCardEffects();

// Export for potential external use
window.EnhancedCardEffects = EnhancedCardEffects;
