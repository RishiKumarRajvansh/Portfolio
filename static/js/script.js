// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Initializing mobile navigation...');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Nav elements found:', {
        navToggle: !!navToggle,
        navMenu: !!navMenu,
        navLinksCount: navLinks.length
    });
    
    // Toggle mobile menu
    if (navToggle && navMenu) {
        console.log('✅ Setting up mobile navigation event listeners');
        
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('🔄 Nav toggle clicked');
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            const isMenuOpen = navMenu.classList.contains('active');
            console.log('Menu is now:', isMenuOpen ? 'OPEN' : 'CLOSED');
            
            // Prevent body scroll when menu is open
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on nav links
        navLinks.forEach((link, index) => {
            link.addEventListener('click', function() {
                console.log(`Nav link ${index} clicked, closing menu`);
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navMenu.classList.contains('active')) {
                    console.log('Clicked outside menu, closing');
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    } else {
        console.error('❌ Navigation elements not found!');
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

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
    threshold: [0, 0.1, 0.2, 0.3], // Multiple thresholds for better detection
    rootMargin: '10% 0px 10% 0px' // Add margin on top and bottom for smoother entry/exit detection
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log('🔍 Observer triggered:', entry.target.className, 'isIntersecting:', entry.isIntersecting, 'scrollDirection:', scrollDirection);
        
        if (entry.isIntersecting) {
            // Element is entering the viewport - animate to visible state
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add special handling for timeline items to stagger animation
            if (entry.target.classList.contains('timeline-item')) {
                const allTimelineItems = document.querySelectorAll('.timeline-item');
                const itemIndex = Array.from(allTimelineItems).indexOf(entry.target);
                
                if (scrollDirection === 'down') {
                    // Scrolling down: stagger from first to last
                    entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
                } else {
                    // Scrolling up: stagger from last to first
                    const reverseIndex = allTimelineItems.length - 1 - itemIndex;
                    entry.target.style.transitionDelay = `${reverseIndex * 0.1}s`;
                }
            }
            
            // Add staggered animation for education cards
            if (entry.target.classList.contains('education-card')) {
                const allEducationCards = document.querySelectorAll('.education-card');
                const itemIndex = Array.from(allEducationCards).indexOf(entry.target);
                
                // Mark as animated
                entry.target.setAttribute('data-animated', 'true');
                
                if (scrollDirection === 'down') {
                    entry.target.style.transitionDelay = `${itemIndex * 0.15}s`;
                } else {
                    const reverseIndex = allEducationCards.length - 1 - itemIndex;
                    entry.target.style.transitionDelay = `${reverseIndex * 0.15}s`;
                }
            }
            
            // Add staggered animation for tech stats
            if (entry.target.classList.contains('stat-card') && entry.target.closest('.tech-stats')) {
                const allStatCards = entry.target.closest('.tech-stats').querySelectorAll('.stat-card');
                const itemIndex = Array.from(allStatCards).indexOf(entry.target);
                
                if (scrollDirection === 'down') {
                    entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
                } else {
                    const reverseIndex = allStatCards.length - 1 - itemIndex;
                    entry.target.style.transitionDelay = `${reverseIndex * 0.1}s`;
                }
            }
            
            // Add staggered animation for portfolio cards
            if (entry.target.classList.contains('portfolio-card')) {
                const allPortfolioCards = document.querySelectorAll('.portfolio-card');
                const itemIndex = Array.from(allPortfolioCards).indexOf(entry.target);
                
                if (scrollDirection === 'down') {
                    entry.target.style.transitionDelay = `${itemIndex * 0.15}s`;
                } else {
                    const reverseIndex = allPortfolioCards.length - 1 - itemIndex;
                    entry.target.style.transitionDelay = `${reverseIndex * 0.15}s`;
                }
            }
            
            // Add staggered animation for project cards
            if (entry.target.classList.contains('project-card-new')) {
                const allProjectCards = document.querySelectorAll('.project-card-new');
                const itemIndex = Array.from(allProjectCards).indexOf(entry.target);
                
                if (scrollDirection === 'down') {
                    entry.target.style.transitionDelay = `${itemIndex * 0.2}s`;
                } else {
                    const reverseIndex = allProjectCards.length - 1 - itemIndex;
                    entry.target.style.transitionDelay = `${reverseIndex * 0.2}s`;
                }
            }
            
            // Add staggered animation for badge cards
            if (entry.target.classList.contains('credly-badge')) {
                const parentCategory = entry.target.closest('.badge-category');
                if (parentCategory) {
                    const categoryBadges = parentCategory.querySelectorAll('.credly-badge');
                    const itemIndex = Array.from(categoryBadges).indexOf(entry.target);
                    
                    if (scrollDirection === 'down') {
                        entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
                    } else {
                        const reverseIndex = categoryBadges.length - 1 - itemIndex;
                        entry.target.style.transitionDelay = `${reverseIndex * 0.1}s`;
                    }
                }
            }
            
            // Add staggered animation for interest items
            if (entry.target.classList.contains('interest-item')) {
                const allInterestItems = document.querySelectorAll('.interest-item');
                const itemIndex = Array.from(allInterestItems).indexOf(entry.target);
                
                if (scrollDirection === 'down') {
                    entry.target.style.transitionDelay = `${itemIndex * 0.08}s`;
                } else {
                    const reverseIndex = allInterestItems.length - 1 - itemIndex;
                    entry.target.style.transitionDelay = `${reverseIndex * 0.08}s`;
                }
            }
            
            // Add staggered animation for tech tags
            if (entry.target.classList.contains('tech-tag') || entry.target.classList.contains('tech-badge')) {
                const parentSection = entry.target.closest('.tech-skills, .project-technologies, .project-card-new');
                if (parentSection) {
                    const sectionTags = parentSection.querySelectorAll('.tech-tag, .tech-badge');
                    const itemIndex = Array.from(sectionTags).indexOf(entry.target);
                    
                    if (scrollDirection === 'down') {
                        entry.target.style.transitionDelay = `${itemIndex * 0.05}s`;
                    } else {
                        const reverseIndex = sectionTags.length - 1 - itemIndex;
                        entry.target.style.transitionDelay = `${reverseIndex * 0.05}s`;
                    }
                }
            }
            
            // Add staggered animation for contact items
            if (entry.target.classList.contains('contact-link-item')) {
                const allContactItems = document.querySelectorAll('.contact-link-item');
                const itemIndex = Array.from(allContactItems).indexOf(entry.target);
                
                if (scrollDirection === 'down') {
                    entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
                } else {
                    const reverseIndex = allContactItems.length - 1 - itemIndex;
                    entry.target.style.transitionDelay = `${reverseIndex * 0.1}s`;
                }
            }
            
            // Add staggered animation for testimonial cards
            if (entry.target.classList.contains('testimonial-card')) {
                const allTestimonialCards = document.querySelectorAll('.testimonial-card');
                const itemIndex = Array.from(allTestimonialCards).indexOf(entry.target);
                
                if (scrollDirection === 'down') {
                    entry.target.style.transitionDelay = `${itemIndex * 0.2}s`;
                } else {
                    const reverseIndex = allTestimonialCards.length - 1 - itemIndex;
                    entry.target.style.transitionDelay = `${reverseIndex * 0.2}s`;
                }
            }
            
            // Add staggered animation for section titles and subtitles
            if (entry.target.classList.contains('section-title') || 
                entry.target.classList.contains('section-subtitle') ||
                entry.target.classList.contains('about-section-title') ||
                entry.target.classList.contains('category-title') ||
                entry.target.classList.contains('form-title')) {
                // Section headers animate immediately without stagger
                entry.target.style.transitionDelay = '0s';
            }
            
            // Add animation for portfolio links
            if (entry.target.classList.contains('portfolio-links')) {
                const allPortfolioLinks = document.querySelectorAll('.portfolio-links');
                const itemIndex = Array.from(allPortfolioLinks).indexOf(entry.target);
                
                if (scrollDirection === 'down') {
                    entry.target.style.transitionDelay = `${itemIndex * 0.1}s`;
                } else {
                    const reverseIndex = allPortfolioLinks.length - 1 - itemIndex;
                    entry.target.style.transitionDelay = `${reverseIndex * 0.1}s`;
                }
            }

            // Add animation for badge categories and other containers
            if (entry.target.classList.contains('badge-category') || 
                entry.target.classList.contains('badges-grid') ||
                entry.target.classList.contains('profile-card') ||
                entry.target.classList.contains('hero-buttons') ||
                entry.target.classList.contains('tech-skills') ||
                entry.target.classList.contains('testimonial-controls')) {
                // Container elements animate without stagger
                entry.target.style.transitionDelay = '0s';
            }
        } else {
            // Element is leaving the viewport - prepare for next entry
            // Use a small delay to avoid flicker when quickly scrolling
            setTimeout(() => {
                if (!entry.isIntersecting) { // Double-check it's still out of view
                    entry.target.style.opacity = '0';
                    entry.target.style.transitionDelay = '0s'; // Reset delay
                    
                    // Mark as not animated for education cards
                    if (entry.target.classList.contains('education-card')) {
                        entry.target.setAttribute('data-animated', 'false');
                    }
                    
                    // Set initial position based on current scroll direction
                    if (scrollDirection === 'down') {
                        // Element is leaving from top, prepare to enter from top when scrolling back up
                        entry.target.style.transform = 'translateY(-30px)';
                    } else {
                        // Element is leaving from bottom, prepare to enter from bottom when scrolling back down
                        entry.target.style.transform = 'translateY(30px)';
                    }
                }
            }, 150); // Small delay to prevent flicker
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
    .tech-badge,
    .interest-item,
    .stat-card,
    .about-section-title,
    .category-title,
    .badge-category,
    .badges-grid,
    .testimonial-controls,
    .form-title,
    .profile-card,
    .hero-buttons,
    .tech-skills
`).forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)'; // Default starting position
    el.style.transition = `opacity 0.6s ease, transform 0.6s ease`;
    
    // Add staggered delay for groups of similar elements
    if (el.classList.contains('tech-tag') || 
        el.classList.contains('tech-badge') || 
        el.classList.contains('interest-item')) {
        el.style.transitionDelay = `${index * 0.05}s`;
    }
    
    observer.observe(el);
    console.log('🎯 Observing element for animation:', el.className, el.tagName);
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Try client-side mailto first (primary method)
        try {
            const mailtoURL = createMailtoURL({
                to: 'rishikumarrajvansh@gmail.com',
                subject: subject,
                body: `Hello Rishi,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nBest regards,\n${name}`
            });
            
            // Open default mail client
            window.location.href = mailtoURL;
            
            // Show success message
            showNotification('Opening your default mail client...', 'success');
            
            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
            
        } catch (error) {
            // Fallback to server-side submission
            console.log('Mailto failed, trying server-side submission:', error);
            submitFormToServer(contactForm);
        }
    });
}

// Handle "Get My Pricing" button
const pricingBtn = document.querySelector('.hire-btn');
if (pricingBtn) {
    pricingBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Try client-side mailto first
        try {
            const mailtoURL = createMailtoURL({
                to: 'rishikumarrajvansh@gmail.com',
                subject: 'Freelance Project Pricing Inquiry',
                body: `Hello Rishi,\n\nI'm interested in your freelance services and would like to get pricing information for my project.\n\nProject details:\n- Project type: [Please specify: Web Development, Data Science, Integration, Automation, Other]\n- Timeline: [Please specify]\n- Budget range: [Please specify]\n- Additional requirements: [Please describe your project in detail]\n\nI look forward to hearing from you.\n\nBest regards,\n[Your Name]`
            });
            
            // Open default mail client
            window.location.href = mailtoURL;
            
            // Show success message
            showNotification('Opening your default mail client for pricing inquiry...', 'success');
            
        } catch (error) {
            // Fallback to server route
            console.log('Mailto failed, redirecting to server route:', error);
            window.location.href = pricingBtn.href;
        }
    });
}

// Server-side form submission fallback
function submitFormToServer(form) {
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            if (data.mailto_url) {
                window.location.href = data.mailto_url;
            }
            showNotification(data.message, 'success');
            form.reset();
        } else {
            showNotification(data.message || 'An error occurred.', 'error');
        }
    })
    .catch(error => {
        console.error('Form submission error:', error);
        showNotification('Failed to submit form. Please try again.', 'error');
    });
}

// Helper function to create mailto URLs
function createMailtoURL(params) {
    const { to, subject = '', body = '' } = params;
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
}

// Helper function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0ea5e9',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        fontSize: '0.9rem',
        fontWeight: '600',
        maxWidth: '300px',
        opacity: '0',
        transform: 'translateX(100%)',
        transition: 'all 0.3s ease'
    });
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
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

// Force re-initialization of all animated elements for better bi-directional animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = '0s';
        card.setAttribute('data-animated', 'false');
    });
    
    // Initialize testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = '0s';
    });
    
    // Initialize portfolio cards
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = '0s';
    });
    
    // Initialize project cards
    const projectCards = document.querySelectorAll('.project-card-new');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = '0s';
    });
    
    // Initialize badge cards
    const badgeCards = document.querySelectorAll('.credly-badge');
    badgeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = '0s';
    });
    
    // Initialize stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = '0s';
    });
});
