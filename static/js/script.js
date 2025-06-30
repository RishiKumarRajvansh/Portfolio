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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-item, .timeline-item, .project-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
let currentTestimonialIndex = 1;
const totalTestimonials = 4;
let testimonialInterval;
const testimonialAutoplayDelay = 4000; // 4 seconds

function changeTestimonial(direction) {
    // Get current and all cards
    const currentCard = document.querySelector(`.testimonial-card.active`);
    const allCards = document.querySelectorAll('.testimonial-card');
    
    // Remove active class from current testimonial
    if (currentCard) {
        currentCard.classList.remove('active');
    }
    
    // Update index
    currentTestimonialIndex += direction;
    
    // Loop around if needed
    if (currentTestimonialIndex > totalTestimonials) {
        currentTestimonialIndex = 1;
    } else if (currentTestimonialIndex < 1) {
        currentTestimonialIndex = totalTestimonials;
    }
    
    // Add active class to new testimonial
    const newCard = allCards[currentTestimonialIndex - 1];
    if (newCard) {
        newCard.classList.add('active');
    }
    
    // Update dots
    updateTestimonialDots();
}

function currentTestimonial(index) {
    // Get current and all cards
    const currentCard = document.querySelector(`.testimonial-card.active`);
    const allCards = document.querySelectorAll('.testimonial-card');
    
    // Remove active class from current testimonial
    if (currentCard) {
        currentCard.classList.remove('active');
    }
    
    // Set new index
    currentTestimonialIndex = index;
    
    // Add active class to new testimonial
    const newCard = allCards[currentTestimonialIndex - 1];
    if (newCard) {
        newCard.classList.add('active');
    }
    
    // Update dots
    updateTestimonialDots();
}

function updateTestimonialDots() {
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    dots.forEach((dot, index) => {
        if (index === currentTestimonialIndex - 1) {
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
    // Remove active class from all testimonials
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.classList.remove('active');
        if (index === 0) {
            card.classList.add('active');
        }
    });
    
    // Set first dot as active
    updateTestimonialDots();
    
    // Start autoplay
    startTestimonialAutoplay();
    
    // Add hover event listeners to pause/resume autoplay
    const testimonialContainer = document.querySelector('.testimonials-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', pauseTestimonialAutoplay);
        testimonialContainer.addEventListener('mouseleave', resumeTestimonialAutoplay);
    }
    
    // Add click event listeners to navigation buttons to restart autoplay
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopTestimonialAutoplay();
            changeTestimonial(-1);
            setTimeout(startTestimonialAutoplay, testimonialAutoplayDelay);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopTestimonialAutoplay();
            changeTestimonial(1);
            setTimeout(startTestimonialAutoplay, testimonialAutoplayDelay);
        });
    }
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

// Smooth reveal animations for timeline
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
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
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 50;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 50);
            } else {
                counter.textContent = target;
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
            if (entry.target.classList.contains('tech-stats')) {
                animateCounters(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const skillsGrid = document.querySelector('.skills-grid');
    const techStats = document.querySelector('.tech-stats');
    
    if (skillsGrid) animationObserver.observe(skillsGrid);
    if (techStats) animationObserver.observe(techStats);
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
