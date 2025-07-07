// WORKING SCROLL ANIMATIONS - BIDIRECTIONAL & RE-ANIMATABLE
// Scroll animations loading
// console.log('🎬 SCROLL ANIMATIONS LOADING...');

document.addEventListener('DOMContentLoaded', function() {
    // DOM ready - initializing bidirectional scroll animations
    // console.log('🎬 DOM READY - INITIALIZING BIDIRECTIONAL SCROLL ANIMATIONS...');
    
    let observedElements = new Map(); // Store element data
    
    // Step 1: Inject CSS with high specificity
    const css = `
        /* SCROLL ANIMATIONS - HIGH PRIORITY */
        .scroll-animate, .scroll-animate-up, .scroll-animate-down,
        .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale,
        .scroll-animate-slide-left, .scroll-animate-slide-right, .scroll-animate-fast {
            opacity: 0 !important;
            transform: translateY(30px) !important;
            transition: opacity 0.8s ease-out, transform 0.8s ease-out !important;
            will-change: opacity, transform !important;
        }
        
        .scroll-animate-down { transform: translateY(-30px) !important; }
        .scroll-animate-left { transform: translateX(30px) !important; }
        .scroll-animate-right { transform: translateX(-30px) !important; }
        .scroll-animate-slide-left { transform: translateX(-50px) !important; }
        .scroll-animate-slide-right { transform: translateX(50px) !important; }
        .scroll-animate-scale { transform: scale(0.8) !important; }
        .scroll-animate-fast { 
            transform: translateY(20px) !important; 
            transition: opacity 0.5s ease-out, transform 0.5s ease-out !important;
        }
        
        /* ANIMATED STATE */
        .scroll-animate.scroll-animated, .scroll-animate-up.scroll-animated, .scroll-animate-down.scroll-animated,
        .scroll-animate-left.scroll-animated, .scroll-animate-right.scroll-animated, .scroll-animate-scale.scroll-animated,
        .scroll-animate-slide-left.scroll-animated, .scroll-animate-slide-right.scroll-animated, .scroll-animate-fast.scroll-animated {
            opacity: 1 !important;
            transform: translateY(0) translateX(0) scale(1) !important;
        }
    `;
    
    const style = document.createElement('style');
    style.id = 'scroll-animations-css';
    style.innerHTML = css;
    document.head.appendChild(style);
    // Scroll animation CSS injected
    // console.log('✅ SCROLL ANIMATION CSS INJECTED');
    
    // Step 2: Find all elements (including auto-added ones and embedded badges)
    const observeElements = () => {
        const animationSelectors = [
            '.scroll-animate', 
            '.scroll-animate-up', 
            '.scroll-animate-down',
            '.scroll-animate-left', 
            '.scroll-animate-right', 
            '.scroll-animate-scale',
            '.scroll-animate-slide-left', 
            '.scroll-animate-slide-right', 
            '.scroll-animate-fast',
            '.embedded-badge-wrapper',
            '.embedded-category',
            '.embedded-badges-section'
        ];
        
        let allElements = [];
        animationSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            allElements = [...allElements, ...elements];
        });
        
        // Add embedded badge wrappers to scroll animations
        const embeddedWrappers = document.querySelectorAll('.embedded-badge-wrapper');
        embeddedWrappers.forEach(wrapper => {
            if (!wrapper.classList.contains('scroll-animate-up')) {
                wrapper.classList.add('scroll-animate-up');
            }
        });
        
        // Add embedded categories to scroll animations  
        const embeddedCategories = document.querySelectorAll('.embedded-category');
        embeddedCategories.forEach(category => {
            if (!category.classList.contains('scroll-animate-up')) {
                category.classList.add('scroll-animate-up');
            }
        });
        
        // Add embedded badges section to scroll animations
        const embeddedSection = document.querySelector('.embedded-badges-section');
        if (embeddedSection && !embeddedSection.classList.contains('scroll-animate-up')) {
            embeddedSection.classList.add('scroll-animate-up');
        }
        
        return allElements;
    }
    
    // Step 3: Bidirectional Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const elementData = observedElements.get(element);
            
            if (entry.isIntersecting) {
                // Animate in
                // Animating in
                // console.log('🎬 ANIMATING IN:', element.tagName, element.className);
                element.classList.add('scroll-animated');
                if (elementData) {
                    elementData.isVisible = true;
                }
            } else {
                // Animate out (for re-animation)
                // Animating out
                // console.log('🔄 ANIMATING OUT:', element.tagName, element.className);
                element.classList.remove('scroll-animated');
                if (elementData) {
                    elementData.isVisible = false;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px' // More generous margins for better UX
    });
    
    // Step 4: Start observing and auto-add animation classes
    const elements = observeElements();
    
    elements.forEach((element, index) => {
        // Auto-add animation classes to elements that don't have them
        const hasScrollClass = element.className.includes('scroll-animate');
        
        if (!hasScrollClass) {
            // Add a varied animation class based on element type and position
            if (element.classList.contains('stat-card')) {
                element.classList.add(index % 2 === 0 ? 'scroll-animate-up' : 'scroll-animate-scale');
            } else if (element.classList.contains('experience-card') || element.classList.contains('project-card')) {
                element.classList.add(index % 3 === 0 ? 'scroll-animate-left' : 
                                   index % 3 === 1 ? 'scroll-animate-right' : 'scroll-animate-up');
            } else if (element.classList.contains('skills-card') || element.classList.contains('about-intro-card')) {
                element.classList.add('scroll-animate-scale');
            } else if (element.classList.contains('interests-card') || element.classList.contains('portfolio-card')) {
                element.classList.add('scroll-animate-down');
            } else if (element.classList.contains('testimonial-card')) {
                element.classList.add(index % 2 === 0 ? 'scroll-animate-left' : 'scroll-animate-right');
            } else {
                // Default animation
                element.classList.add('scroll-animate-up');
            }
            // Auto-added animation
            // console.log('✨ AUTO-ADDED ANIMATION:', element.tagName, element.className);
        }
        
        // Store element data
        observedElements.set(element, {
            isVisible: false,
            hasAnimation: true
        });
        
        // Start observing
        observer.observe(element);
    });
    
    // Observing elements
    // console.log(`🎬 OBSERVING ${elements.length} ELEMENTS (including auto-animated)`);
    // console.log('🎬 BIDIRECTIONAL SCROLL ANIMATIONS INITIALIZED!');
    
    // Optional: Re-scan for new elements periodically
    setInterval(() => {
        const newElements = observeElements();
        newElements.forEach(element => {
            if (!observedElements.has(element)) {
                // New element found, add animation and observe
                if (!element.className.includes('scroll-animate')) {
                    element.classList.add('scroll-animate-up');
                }
                observedElements.set(element, { isVisible: false, hasAnimation: true });
                observer.observe(element);
                // New element detected
                // console.log('🆕 NEW ELEMENT DETECTED:', element.tagName, element.className);
            }
        });
    }, 2000);
});
