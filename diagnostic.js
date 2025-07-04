// DIAGNOSTIC SCRIPT - Run in browser console
(function() {
    console.log('🔍 DIAGNOSTIC REPORT');
    console.log('==================');
    
    // Check navbar
    const navbar = document.querySelector('.navbar');
    console.log('Navbar found:', !!navbar);
    if (navbar) {
        console.log('Navbar styles:', {
            position: getComputedStyle(navbar).position,
            top: getComputedStyle(navbar).top,
            zIndex: getComputedStyle(navbar).zIndex,
            opacity: getComputedStyle(navbar).opacity,
            visibility: getComputedStyle(navbar).visibility,
            display: getComputedStyle(navbar).display
        });
    }
    
    // Check for scroll animation elements
    const scrollElements = document.querySelectorAll('[class*="scroll-animate"], .skills-card, .tech-tag, .skill-category');
    console.log('Scroll animation elements found:', scrollElements.length);
    
    scrollElements.forEach((el, index) => {
        if (index < 5) { // Log first 5 elements
            console.log(`Element ${index}:`, {
                className: el.className,
                tagName: el.tagName,
                opacity: getComputedStyle(el).opacity,
                transform: getComputedStyle(el).transform,
                transition: getComputedStyle(el).transition
            });
        }
    });
    
    // Check if scripts are loaded
    console.log('Scripts loaded:');
    console.log('- universal-scroll.js:', typeof window.ScrollAnimations !== 'undefined');
    console.log('- navbar stars created:', !!document.querySelector('.navbar-stars'));
    
    // Check CSS files
    const coreAnimationsCSS = Array.from(document.styleSheets).find(sheet => 
        sheet.href && sheet.href.includes('core-animations.css'));
    console.log('Core animations CSS loaded:', !!coreAnimationsCSS);
    
    console.log('==================');
})();
