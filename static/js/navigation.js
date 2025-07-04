// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Production mode - only log errors, not debug info
    const DEBUG_MODE = false; // Set to true for debugging
    
    function debugLog(...args) {
        if (DEBUG_MODE) console.log(...args);
    }
    
    debugLog('🔧 Initializing navigation...');
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    debugLog('Nav elements found:', {
        navToggle: !!navToggle,
        navMenu: !!navMenu,
        navLinksCount: navLinks.length,
        navbar: !!navbar
    });
    
    // Navbar scroll effect
    if (navbar) {
        let lastScrollY = window.scrollY;
        
        function handleScroll() {
            const currentScrollY = window.scrollY;
            
            // Add/remove scrolled class based on scroll position
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // FORCE navbar to always be visible
            navbar.style.transform = 'translateY(0) !important';
            navbar.style.opacity = '1 !important';
            navbar.style.visibility = 'visible !important';
            navbar.style.display = 'block !important';
            navbar.style.position = 'fixed !important';
            navbar.style.top = '0 !important';
            navbar.style.zIndex = '10000 !important';
            
            lastScrollY = currentScrollY;
            
            console.log('Navbar scroll update:', {
                scrollY: currentScrollY,
                hasScrolled: currentScrollY > 50,
                navbarVisible: navbar.style.opacity,
                navbarTransform: navbar.style.transform
            });
        }
        
        // Force initial visibility
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
        navbar.style.display = 'block';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.zIndex = '10000';
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call
        
        console.log('✅ Navbar scroll handler initialized');
    }
    
    // Toggle mobile menu
    if (navToggle && navMenu) {
        debugLog('✅ Setting up mobile navigation event listeners');
        
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            debugLog('🔄 Nav toggle clicked');
            debugLog('Before toggle - navToggle classes:', navToggle.className);
            debugLog('Before toggle - navMenu classes:', navMenu.className);
            
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            debugLog('After toggle - navToggle classes:', navToggle.className);
            debugLog('After toggle - navMenu classes:', navMenu.className);
            debugLog('After toggle - navMenu computed display:', window.getComputedStyle(navMenu).display);
        });
        
        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                debugLog('🔗 Nav link clicked:', this.textContent.trim());
                debugLog('Before link click - navToggle classes:', navToggle.className);
                debugLog('Before link click - navMenu classes:', navMenu.className);
                
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                debugLog('After link click - navToggle classes:', navToggle.className);
                debugLog('After link click - navMenu classes:', navMenu.className);
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                if (navToggle.classList.contains('active')) {
                    debugLog('🌐 Clicking outside nav - closing menu');
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    } else {
        console.error('❌ Navigation elements not found. Check if nav-toggle and nav-menu IDs exist.');
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
