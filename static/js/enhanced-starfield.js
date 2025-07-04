// Enhanced Starfield Background
(function() {
    'use strict';
    
    // Configuration
    const config = {
        starCount: 100,
        minSize: 1,
        maxSize: 4,
        speed: 0.5,
        opacity: 0.8,
        heroStars: 50
    };
    
    // Create stars for global starfield
    function createGlobalStars() {
        const starfield = document.getElementById('global-starfield');
        if (!starfield) return;
        
        // Clear existing stars
        starfield.innerHTML = '';
        
        // Create stars
        for (let i = 0; i < config.starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * (config.maxSize - config.minSize) + config.minSize}px;
                height: ${Math.random() * (config.maxSize - config.minSize) + config.minSize}px;
                background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(14,165,233,0.6));
                border-radius: 50%;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                opacity: ${Math.random() * config.opacity + 0.2};
                animation: twinkle ${Math.random() * 3 + 2}s infinite ease-in-out;
                pointer-events: none;
                z-index: 1;
            `;
            starfield.appendChild(star);
        }
        
        console.log('✨ Global starfield created with', config.starCount, 'stars');
    }
    
    // Create stars for hero section
    function createHeroStars() {
        const heroStarfield = document.getElementById('hero-starfield');
        if (!heroStarfield) return;
        
        // Clear existing stars
        heroStarfield.innerHTML = '';
        
        // Create more prominent stars for hero
        for (let i = 0; i < config.heroStars; i++) {
            const star = document.createElement('div');
            star.className = 'hero-star';
            star.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: radial-gradient(circle, rgba(255,255,255,0.9), rgba(14,165,233,0.7));
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.8 + 0.3};
                animation: hero-twinkle ${Math.random() * 4 + 3}s infinite ease-in-out;
                pointer-events: none;
                z-index: 2;
                box-shadow: 0 0 10px rgba(255,255,255,0.5);
            `;
            heroStarfield.appendChild(star);
        }
        
        console.log('🌟 Hero starfield created with', config.heroStars, 'stars');
    }
    
    // Create body-wide starfield
    function createBodyStarfield() {
        // Remove existing body stars
        const existingStars = document.querySelectorAll('.body-star');
        existingStars.forEach(star => star.remove());
        
        // Create stars across the entire body
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.className = 'body-star';
            star.style.cssText = `
                position: fixed;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: radial-gradient(circle, rgba(255,255,255,0.7), rgba(14,165,233,0.5));
                border-radius: 50%;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                opacity: ${Math.random() * 0.6 + 0.2};
                animation: body-twinkle ${Math.random() * 5 + 3}s infinite ease-in-out;
                pointer-events: none;
                z-index: 1;
            `;
            document.body.appendChild(star);
        }
        
        console.log('🌌 Body starfield created with 80 stars');
    }
    
    // Add CSS animations
    function addStarAnimations() {
        if (document.getElementById('star-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'star-animations';
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
            
            @keyframes hero-twinkle {
                0%, 100% { opacity: 0.4; transform: scale(1) rotate(0deg); }
                33% { opacity: 0.8; transform: scale(1.3) rotate(120deg); }
                66% { opacity: 0.6; transform: scale(1.1) rotate(240deg); }
            }
            
            @keyframes body-twinkle {
                0%, 100% { opacity: 0.2; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.1); }
            }
            
            .star, .hero-star, .body-star {
                will-change: transform, opacity;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize starfield
    function init() {
        console.log('🌌 Enhanced starfield initializing...');
        
        // Add animations
        addStarAnimations();
        
        // Create stars
        createGlobalStars();
        createHeroStars();
        createBodyStarfield();
        
        // Update periodically for dynamic effect
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 8 seconds
                createGlobalStars();
                createBodyStarfield();
            }
        }, 8000);
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
