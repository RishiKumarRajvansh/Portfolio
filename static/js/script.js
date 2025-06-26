// Global variable to prevent multiple typewriter animations
let typewriterRunning = false;
let animationId = null;

// Typing Animation for Name - Continuous Loop
function typeWriter() {
    const nameElement = document.getElementById('typewriter');
    if (!nameElement) {
        console.error('Typewriter element not found');
        return;
    }
    
    // Prevent multiple animations
    if (typewriterRunning) {
        console.log('Typewriter animation already running, stopping previous...');
        typewriterRunning = false;
        if (animationId) {
            clearTimeout(animationId);
            animationId = null;
        }
        // Wait a bit before starting new animation
        setTimeout(() => typeWriter(), 500);
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
        if (!typewriterRunning) {
            console.log('❌ Animation stopped - typewriterRunning is false');
            return;
        }
        
        const currentElement = document.getElementById('typewriter');
        if (!currentElement) {
            console.error('❌ Element disappeared during animation');
            typewriterRunning = false;
            return;
        }
        
        try {
            if (isTyping) {
                // ✏️ TYPING PHASE
                if (charIndex < text.length) {
                    const newText = text.substring(0, charIndex + 1);
                    currentElement.textContent = newText;
                    console.log(`✏️ Typing: "${newText}" (${charIndex + 1}/${text.length})`);
                    charIndex++;
                    animationId = setTimeout(animate, 120);
                } else {
                    // ✅ FINISHED TYPING - Switch to deletion after delay
                    console.log('✅ FINISHED TYPING! Waiting 2.5s before deletion...');
                    console.log('Current text:', `"${currentElement.textContent}"`);
                    animationId = setTimeout(() => {
                        if (!typewriterRunning) {
                            console.log('❌ Animation stopped during typing delay');
                            return;
                        }
                        console.log('🗑️ STARTING DELETION PHASE...');
                        isTyping = false;
                        animate(); // Continue to deleting phase
                    }, 2500);
                }
            } else {
                // 🗑️ DELETING PHASE
                if (charIndex > 0) {
                    charIndex--;
                    const newText = text.substring(0, charIndex);
                    currentElement.textContent = newText;
                    console.log(`🗑️ Deleting: "${newText}" (${charIndex}/${text.length})`);
                    animationId = setTimeout(animate, 100);
                } else {
                    // ✅ FINISHED DELETING - Switch to typing after delay
                    console.log('✅ FINISHED DELETING! Text is now empty. Waiting 1s before retyping...');
                    currentElement.textContent = '';
                    animationId = setTimeout(() => {
                        if (!typewriterRunning) {
                            console.log('❌ Animation stopped during deletion delay');
                            return;
                        }
                        console.log('🔄 RESTARTING TYPING PHASE...');
                        isTyping = true;
                        charIndex = 0;
                        animate();
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('💥 Animation error:', error);
            // Restart animation after error
            typewriterRunning = false;
            setTimeout(() => {
                console.log('🔄 Restarting animation after error...');
                typeWriter();
            }, 2000);
        }
    }
    
    // Start the animation after a brief delay
    animationId = setTimeout(() => {
        console.log('🚀 Starting initial animation...');
        animate();
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
        nameElement.style.background = 'none';
        nameElement.style.webkitTextFillColor = '#0ea5e9';
        nameElement.style.fontSize = '4.5rem';
        nameElement.style.fontWeight = '900';
        nameElement.style.display = 'inline-block';
        nameElement.style.visibility = 'visible';
        nameElement.style.opacity = '1';
        nameElement.style.textShadow = '0 0 15px #0ea5e9';
        nameElement.style.letterSpacing = '3px';
        nameElement.style.textTransform = 'uppercase';
        console.log('Name shown directly as fallback');
    }
}

// Start typing animation when page loads
// (Now handled in DOMContentLoaded event)

// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.85)';
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

// Floating Background Doodles
function initFloatingDoodles() {
    const floatingContainer = document.getElementById('floating-doodles');
    if (!floatingContainer) {
        console.log('Floating doodles container not found');
        return;
    }

    const icons = [
        'fab fa-python',
        'fas fa-code',
        'fas fa-laptop-code',
        'fas fa-database',
        'fas fa-chart-line',
        'fas fa-robot',
        'fab fa-github',
        'fas fa-terminal',
        'fas fa-cog',
        'fas fa-lightbulb',
        'fas fa-flask',
        'fas fa-brain',
        'fas fa-microchip',
        'fas fa-server',
        'fas fa-cloud',
        'fas fa-mobile-alt',
        'fas fa-globe',
        'fas fa-shield-alt',
        'fas fa-magic',
        'fas fa-rocket'
    ];

    // Clear existing doodles
    floatingContainer.innerHTML = '';
    
    // Ensure container is visible and properly positioned
    floatingContainer.style.position = 'fixed';
    floatingContainer.style.top = '0';
    floatingContainer.style.left = '0';
    floatingContainer.style.width = '100vw';
    floatingContainer.style.height = '100vh';
    floatingContainer.style.pointerEvents = 'none';
    floatingContainer.style.zIndex = '1';
    floatingContainer.style.display = 'block';
    floatingContainer.style.visibility = 'visible';

    // Create floating doodles across entire viewport
    for (let i = 0; i < 25; i++) {
        const doodle = document.createElement('div');
        doodle.className = 'floating-doodle';
        doodle.innerHTML = `<i class="${icons[Math.floor(Math.random() * icons.length)]}"></i>`;
        
        // Completely random position across the full viewport
        const leftPos = Math.random() * 100;
        const topPos = Math.random() * 100;
        
        doodle.style.position = 'absolute';
        doodle.style.left = leftPos + '%';
        doodle.style.top = topPos + '%';
        
        // Random animation delay and duration
        doodle.style.animationDelay = Math.random() * 15 + 's';
        doodle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        // Random size variation
        const size = 1.8 + Math.random() * 1.5;
        doodle.style.fontSize = size + 'rem';
        
        // Random opacity
        doodle.style.opacity = 0.4 + Math.random() * 0.5;
        
        // Random bright colors
        const colors = [
            '#0ea5e9', 
            '#10b981', 
            '#f59e0b',
            '#ef4444',
            '#8b5cf6',
            '#06b6d4',
            '#f97316',
            '#ec4899',
            '#84cc16'
        ];
        const selectedColor = colors[Math.floor(Math.random() * colors.length)];
        doodle.style.color = selectedColor;
        
        // Enhanced glow effect with the same color
        doodle.style.textShadow = `0 0 20px ${selectedColor}, 0 0 30px ${selectedColor}`;
        
        // Ensure visibility
        doodle.style.display = 'block';
        doodle.style.visibility = 'visible';
        doodle.style.zIndex = '2';
        doodle.style.pointerEvents = 'none';
        
        floatingContainer.appendChild(doodle);
    }
    
    console.log('Floating doodles initialized with', floatingContainer.children.length, 'elements');
}

// Random glow effect for floating icons
function addRandomGlow() {
    const doodles = document.querySelectorAll('.floating-doodle');
    doodles.forEach(doodle => {
        // Remove any existing glow
        doodle.classList.remove('glow');
        
        // Randomly add glow effect
        if (Math.random() < 0.3) { // 30% chance
            doodle.classList.add('glow');
            
            // Remove glow after animation completes
            setTimeout(() => {
                doodle.classList.remove('glow');
            }, 3000);
        }
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Simple validation
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Here you would typically send the data to your server
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize typing animation
    typeWriter();
    
    // Initialize floating doodles
    initFloatingDoodles();
    
    // Add random glow effects every 5 seconds
    setInterval(addRandomGlow, 5000);
    
    // Initial glow
    setTimeout(addRandomGlow, 2000);
    
    console.log('All initialization complete');
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.stars');
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
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
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
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }, index * 100);
    });
}

// Stats counter animation
function animateCounters(element) {
    const counters = element.querySelectorAll('.stat-number');
    
    // Clear any existing animation timers on this element
    if (element._counterTimers) {
        element._counterTimers.forEach(timer => clearInterval(timer));
    }
    element._counterTimers = [];
    
    counters.forEach(counter => {
        // Reset the counter to 0 first
        counter.textContent = '0+';
        
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        let current = 0;
        // Adjust increment to make animation faster (25 steps instead of 50)
        const increment = target / 25;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
                
                // Remove this timer from the list when done
                if (element._counterTimers) {
                    const index = element._counterTimers.indexOf(timer);
                    if (index > -1) element._counterTimers.splice(index, 1);
                }
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 40); // Slightly faster interval (40ms instead of 50ms)
        
        // Store timer reference
        element._counterTimers.push(timer);
    });
}

// Initialize animations when elements come into view
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills-grid')) {
                animateSkills();
            }
            if (entry.target.classList.contains('tech-stats') || entry.target.classList.contains('about-stats')) {
                animateCounters(entry.target);
            }
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the element is visible
});

document.addEventListener('DOMContentLoaded', () => {
    const skillsGrid = document.querySelector('.skills-grid');
    const techStats = document.querySelector('.tech-stats');
    const aboutStats = document.querySelector('.about-stats');
    
    if (skillsGrid) animationObserver.observe(skillsGrid);
    if (techStats) animationObserver.observe(techStats);
    if (aboutStats) animationObserver.observe(aboutStats);
});
