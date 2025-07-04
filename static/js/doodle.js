// FontAwesome Doodle System
// This file contains the doodle generation and animation system

// Global variables for doodle tracking
let faActiveDoodles = [];
let faDoodleCounter = 0;
let faMaxDoodles = window.innerWidth <= 768 ? 15 : 25; // Responsive limit

// Function to fetch doodle data from the server API (Enhanced version)
async function fetchDoodleData(count = 10) {
    try {
        // Use the new API client if available
        if (window.portfolioAPI) {
            const result = await window.portfolioAPI.getDoodles(count);
            if (result.success) {
                return {
                    doodles: result.doodles,
                    config: result.performance_config,
                    enhanced: true
                };
            }
        }

        // Fallback to original API
        const response = await fetch(`/api/doodles?count=${count}`);
        if (!response.ok) {
            throw new Error(`API returned status ${response.status}`);
        }
        const data = await response.json();
        return { 
            doodles: data.doodles || [], 
            config: data.config || null,
            enhanced: false 
        };
    } catch (error) {
        console.error('❌ Error fetching doodle data:', error);
        // Return fallback data if API fails
        return { doodles: [], config: null, enhanced: false };
    }
}

// Create a new floating FontAwesome doodle
async function createRandomFontAwesomeDoodle(serverData = null) {
    // Production mode - minimal logging
    
    // Python, Data Science & Programming focused icons
    const pythonDataScienceIcons = [
        // Python & Core Programming
        'fab fa-python', 'fab fa-python', 'fab fa-python', // Multiple Python icons for higher frequency
        'fas fa-code', 'fas fa-terminal', 'fas fa-laptop-code', 'fas fa-file-code',
        
        // Data Science & Analytics  
        'fas fa-chart-line', 'fas fa-chart-bar', 'fas fa-chart-pie', 'fas fa-chart-area',
        'fas fa-database', 'fas fa-table', 'fas fa-calculator', 'fas fa-analytics',
        
        // Development Tools & Version Control
        'fab fa-github', 'fab fa-git-alt', 'fas fa-code-branch', 'fas fa-project-diagram',
        
        // Machine Learning & AI symbols
        'fas fa-brain', 'fas fa-robot', 'fas fa-network-wired', 'fas fa-sitemap',
        'fas fa-cogs', 'fas fa-microchip', 'fas fa-memory',
        
        // Cloud & Infrastructure for Data Science
        'fab fa-aws', 'fas fa-cloud', 'fas fa-server', 'fas fa-hdd',
        'fab fa-docker', 'fas fa-cubes',
        
        // Jupyter Notebooks & Development
        'fas fa-file-alt', 'fas fa-sticky-note', 'fas fa-edit', 'fas fa-keyboard',
        
        // Mathematical & Scientific symbols
        'fas fa-square-root-alt', 'fas fa-infinity', 'fas fa-function', 'fas fa-equals',
        'fas fa-percentage', 'fas fa-plus', 'fas fa-minus', 'fas fa-times',
        
        // Data Visualization
        'fas fa-eye', 'fas fa-search', 'fas fa-filter', 'fas fa-sort',
        'fas fa-layer-group', 'fas fa-th', 'fas fa-stream'
    ];
    
    // Create the doodle element
    const doodle = document.createElement('i');
    
    // Use server data or fetch from API, fallback to client generation
    let randomIcon, lifetime;
    
    if (serverData) {
        // Use provided server data
        const iconName = serverData.icon || 'fa-code';
        const prefix = serverData.prefix || 'fas';
        randomIcon = `${prefix} ${iconName}`;
        lifetime = serverData.lifetime || 10000;
    } else {
        // Try to fetch from server API
        try {
            const apiData = await fetchDoodleData(1);
            if (apiData.doodles && apiData.doodles.length > 0) {
                const doodleData = apiData.doodles[0];
                const iconName = doodleData.icon || 'fa-code';
                const prefix = doodleData.prefix || 'fas';
                randomIcon = `${prefix} ${iconName}`;
                lifetime = doodleData.lifetime || 10000;
                // Server data used successfully
            } else {
                throw new Error('No doodle data from server');
            }
        } catch (error) {
            // Fallback to client-side generation
            // Generate on client as fallback
            randomIcon = pythonDataScienceIcons[Math.floor(Math.random() * pythonDataScienceIcons.length)];
            lifetime = Math.floor(Math.random() * 15000) + 5000; // 5-20 seconds
        }
    }
    
    // Unique ID for tracking
    const doodleId = `fa-doodle-${faDoodleCounter++}`;
    doodle.id = doodleId;
    
    // Apply FontAwesome classes and basic styling
    doodle.className = `${randomIcon} floating-fa-doodle`;
    
    // Remove emoji fallback to prevent double icons
    
    // Get current scroll position and calculate position relative to the current view
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const documentHeight = Math.max(
        document.body.scrollHeight, 
        document.documentElement.scrollHeight,
        document.body.offsetHeight, 
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        window.innerHeight * 3 // Ensure we cover the entire scrollable area
    );
    
    // Choose position based on provided data or random distribution
    let fixedTop, fixedLeft;
    
    // Always use random positioning across the entire viewport with better distribution
    const margin = 100; // Minimum distance from edges
    fixedTop = margin + Math.floor(Math.random() * (viewportHeight - 2 * margin)); 
    fixedLeft = margin + Math.floor(Math.random() * (viewportWidth - 2 * margin));
    
    // Ensure minimum distance from other doodles to prevent clustering
    const minDistance = 150; // Minimum pixels between doodles
    let attempts = 0;
    while (attempts < 10) {
        let tooClose = false;
        for (const activeDoodle of faActiveDoodles) {
            const otherDoodle = activeDoodle.element;
            if (otherDoodle && otherDoodle.style.left && otherDoodle.style.top) {
                const otherLeft = parseInt(otherDoodle.style.left);
                const otherTop = parseInt(otherDoodle.style.top);
                const distance = Math.sqrt(Math.pow(fixedLeft - otherLeft, 2) + Math.pow(fixedTop - otherTop, 2));
                if (distance < minDistance) {
                    tooClose = true;
                    break;
                }
            }
        }
        
        if (!tooClose) break;
        
        // Generate new position if too close
        fixedTop = margin + Math.floor(Math.random() * (viewportHeight - 2 * margin)); 
        fixedLeft = margin + Math.floor(Math.random() * (viewportWidth - 2 * margin));
        attempts++;
    }
    
    // Position determined after distance checks
    
    const randomSize = Math.floor(Math.random() * 20) + 20; // 20-40px
    
    // Set styles - with !important to override any conflicting styles
    // Choose a random animation for this doodle
    const animations = [
        'fadeInMove 25s ease-in-out infinite, randomGlow 15s ease-in-out infinite',
        'floatAround 30s ease-in-out infinite, randomGlow 15s ease-in-out infinite',
        'zigZag 20s ease-in-out infinite, randomGlow 10s ease-in-out infinite',
        'spiral 40s linear infinite, randomGlow 15s ease-in-out infinite',
        'bounce 15s ease-in-out infinite, randomGlow 12s ease-in-out infinite'
    ];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    
    doodle.style.cssText = `
        position: fixed !important;
        top: ${fixedTop}px !important;
        left: ${fixedLeft}px !important;
        font-size: ${randomSize}px !important;
        color: ${getRandomColor()} !important;
        z-index: 1 !important;
        transition: all 0.3s ease;
        opacity: 0.9 !important;
        display: block !important;
        visibility: visible !important;
        animation: ${randomAnimation} !important;
        pointer-events: none !important;
    `;
    
    // Track creation time for lifecycle
    doodle.dataset.created = Date.now();
    doodle.dataset.lifetime = lifetime;
    
    // Add to the floating-doodles container
    const doodleContainer = document.getElementById('floating-doodles');
    if (doodleContainer) {
        doodleContainer.appendChild(doodle);
        // console.log(`📍 Doodle ${doodleId} added to container. Container children count:`, doodleContainer.children.length);
    } else {
        console.error('❌ Container not found! Adding to body as fallback');
        document.body.appendChild(doodle); // fallback
    }
    
    // Add to tracking array
    faActiveDoodles.push({
        id: doodleId,
        element: doodle,
        birthTime: Date.now(),
        lifespan: lifetime
    });
    
    // console.log(`✅ Created doodle at (${fixedLeft}, ${fixedTop}) with id ${doodleId}. Icon: ${randomIcon}`);
    // console.log('📊 Total active doodles:', faActiveDoodles.length);
    return doodle;
}

// Remove a doodle when its lifecycle ends
function killFontAwesomeDoodle(doodleData) {
    const doodle = doodleData.element || document.getElementById(doodleData.id);
    if (!doodle) return;
    
    // Fade out
    doodle.style.transition = 'all 1s ease';
    doodle.style.opacity = '0';
    doodle.style.transform = 'scale(0)';
    
    // Remove after animation
    setTimeout(() => {
        if (doodle && doodle.parentNode) {
            doodle.parentNode.removeChild(doodle);
        }
        
        // Update tracking array
        faActiveDoodles = faActiveDoodles.filter(d => d.id !== doodleData.id);
        
        // Don't automatically replace doodles here - let lifecycle manager handle it
        // console.log(`Removed doodle ${doodleData.id}, ${faActiveDoodles.length} remaining`);
    }, 1000);
}

// Check for doodles that should be removed based on lifetime
function manageDoodleLifecycle() {
    const currentTime = Date.now();
    
    // Check all active doodles for expiration
    const expiredDoodles = faActiveDoodles.filter(doodleData => {
        const lifetime = parseInt(doodleData.element?.dataset?.lifetime) || doodleData.lifespan;
        return currentTime - doodleData.birthTime > lifetime;
    });
    
    // Remove expired doodles
    expiredDoodles.forEach(doodleData => {
        killFontAwesomeDoodle(doodleData);
    });
    
    // Create new doodles only if we're significantly below target
    const targetCount = window.innerWidth <= 768 ? 6 : 10;
    const currentCount = faActiveDoodles.length;
    
    if (currentCount < targetCount * 0.8) { // Only create when below 80% of target
        const needCount = 1; // Only create 1 at a time to prevent clustering
        
        setTimeout(() => {
            createRandomFontAwesomeDoodle();
        }, Math.random() * 2000); // Random delay up to 2 seconds
    }
    
    // console.log(`Doodle lifecycle: ${currentCount} active, ${expiredDoodles.length} removed`);
}

// Initialize the doodle system
function initFontAwesomeDoodles() {
    // Production mode - minimal logging
    
    try {
        // Clear any existing doodles
        const existingDoodles = document.querySelectorAll('.floating-fa-doodle');
        existingDoodles.forEach(doodle => doodle.remove());
        
        // Verify container
        const container = document.getElementById('floating-doodles');
        if (!container) {
            console.error('Container #floating-doodles not found!');
            return;
        }
        
        // Reset tracking array
        faActiveDoodles = [];
        
        // Create initial batch of doodles - distributed across viewport
        const initialCount = window.innerWidth <= 768 ? 8 : 12;
        // console.log(`Creating ${initialCount} initial doodles`);
        
        // Create doodles with staggered timing for smooth appearance
        for (let i = 0; i < initialCount; i++) {
            setTimeout(() => {
                // All doodles use random positioning (no viewport-focused grouping)
                createRandomFontAwesomeDoodle();
            }, i * 800); // Increased delay between each doodle to spread them out more
        }
        
        // Start lifecycle management with less aggressive timing
        setInterval(manageDoodleLifecycle, 3000); // Every 3 seconds instead of 1
        
        // console.log('✅ FontAwesome doodle system initialized with ' + initialCount + ' doodles');
    } catch (error) {
        console.error('❌ Error initializing doodle system:', error);
    }
}

// Scroll event handler to add doodles when scrolling
let lastScrollPosition = 0;
let scrollThrottle = false;

window.addEventListener('scroll', function() {
    if (scrollThrottle) return;
    
    scrollThrottle = true;
    setTimeout(() => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;
        
        // If scrolled significantly and not too many doodles
        if (Math.abs(currentScroll - lastScrollPosition) > 300 && faActiveDoodles.length < faMaxDoodles) {
            // Only 10% chance to create a doodle on significant scroll
            if (Math.random() < 0.1) {
                // console.log('Creating doodle on scroll');
                createRandomFontAwesomeDoodle({
                    viewportFocus: true,
                    scrollPosition: currentScroll
                });
            }
            lastScrollPosition = currentScroll;
        }
        
        scrollThrottle = false;
    }, 500); // Increased throttle time
});

// Helper functions
function getRandomColor() {
    const colors = [
        '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4',
        '#22C55E', '#FB923C', '#A855F7', '#EC4899', '#6366F1', '#84CC16',
        '#F97316', '#14B8A6', '#F43F5E'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Start the doodle system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Production mode - minimal logging
    
    // Verify FontAwesome availability
    const fontAwesomeLoaded = typeof window.FontAwesome !== 'undefined';
    if (!fontAwesomeLoaded) {
        console.warn('FontAwesome may not be fully loaded');
    }
    
    // Make sure the container exists
    let container = document.getElementById('floating-doodles');
    if (!container) {
        // Create container if it doesn't exist
        container = document.createElement('div');
        container.id = 'floating-doodles';
        container.className = 'floating-doodles';
        container.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 0 !important;
            pointer-events: none !important;
            overflow: visible !important;
            display: block !important;
            visibility: visible !important;
        `;
        document.body.appendChild(container);
        // Container created successfully
    } else {
        // Found existing container - good
    }
    
    // Force container visibility
    container.style.display = 'block';
    container.style.visibility = 'visible';
    container.style.zIndex = '0'; // Fixed z-index
    
    // Container verification completed
    
    // Wait for FontAwesome to be ready then initialize
    setTimeout(() => {
        initFontAwesomeDoodles();
    }, 1000);
});
