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

// Enhanced Technical Floating Doodles with Random Generation
function initFloatingDoodles() {
    console.log('🎯 Creating dynamic technical floating doodles...');
    
    // Remove any existing JS-generated doodles
    const existingJSDoodles = document.querySelectorAll('.floating-doodle.js-generated');
    existingJSDoodles.forEach(doodle => doodle.remove());
    
    // Technical icons and symbols
    const techIcons = ['⚙️', '�', '💻', '📊', '🚀', '⚡', '🧠', '🎯', '💡', '🔍', '�', '⭐', '🌟', '🔮', '<>', '{}', '[]', '()', '&&', '||', '++', '--', '==', '!=', '/>', '</>'];
    const techColors = [
        'rgba(14,165,233,0.6)',   // Blue
        'rgba(16,185,129,0.6)',   // Green  
        'rgba(245,158,11,0.6)',   // Orange
        'rgba(239,68,68,0.6)',    // Red
        'rgba(139,92,246,0.6)',   // Purple
        'rgba(6,182,212,0.6)',    // Cyan
        'rgba(34,197,94,0.6)',    // Emerald
        'rgba(251,146,60,0.6)',   // Amber
        'rgba(168,85,247,0.6)'    // Violet
    ];
    
    // Create 10 additional random doodles
    for (let i = 0; i < 10; i++) {
        const doodle = document.createElement('div');
        const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
        const randomColor = techColors[Math.floor(Math.random() * techColors.length)];
        
        doodle.className = 'floating-doodle tech-icon js-generated';
        doodle.textContent = randomIcon;
        
        // Random positioning across the viewport
        const randomTop = Math.floor(Math.random() * (window.innerHeight - 100)) + 50;
        const randomLeft = Math.floor(Math.random() * (window.innerWidth - 100)) + 50;
        const randomSize = Math.floor(Math.random() * 20) + 35; // 35-55px
        const randomDelay = Math.random() * 5; // 0-5s delay
        
        doodle.style.cssText = `
            position: fixed;
            top: ${randomTop}px;
            left: ${randomLeft}px;
            font-size: ${randomSize}px;
            color: ${randomColor};
            z-index: 1;
            animation-delay: ${randomDelay}s;
            opacity: 0.5;
        `;
        
        document.body.appendChild(doodle);
        console.log(`✅ Created random doodle ${i + 1}: ${randomIcon} at (${randomLeft}, ${randomTop})`);
    }
    
    console.log('🎉 Dynamic technical doodles created!');
}

// Enhanced random glow effects for technical doodles
function addRandomGlow() {
    const doodles = document.querySelectorAll('.floating-doodle.tech-icon');
    
    console.log(`🌟 Adding random glow effects to ${doodles.length} tech doodles`);
    
    doodles.forEach((doodle, index) => {
        // 70% chance to apply glow effect
        if (Math.random() < 0.7) {
            const glowColors = [
                'rgba(14,165,233,0.8)',   // Bright blue
                'rgba(16,185,129,0.8)',   // Bright green
                'rgba(245,158,11,0.8)',   // Bright orange
                'rgba(239,68,68,0.8)',    // Bright red
                'rgba(139,92,246,0.8)',   // Bright purple
                'rgba(6,182,212,0.8)',    // Bright cyan
                'rgba(255,255,255,0.7)'   // White glow
            ];
            
            const randomGlowColor = glowColors[Math.floor(Math.random() * glowColors.length)];
            const glowIntensity = Math.random() * 40 + 20; // 20-60px glow
            const scaleEffect = 1 + (Math.random() * 0.5); // 1.0-1.5x scale
            
            // Apply intense glow effect
            doodle.style.textShadow = `
                0 0 ${glowIntensity}px ${randomGlowColor},
                0 0 ${glowIntensity * 1.5}px ${randomGlowColor},
                0 0 ${glowIntensity * 2}px ${randomGlowColor}
            `;
            doodle.style.transform = `scale(${scaleEffect})`;
            doodle.style.filter = `brightness(${1 + Math.random()})`;
            
            console.log(`✨ Applied intense glow to doodle ${index + 1}: ${doodle.textContent} with ${randomGlowColor}`);
            
            // Remove glow after random duration (2-6 seconds)
            const glowDuration = Math.random() * 4000 + 2000;
            setTimeout(() => {
                doodle.style.textShadow = '0 0 10px currentColor';
                doodle.style.transform = 'scale(1)';
                doodle.style.filter = 'brightness(1)';
            }, glowDuration);
        }
    });
}

// Regenerate random doodles periodically
function regenerateRandomDoodles() {
    console.log('🔄 Regenerating random doodles for variety...');
    
    // Remove old JS-generated doodles
    const oldJSDoodles = document.querySelectorAll('.floating-doodle.js-generated');
    oldJSDoodles.forEach(doodle => doodle.remove());
    
    // Create new random ones
    const techIcons = ['⚙️', '🔧', '💻', '📊', '🚀', '⚡', '🧠', '🎯', '💡', '🔍', '📈', '⭐', '🌟', '🔮', '⚛️', '🔬'];
    const techColors = [
        'rgba(14,165,233,0.6)', 'rgba(16,185,129,0.6)', 'rgba(245,158,11,0.6)',
        'rgba(239,68,68,0.6)', 'rgba(139,92,246,0.6)', 'rgba(6,182,212,0.6)'
    ];
    
    // Create 5 new random doodles
    for (let i = 0; i < 5; i++) {
        const doodle = document.createElement('div');
        const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
        const randomColor = techColors[Math.floor(Math.random() * techColors.length)];
        
        doodle.className = 'floating-doodle tech-icon js-generated';
        doodle.textContent = randomIcon;
        
        const randomTop = Math.floor(Math.random() * (window.innerHeight - 200)) + 100;
        const randomLeft = Math.floor(Math.random() * (window.innerWidth - 200)) + 100;
        const randomSize = Math.floor(Math.random() * 25) + 30; // 30-55px
        
        doodle.style.cssText = `
            position: fixed;
            top: ${randomTop}px;
            left: ${randomLeft}px;
            font-size: ${randomSize}px;
            color: ${randomColor};
            z-index: 1;
            opacity: 0.6;
        `;
        
        document.body.appendChild(doodle);
    }
    
    console.log('✅ Generated 5 new random tech doodles');
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
        dot.classList.remove('active');
        if (index + 1 === currentTestimonialIndex) {
            dot.classList.add('active');
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
document.addEventListener('DOMContentLoaded', function() {
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
            setTimeout(startTestimonialAutoplay, 1000); // Restart after 1 second
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopTestimonialAutoplay();
            setTimeout(startTestimonialAutoplay, 1000); // Restart after 1 second
        });
    }
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 DOM loaded, initializing...');
    
    // Initialize typing animation
    typeWriter();
    
    // Initialize testimonial carousel
    initTestimonialCarousel();
    
    // Initialize FontAwesome floating doodles system
    console.log('🚀 Initializing FontAwesome floating doodles system...');
    try {
        initFontAwesomeFloatingDoodles();
        console.log('✅ FontAwesome floating doodles system initialized successfully');
        
    } catch (error) {
        console.error('❌ Error with FontAwesome doodles:', error);
    }
});

// DYNAMIC Technical Floating Doodles - True Random Generation and Death System
let activeDoodles = [];
let doodleCounter = 0;
const maxDoodles = 25;

function createRandomDoodle() {
    // Massive collection of technical symbols
    const megaTechIcons = [
        // Programming symbols
        '<>', '</>', '{}', '[]', '()', '&&', '||', '++', '--', '==', '!=', '=>', '->', '<=', '>=', '??', '/>', 
        // Mathematical symbols  
        '∑', '∆', '∞', '√', '∫', '∂', '∇', 'π', 'λ', 'α', 'β', 'γ', 'θ', 'μ', 'σ', 'ω', 'Σ', '∀', '∃', '∈', 
        '∉', '⊂', '⊃', '∩', '∪', '¬', '∧', '∨', '⊕', '⊗',
        // ASCII symbols
        '*', '#', '@', '%', '&', '$', '~', '|', '^', '+', '-', '=', '!', '?', ':', ';', '.', ',', '/', '\\',
        // Geometric shapes
        '▲', '▼', '◀', '▶', '◆', '◇', '◈', '◎', '○', '●', '◐', '◑', '◒', '◓', '□', '■', '▢', '▣',
        '♠', '♣', '♥', '♦', '☆', '★', '✦', '✧', '✩', '✪', '✫', '✬', '✭', '✮',
        // Tech emojis
        '⚡', '🚀', '💻', '📊', '🎯', '💡', '🔍', '📈', '⭐', '🌟', '🔧', '⚙️', '🧠', '🔮'
    ];
    
    const vibrantColors = [
        'rgba(14,165,233,0.8)',   'rgba(16,185,129,0.8)',   'rgba(245,158,11,0.8)',
        'rgba(239,68,68,0.8)',    'rgba(139,92,246,0.8)',   'rgba(6,182,212,0.8)',
        'rgba(34,197,94,0.8)',    'rgba(251,146,60,0.8)',   'rgba(168,85,247,0.8)',
        'rgba(236,72,153,0.8)',   'rgba(59,130,246,0.8)',   'rgba(217,70,239,0.8)',
        'rgba(255,255,255,0.7)',  'rgba(255,215,0,0.7)',    'rgba(0,255,255,0.7)'
    ];
    
    const movementPatterns = ['pattern1', 'pattern2', 'pattern3', 'pattern4', 'pattern5', 'pattern6', 'pattern7', 'pattern8'];
    
    const doodle = document.createElement('div');
    const randomIcon = megaTechIcons[Math.floor(Math.random() * megaTechIcons.length)];
    const randomColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
    const randomPattern = movementPatterns[Math.floor(Math.random() * movementPatterns.length)];
    
    // Unique ID for tracking
    const doodleId = `doodle-${doodleCounter++}`;
    doodle.id = doodleId;
    
    // Apply classes for random movement patterns
    doodle.className = `floating-doodle tech-icon dynamic ${randomPattern}`;
    doodle.textContent = randomIcon;
    
    // Completely random positioning anywhere on screen
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const randomTop = Math.floor(Math.random() * (viewportHeight - 100)) + 50;
    const randomLeft = Math.floor(Math.random() * (viewportWidth - 100)) + 50;
    const randomSize = Math.floor(Math.random() * 40) + 20; // 20-60px
    const randomDelay = Math.random() * 5; // 0-5s delay
    
    // Set styles
    doodle.style.position = 'fixed';
    doodle.style.top = randomTop + 'px';
    doodle.style.left = randomLeft + 'px';
    doodle.style.fontSize = randomSize + 'px';
    doodle.style.color = randomColor;
    doodle.style.zIndex = '1';
    doodle.style.pointerEvents = 'none';
    doodle.style.animationDelay = randomDelay + 's';
    
    // Add to DOM and track
    document.body.appendChild(doodle);
    activeDoodles.push({
        element: doodle,
        id: doodleId,
        birthTime: Date.now(),
        lifespan: Math.random() * 15000 + 10000 // Live 10-25 seconds
    });
    
    console.log(`🎯 Born: "${randomIcon}" (${doodleId}) at (${randomLeft}, ${randomTop}) - Pattern: ${randomPattern}`);
    
    // Force reflow
    doodle.offsetHeight;
    
    return doodle;
}

function killDoodle(doodleData) {
    const doodle = doodleData.element;
    
    // Add dying animation
    doodle.classList.add('dying');
    
    console.log(`💀 Killing: "${doodle.textContent}" (${doodleData.id}) after ${((Date.now() - doodleData.birthTime) / 1000).toFixed(1)}s`);
    
    // Remove after fade animation completes
    setTimeout(() => {
        if (doodle.parentNode) {
            doodle.parentNode.removeChild(doodle);
        }
        // Remove from tracking array
        activeDoodles = activeDoodles.filter(d => d.id !== doodleData.id);
        console.log(`⚰️ Removed: ${doodleData.id} - Active count: ${activeDoodles.length}`);
    }, 2000);
}

function manageDoodleLifecycle() {
    const currentTime = Date.now();
    
    // Check for doodles that should die
    activeDoodles.forEach(doodleData => {
        if (currentTime - doodleData.birthTime > doodleData.lifespan) {
            killDoodle(doodleData);
        }
    });
    
    // Generate new doodles with variable probability based on current count
    const probability = activeDoodles.length < 10 ? 0.5 : // High chance if few doodles
                       activeDoodles.length < 20 ? 0.3 : // Medium chance if moderate
                       0.1; // Low chance if many doodles
    
    if (activeDoodles.length < maxDoodles && Math.random() < probability) {
        createRandomDoodle();
    }
    
    console.log(`🔄 Lifecycle check: ${activeDoodles.length}/${maxDoodles} active doodles`);
}

function initDynamicFloatingDoodles() {
    console.log('🚀 Initializing DYNAMIC floating doodles system...');
    
    // Clear any existing doodles
    const existingDoodles = document.querySelectorAll('.floating-doodle.dynamic');
    existingDoodles.forEach(doodle => doodle.remove());
    activeDoodles = [];
    
    // Create initial batch of doodles with staggered timing
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createRandomDoodle(), i * 300); // Stagger initial creation
    }
    
    // Start lifecycle management (check every 1.5 seconds for more responsiveness)
    setInterval(manageDoodleLifecycle, 1500);
    
    // Random burst generation with varying intervals
    const scheduleNextBurst = () => {
        const nextBurstDelay = Math.random() * 8000 + 5000; // 5-13 seconds
        setTimeout(() => {
            if (Math.random() < 0.6) { // 60% chance
                const burstCount = Math.floor(Math.random() * 4) + 1; // 1-4 doodles
                console.log(`💥 Random burst: generating ${burstCount} doodles`);
                for (let i = 0; i < burstCount; i++) {
                    setTimeout(() => createRandomDoodle(), i * 150);
                }
            }
            scheduleNextBurst(); // Schedule the next burst
        }, nextBurstDelay);
    };
    
    scheduleNextBurst(); // Start the burst cycle
    
    console.log('✅ Dynamic doodle system active with enhanced birth/death lifecycle!');
}

// Initialize the dynamic system is called within DOMContentLoaded

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

// Apply random movement patterns to static doodles
function randomizeStaticDoodles() {
    const staticDoodles = document.querySelectorAll('.floating-doodle.tech-icon:not(.dynamic)');
    const patterns = ['pattern1', 'pattern2', 'pattern3', 'pattern4', 'pattern5', 'pattern6', 'pattern7', 'pattern8'];
    
    staticDoodles.forEach(doodle => {
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        doodle.classList.add(randomPattern);
        console.log(`🎯 Applied ${randomPattern} to static doodle: ${doodle.textContent}`);
    });
    
    console.log(`✅ Randomized movement for ${staticDoodles.length} static doodles`);
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

// Function to create completely random movement keyframes for each doodle
function createRandomMovementKeyframes(doodleId, maxWidth, maxHeight) {
    const animationName = `randomMove_${doodleId}`;
    
    // Generate random waypoints across the entire page
    const waypoints = [];
    for (let i = 0; i <= 100; i += 10) { // Create keyframes every 10%
        const randomX = Math.random() * maxWidth - maxWidth/2; // Can go anywhere on page
        const randomY = Math.random() * maxHeight - maxHeight/2;
        const randomRotation = Math.random() * 720 - 360; // -360 to 360 degrees
        const randomScale = 0.7 + Math.random() * 0.8; // 0.7 to 1.5 scale
        const randomOpacity = 0.3 + Math.random() * 0.6; // 0.3 to 0.9 opacity
        
        waypoints.push({
            percent: i,
            x: randomX,
            y: randomY,
            rotation: randomRotation,
            scale: randomScale,
            opacity: randomOpacity
        });
    }
    
    // Create CSS keyframes string
    let keyframesCSS = `@keyframes ${animationName} {\n`;
    waypoints.forEach(point => {
        keyframesCSS += `    ${point.percent}% { 
            transform: translate(${point.x}px, ${point.y}px) rotate(${point.rotation}deg) scale(${point.scale}); 
            opacity: ${point.opacity}; 
        }\n`;
    });
    keyframesCSS += `}`;
    
    // Inject the CSS into the page
    const style = document.createElement('style');
    style.textContent = keyframesCSS;
    document.head.appendChild(style);
    
    console.log(`🎯 Created unique random movement: ${animationName}`);
    
    return { name: animationName, css: keyframesCSS };
}

// FONTAWESOME Technical Floating Doodles - Full-Stack Developer Focused
let faActiveDoodles = [];
let faDoodleCounter = 0;
const faMaxDoodles = 35; // Increased for more coverage across the page

function createRandomFontAwesomeDoodle() {
    // Comprehensive tech stack for a Full-Stack Python Developer
    const fullStackTechIcons = [
        // Python & Backend Frameworks
        'fab fa-python', 'fas fa-snake', 'fas fa-code', 'fas fa-terminal', 'fas fa-laptop-code',
        
        // Web Development - Frontend
        'fab fa-html5', 'fab fa-css3-alt', 'fab fa-js-square', 'fab fa-js', 'fab fa-react',
        'fab fa-vue', 'fab fa-angular', 'fas fa-palette', 'fas fa-paint-brush', 'fas fa-magic',
        
        // Frameworks & Libraries
        'fab fa-node-js', 'fab fa-npm', 'fas fa-layer-group', 'fas fa-cubes', 'fas fa-puzzle-piece',
        
        // Version Control & Development Tools
        'fab fa-github', 'fab fa-gitlab', 'fab fa-git-alt', 'fas fa-code-branch', 'fas fa-project-diagram',
        'fas fa-file-code', 'fas fa-bug', 'fas fa-wrench', 'fas fa-tools', 'fas fa-hammer',
        
        // Cloud Services - AWS
        'fab fa-aws', 'fas fa-cloud', 'fas fa-cloud-upload-alt', 'fas fa-cloud-download-alt',
        'fas fa-server', 'fas fa-database', 'fas fa-hdd', 'fas fa-network-wired',
        
        // Cloud Services - Azure & Others
        'fab fa-microsoft', 'fas fa-cube', 'fas fa-boxes', 'fas fa-archive', 'fas fa-folder-open',
        
        // Containers & DevOps
        'fab fa-docker', 'fas fa-shipping-fast', 'fas fa-cogs', 'fas fa-infinity', 'fas fa-sync-alt',
        
        // Databases & Data
        'fas fa-database', 'fas fa-table', 'fas fa-chart-bar', 'fas fa-chart-line', 'fas fa-chart-pie',
        'fas fa-analytics', 'fas fa-poll', 'fas fa-chart-area', 'fas fa-sitemap',
        
        // AI/ML & Data Science
        'fas fa-robot', 'fas fa-brain', 'fas fa-eye', 'fas fa-microscope', 'fas fa-flask',
        'fas fa-atom', 'fas fa-dna', 'fas fa-calculator', 'fas fa-function', 'fas fa-square-root-alt',
        
        // APIs & Web Services
        'fas fa-link', 'fas fa-exchange-alt', 'fas fa-share-alt', 'fas fa-globe', 'fas fa-wifi',
        'fas fa-broadcast-tower', 'fas fa-satellite', 'fas fa-rss', 'fas fa-plug',
        
        // Security & Authentication
        'fas fa-shield-alt', 'fas fa-lock', 'fas fa-key', 'fas fa-user-shield', 'fas fa-fingerprint',
        'fas fa-certificate', 'fas fa-id-badge', 'fas fa-passport',
        
        // Mobile & Responsive
        'fas fa-mobile-alt', 'fas fa-tablet-alt', 'fas fa-desktop', 'fas fa-tv', 'fas fa-window-maximize',
        
        // Performance & Optimization
        'fas fa-tachometer-alt', 'fas fa-rocket', 'fas fa-bolt', 'fas fa-fire', 'fas fa-zap',
        'fas fa-stopwatch', 'fas fa-hourglass-half', 'fas fa-compress-alt',
        
        // Documentation & Communication
        'fas fa-book', 'fas fa-file-alt', 'fas fa-sticky-note', 'fas fa-comment', 'fas fa-comments',
        'fab fa-stack-overflow', 'fab fa-slack', 'fab fa-discord',
        
        // General Development
        'fas fa-lightbulb', 'fas fa-star', 'fas fa-gem', 'fas fa-award', 'fas fa-trophy',
        'fas fa-medal', 'fas fa-crown', 'fas fa-magic', 'fas fa-wand-magic-sparkles',
        
        // System & Infrastructure
        'fab fa-linux', 'fab fa-ubuntu', 'fab fa-centos', 'fas fa-microchip', 'fas fa-memory',
        'fas fa-ethernet', 'fas fa-usb', 'fas fa-hard-drive',
        
        // Testing & Quality
        'fas fa-check-circle', 'fas fa-times-circle', 'fas fa-exclamation-triangle', 'fas fa-vial',
        'fas fa-flask', 'fas fa-search', 'fas fa-search-plus', 'fas fa-magnifying-glass'
    ];
    
    const vibrantColors = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4',
        '#22C55E', '#FB923C', '#A855F7', '#EC4899', '#6366F1', '#84CC16',
        '#F97316', '#14B8A6', '#F43F5E', '#DC2626', '#7C3AED', '#059669',
        '#D97706', '#7C2D12', '#BE123C', '#1E40AF', '#166534', '#92400E',
        '#DB2777', '#1D4ED8', '#047857', '#B45309', '#9333EA', '#0891B2'
    ];
    
    const doodle = document.createElement('i');
    const randomIcon = fullStackTechIcons[Math.floor(Math.random() * fullStackTechIcons.length)];
    const randomColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
    
    // Unique ID for tracking
    const doodleId = `fa-doodle-${faDoodleCounter++}`;
    doodle.id = doodleId;
    
    // Apply FontAwesome classes
    doodle.className = randomIcon + ' floating-fa-doodle';
    
    // Random positioning across ENTIRE page (not just viewport)
    const documentWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, 1400);
    const documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 4000);
    const randomTop = Math.floor(Math.random() * (documentHeight - 100)) + 50;
    const randomLeft = Math.floor(Math.random() * (documentWidth - 100)) + 50;
    const randomSize = Math.floor(Math.random() * 20) + 22; // 22-42px
    
    // Random speed range (slower speeds: 20s to 45s for animation duration)
    const randomSpeed = Math.floor(Math.random() * 25) + 20; // 20-45 seconds
    const randomGlowSpeed = Math.floor(Math.random() * 15) + 10; // 10-25 seconds
    
    // Create completely random movement path for this specific doodle
    const randomMovement = createRandomMovementKeyframes(doodleId, documentWidth, documentHeight);
    
    // Set styles with random speed - using ABSOLUTE positioning for full page coverage
    doodle.style.cssText = `
        position: absolute;
        top: ${randomTop}px;
        left: ${randomLeft}px;
        font-size: ${randomSize}px;
        color: ${randomColor};
        z-index: 1;
        pointer-events: none;
        opacity: 0.7;
        animation: 
            ${randomMovement.name} ${randomSpeed}s ease-in-out infinite,
            randomGlow ${randomGlowSpeed}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    // Add to DOM and track
    document.body.appendChild(doodle);
    faActiveDoodles.push({
        element: doodle,
        id: doodleId,
        birthTime: Date.now(),
        lifespan: Math.random() * 40000 + 30000 // Live 30-70 seconds (much longer)
    });
    
    console.log(`�️ Tech Icon Born: "${randomIcon}" (${doodleId}) at (${randomLeft}, ${randomTop}) - Speed: ${randomSpeed}s`);
    
    return doodle;
}

function killFontAwesomeDoodle(doodleData) {
    const doodle = doodleData.element;
    
    // Add dying animation
    doodle.style.animation = 'fadeOut 2s ease-in-out forwards';
    
    console.log(`💀 Killing Tech Icon: "${doodle.className}" (${doodleData.id})`);
    
    // Remove after fade animation completes
    setTimeout(() => {
        if (doodle.parentNode) {
            doodle.parentNode.removeChild(doodle);
        }
        faActiveDoodles = faActiveDoodles.filter(d => d.id !== doodleData.id);
        console.log(`⚰️ Removed: ${doodleData.id} - Active count: ${faActiveDoodles.length}`);
        
        // Schedule a replacement icon after a delay (5-15 seconds)
        const replacementDelay = Math.random() * 10000 + 5000; // 5-15 seconds
        setTimeout(() => {
            // Only create replacement if we're still below max and need more icons
            if (faActiveDoodles.length < faMaxDoodles - 5) {
                console.log(`🔄 Creating replacement icon after ${Math.round(replacementDelay/1000)}s delay`);
                createRandomFontAwesomeDoodle();
            }
        }, replacementDelay);
        
    }, 2000);
}

function manageFontAwesomeDoodleLifecycle() {
    const currentTime = Date.now();
    
    // Check for doodles that should die
    faActiveDoodles.forEach(doodleData => {
        if (currentTime - doodleData.birthTime > doodleData.lifespan) {
            killFontAwesomeDoodle(doodleData);
        }
    });
    
    // Much more conservative generation - only generate if we have significantly fewer doodles
    const probability = faActiveDoodles.length < 8 ? 0.2 :   // 20% chance if very few
                       faActiveDoodles.length < 15 ? 0.1 :   // 10% chance if moderate
                       faActiveDoodles.length < 25 ? 0.05 :  // 5% chance if many
                       0.01; // Very low chance if at max
    
    if (faActiveDoodles.length < faMaxDoodles && Math.random() < probability) {
        createRandomFontAwesomeDoodle();
    }
    
    console.log(`🔄 Full-Stack Doodle Check: ${faActiveDoodles.length}/${faMaxDoodles} active`);
}

function initFontAwesomeFloatingDoodles() {
    console.log('�️ Initializing FontAwesome Full-Stack Developer Doodles...');
    
    // Clear any existing doodles
    const existingDoodles = document.querySelectorAll('.floating-fa-doodle');
    existingDoodles.forEach(doodle => doodle.remove());
    faActiveDoodles = [];
    
    // Create smaller initial batch with longer delays
    for (let i = 0; i < 8; i++) {
        setTimeout(() => createRandomFontAwesomeDoodle(), i * 800); // Longer delay between initial icons
    }
    
    // Start lifecycle management with slower checks
    setInterval(manageFontAwesomeDoodleLifecycle, 3000); // Check every 3 seconds instead of 1
    
    // Less frequent burst generation with longer intervals
    const scheduleNextBurst = () => {
        const nextBurstDelay = Math.random() * 15000 + 10000; // 10-25 seconds (much longer)
        setTimeout(() => {
            if (Math.random() < 0.3 && faActiveDoodles.length < 20) { // 30% chance and only if under 20 icons
                const burstCount = Math.floor(Math.random() * 2) + 1; // 1-2 doodles (smaller bursts)
                console.log(`💥 Gentle Icon Burst: generating ${burstCount} icons`);
                for (let i = 0; i < burstCount; i++) {
                    setTimeout(() => createRandomFontAwesomeDoodle(), i * 500); // Longer delay between burst icons
                }
            }
            scheduleNextBurst();
        }, nextBurstDelay);
    };
    
    scheduleNextBurst();
    
    console.log('✅ FontAwesome Full-Stack doodle system is live across the entire page!');
}

//# sourceMappingURL=main.js.map
