// Global variable to prevent multiple typewriter animations
let typewriterRunning = false;
let animationId = null;

// Typing Animation for Name - Continuous Loop
function typeWriter() {
    const nameElement = document.getElementById('typewriter');
    if (!nameElement) {
        console.error('❌ #typewriter element not found');
        return;
    }
    
    // Prevent multiple animations
    if (typewriterRunning) {
        console.log('⚠️ Typewriter already running, skipping...');
        return;
    }
    
    typewriterRunning = true;
    const text = 'RISHI KUMAR';
    let charIndex = 0;
    let isTyping = true;
    
    console.log('🔥 Starting NEW typewriter animation cycle');
    
    // Force visible styles first
    nameElement.style.color = '#0ea5e9';
    nameElement.style.background = 'none';
    nameElement.style.webkitTextFillColor = '#0ea5e9';
    nameElement.style.fontSize = '4.5rem';
    nameElement.style.fontWeight = '900';
    nameElement.style.display = 'inline-block';
    nameElement.style.visibility = 'visible';
    nameElement.style.opacity = '1';
    nameElement.style.zIndex = '30';
    nameElement.style.position = 'relative';
    nameElement.style.textShadow = '0 0 15px #0ea5e9';
    nameElement.style.letterSpacing = '3px';
    nameElement.style.textTransform = 'uppercase';
    
    // Clear initial content
    nameElement.textContent = '';
    
    function animate() {
        if (!typewriterRunning) return;
        
        if (isTyping) {
            if (charIndex < text.length) {
                nameElement.textContent = text.slice(0, charIndex + 1);
                charIndex++;
                animationId = setTimeout(animate, 100);
            } else {
                // Pause at the end before deleting
                isTyping = false;
                animationId = setTimeout(animate, 1500);
            }
        } else {
            if (charIndex > 0) {
                nameElement.textContent = text.slice(0, charIndex - 1);
                charIndex--;
                animationId = setTimeout(animate, 75);
            } else {
                // Pause before typing again
                isTyping = true;
                animationId = setTimeout(animate, 750);
            }
        }
    }
    
    // Start the animation after a brief delay
    animationId = setTimeout(() => {
        if (typewriterRunning) animate();
    }, 500);
    
    console.log('✅ Typewriter animation initialized for:', text);
}

// Function to restart typewriter (can be called from console or Flask)
function restartTypewriter() {
    console.log('🔄 Manually restarting typewriter...');
    typewriterRunning = false;
    if (animationId) {
        clearTimeout(animationId);
        animationId = null;
    }
    setTimeout(typeWriter, 100);
}

// Function to stop typewriter
function stopTypewriter() {
    console.log('⏹️ Stopping typewriter...');
    typewriterRunning = false;
    if (animationId) {
        clearTimeout(animationId);
        animationId = null;
    }
}

// Simple fallback function to show the name with static text
function showNameDirectly() {
    const nameElement = document.getElementById('typewriter');
    if (nameElement) {
        nameElement.textContent = 'RISHI KUMAR';
        nameElement.style.color = '#0ea5e9';
        nameElement.style.visibility = 'visible';
        nameElement.style.opacity = '1';
    }
}

// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effects (background remains constant)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations with scroll direction detection
let lastScrollY = window.scrollY;
let scrollDirection = 'down';
let scrollTimeout;

// Track scroll direction with debouncing
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const diff = currentScrollY - lastScrollY;
    
    // Only update direction if there's significant movement (reduces jitter)
    if (Math.abs(diff) > 5) {
        scrollDirection = diff > 0 ? 'down' : 'up';
    }
    
    lastScrollY = currentScrollY;
});

const observerOptions = {
    threshold: 0.2, // Trigger when 20% of element is visible
    rootMargin: '0px 0px -10% 0px' // Start animation when element is 10% from bottom of viewport
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is entering the viewport - animate based on scroll direction
            entry.target.style.opacity = '1';
            
            if (scrollDirection === 'down') {
                // Scrolling down: animate from bottom to top
                entry.target.style.transform = 'translateY(0)';
            } else {
                // Scrolling up: animate from top to bottom  
                entry.target.style.transform = 'translateY(0)';
            }
            
            // Add special handling for timeline items to stagger animation
            if (entry.target.classList.contains('timeline-item')) {
                const allTimelineItems = document.querySelectorAll('.timeline-item');
                const itemIndex = Array.from(allTimelineItems).indexOf(entry.target);
                
                if (scrollDirection === 'down') {
                    // Scrolling down: stagger from first to last (bottom-to-top effect)
                    entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
                } else {
                    // Scrolling up: stagger from last to first (top-to-bottom effect)
                    const reverseIndex = allTimelineItems.length - 1 - itemIndex;
                    entry.target.style.transitionDelay = `${reverseIndex * 0.1}s`;
                }
            }
            
            // Add staggered animation for tech stats
            if (entry.target.classList.contains('stat-card') && entry.target.closest('.tech-stats')) {
                const allStatCards = entry.target.closest('.tech-stats').querySelectorAll('.stat-card');
                const itemIndex = Array.from(allStatCards).indexOf(entry.target);
                entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
            }
            
            // Add staggered animation for portfolio cards
            if (entry.target.classList.contains('portfolio-card')) {
                const allPortfolioCards = document.querySelectorAll('.portfolio-card');
                const itemIndex = Array.from(allPortfolioCards).indexOf(entry.target);
                entry.target.style.transitionDelay = `${itemIndex * 0.15}s`;
            }
            
            // Add staggered animation for project cards
            if (entry.target.classList.contains('project-card-new')) {
                const allProjectCards = document.querySelectorAll('.project-card-new');
                const itemIndex = Array.from(allProjectCards).indexOf(entry.target);
                entry.target.style.transitionDelay = `${itemIndex * 0.2}s`;
            }
            
            // Add staggered animation for badge cards
            if (entry.target.classList.contains('credly-badge')) {
                const parentCategory = entry.target.closest('.badge-category');
                if (parentCategory) {
                    const categoryBadges = parentCategory.querySelectorAll('.credly-badge');
                    const itemIndex = Array.from(categoryBadges).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
                }
            }
            
            // Add staggered animation for interest items
            if (entry.target.classList.contains('interest-item')) {
                const allInterestItems = document.querySelectorAll('.interest-item');
                const itemIndex = Array.from(allInterestItems).indexOf(entry.target);
                entry.target.style.transitionDelay = `${itemIndex * 0.08}s`;
            }
            
            // Add staggered animation for tech tags
            if (entry.target.classList.contains('tech-tag')) {
                const parentSection = entry.target.closest('.tech-skills, .project-technologies');
                if (parentSection) {
                    const sectionTags = parentSection.querySelectorAll('.tech-tag');
                    const itemIndex = Array.from(sectionTags).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${itemIndex * 0.05}s`;
                }
            }
            
            // Add staggered animation for contact items
            if (entry.target.classList.contains('contact-link-item')) {
                const allContactItems = document.querySelectorAll('.contact-link-item');
                const itemIndex = Array.from(allContactItems).indexOf(entry.target);
                entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
            }
        } else {
            // Element is leaving the viewport - reset based on scroll direction
            entry.target.style.opacity = '0';
            entry.target.style.transitionDelay = '0s'; // Reset delay
            
            if (scrollDirection === 'down') {
                // If scrolling down and element is leaving, it's going above viewport
                // Set it to animate from top next time
                entry.target.style.transform = 'translateY(-30px)';
            } else {
                // If scrolling up and element is leaving, it's going below viewport  
                // Set it to animate from bottom next time
                entry.target.style.transform = 'translateY(30px)';
            }
        }
    });
}, observerOptions);

// Observe elements for animation - Include all elements that should animate
document.querySelectorAll(`
    .timeline-item, 
    .project-card, 
    .project-card-new,
    .contact-item,
    .credly-badge,
    .education-card,
    .portfolio-card,
    .testimonial-card,
    .contact-link-item,
    .section-title,
    .section-subtitle,
    .portfolio-links,
    .freelance-availability-card,
    .linkedin-cta,
    .contact-form-section,
    .contact-top-section,
    .contact-links-vertical .contact-link-item,
    .badges-cta,
    .credly-badge.skill-item,
    .education-card.skill-item,
    .portfolio-links.skill-item,
    .badges-section .skill-item,
    .tech-tag,
    .interest-item
`).forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)'; // Default starting position
    el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    
    // Add staggered delay for groups of similar elements
    if (el.classList.contains('tech-tag') || el.classList.contains('interest-item')) {
        el.style.transitionDelay = `${index * 0.05}s`;
    }
    
    observer.observe(el);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I\'ll get back to you soon.');
    });
}

// Testimonial Navigation Functions
let currentTestimonialIndex = 0;
const totalTestimonials = 4;
let testimonialInterval;
const testimonialAutoplayDelay = 4000; // 4 seconds

function changeTestimonial(direction) {
    const container = document.querySelector('.testimonial-cards-container');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!container || !cards.length) return;
    
    // Update index
    currentTestimonialIndex += direction;
    
    // Wrap around
    if (currentTestimonialIndex >= totalTestimonials) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = totalTestimonials - 1;
    }
    
    // Move carousel
    const translateX = -currentTestimonialIndex * 25; // 25% per card (100% / 4 cards)
    container.style.transform = `translateX(${translateX}%)`;
    
    // Update active states
    updateTestimonialActive();
    updateTestimonialDots();
    
    // Reset autoplay
    stopTestimonialAutoplay();
    startTestimonialAutoplay();
}

function currentTestimonial(index) {
    const container = document.querySelector('.testimonial-cards-container');
    const cards = document.querySelectorAll('.testimonial-card');
    
    if (!container || !cards.length || index < 0 || index >= totalTestimonials) return;
    
    currentTestimonialIndex = index;
    
    // Move carousel
    const translateX = -currentTestimonialIndex * 25; // 25% per card
    container.style.transform = `translateX(${translateX}%)`;
    
    // Update active states
    updateTestimonialActive();
    updateTestimonialDots();
    
    // Reset autoplay
    stopTestimonialAutoplay();
    startTestimonialAutoplay();
}

function updateTestimonialActive() {
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach((card, index) => {
        if (index === currentTestimonialIndex) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function updateTestimonialDots() {
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    dots.forEach((dot, index) => {
        if (index === currentTestimonialIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function startTestimonialAutoplay() {
    testimonialInterval = setInterval(() => {
        changeTestimonial(1);
    }, testimonialAutoplayDelay);
}

function stopTestimonialAutoplay() {
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
        testimonialInterval = null;
    }
}

function pauseTestimonialAutoplay() {
    stopTestimonialAutoplay();
}

function resumeTestimonialAutoplay() {
    if (!testimonialInterval) {
        startTestimonialAutoplay();
    }
}

// Initialize testimonials on page load
function initTestimonialCarousel() {
    // Set initial state
    updateTestimonialActive();
    updateTestimonialDots();
    
    // Start autoplay
    startTestimonialAutoplay();
    
    // Add hover event listeners to pause/resume autoplay
    const testimonialContainer = document.querySelector('.testimonials-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', pauseTestimonialAutoplay);
        testimonialContainer.addEventListener('mouseleave', resumeTestimonialAutoplay);
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            changeTestimonial(-1);
        } else if (e.key === 'ArrowRight') {
            changeTestimonial(1);
        }
    });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skills progress animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(skill => {
        const level = skill.querySelector('.skill-level');
        if (level) {
            const width = level.style.width || '0%';
            level.style.width = '0%';
            setTimeout(() => {
                level.style.width = width;
            }, 500);
        }
    });
}

// Stats counter animation
function animateCounters(element) {
    const counters = element.querySelectorAll('[data-target]');
    counters.forEach(counter => {
        // Skip if already animating
        if (counter.classList.contains('animating')) return;
        
        counter.classList.add('animating');
        const target = parseInt(counter.getAttribute('data-target'));
        const originalText = counter.textContent;
        const suffix = originalText.replace(/[0-9]/g, ''); // Extract suffix like "+" or "%"
        const increment = target / 50;
        let current = 0;
        
        // Reset counter to 0 before starting animation
        counter.textContent = '0' + suffix;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                setTimeout(updateCounter, 50);
            } else {
                counter.textContent = target + suffix;
                counter.classList.remove('animating');
            }
        };
        
        updateCounter();
    });
}

// Initialize animations when elements come into view
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills-grid')) {
                animateSkills();
            }
            if (entry.target.classList.contains('tech-stats') || 
                entry.target.classList.contains('about-stats') || 
                entry.target.classList.contains('badges-stats')) {
                animateCounters(entry.target);
                // Remove the unobserve line to allow repeated animations
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const skillsGrid = document.querySelector('.skills-grid');
    const techStats = document.querySelector('.tech-stats');
    const aboutStats = document.querySelector('.about-stats');
    const badgesStats = document.querySelector('.badges-stats');
    
    if (skillsGrid) animationObserver.observe(skillsGrid);
    if (techStats) animationObserver.observe(techStats);
    if (aboutStats) animationObserver.observe(aboutStats);
    if (badgesStats) animationObserver.observe(badgesStats);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM loaded, initializing...');
    
    // Initialize typing animation
    typeWriter();
    
    // Initialize testimonial carousel
    initTestimonialCarousel();
    
    console.log('✅ Script.js initialization complete');
});

// Handle badge image fallbacks
document.addEventListener('DOMContentLoaded', function() {
    const badgeImages = document.querySelectorAll('.badge-image img');
    
    badgeImages.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const fallbackIcon = this.nextElementSibling;
            if (fallbackIcon && fallbackIcon.classList.contains('fallback-icon')) {
                fallbackIcon.style.display = 'block';
            }
        });
        
        // Also check if image loads successfully
        img.addEventListener('load', function() {
            const fallbackIcon = this.nextElementSibling;
            if (fallbackIcon && fallbackIcon.classList.contains('fallback-icon')) {
                fallbackIcon.style.display = 'none';
            }
        });
    });
});
