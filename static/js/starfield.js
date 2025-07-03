// Starfield System - Seamless Continuous Stars with Dynamic Navbar Themes

class StarfieldSystem {
    constructor() {
        this.stars = [];
        this.shootingStars = [];
        this.constellations = [];
        this.heroStarfield = null;
        this.navbarStarfield = null;
        this.animationFrame = null;
        this.isInitialized = false;
        
        // Configuration - Enhanced for Better Visual Impact
        this.config = {
            starCount: 250, // Increased from 150
            heroStarCount: 300, // Extra stars for hero section
            shootingStarInterval: 3000, // More frequent - every 3 seconds instead of 8
            shootingStarChance: 0.6, // 60% chance instead of 30%
            constellationCount: 5, // More constellations
            starSizes: ['small', 'medium', 'large', 'bright'],
            starWeights: [0.4, 0.35, 0.2, 0.05] // More medium and large stars
        };
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.heroStarfield = document.getElementById('hero-starfield');
        // Remove navbar starfield since navbar is now in hero
        this.navbarStarfield = null;
        
        if (!this.heroStarfield) {
            console.warn('Hero starfield container not found');
            return;
        }
        
        this.createStars();
        this.setupShootingStars();
        this.setupConstellations();
        // Remove navbar theme setup since navbar is in hero
        this.startAnimation();
        
        this.isInitialized = true;
        console.log('✨ Starfield system initialized (hero-only mode)');
    }
    
    createStars() {
        // Clear existing stars
        if (this.heroStarfield) {
            this.heroStarfield.innerHTML = '';
        }
        
        this.stars = [];
        
        // Create stars only for hero section now
        for (let i = 0; i < this.config.heroStarCount; i++) {
            this.createStar();
        }
    }
    
    createStar() {
        const star = {
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: this.getRandomStarSize(),
            element: null,
            opacity: Math.random() * 0.6 + 0.4, // Higher baseline opacity
            twinkleSpeed: Math.random() * 2 + 1,
            floatSpeed: Math.random() * 0.5 + 0.1,
            floatDirection: Math.random() * Math.PI * 2
        };
        
        // Create star element only for hero
        if (this.heroStarfield) {
            star.element = this.createStarElement(star, false);
            this.heroStarfield.appendChild(star.element);
        }
        
        this.stars.push(star);
    }
    
    createStarElement(star, isNavbar = false) {
        const element = document.createElement('div');
        element.className = `star ${star.size}${Math.random() < 0.1 ? ' pulse-star' : ''}`;
        element.style.left = star.x + '%';
        element.style.top = star.y + '%';
        element.style.opacity = isNavbar ? star.opacity * 0.7 : star.opacity;
        element.style.animationDelay = Math.random() * 3 + 's';
        element.style.animationDuration = star.twinkleSpeed + 's';
        
        return element;
    }
    
    getRandomStarSize() {
        const random = Math.random();
        let accumulated = 0;
        
        for (let i = 0; i < this.config.starWeights.length; i++) {
            accumulated += this.config.starWeights[i];
            if (random < accumulated) {
                return this.config.starSizes[i];
            }
        }
        
        return this.config.starSizes[0];
    }
    
    setupShootingStars() {
        this.createShootingStar();
        setInterval(() => {
            if (Math.random() < this.config.shootingStarChance) {
                this.createShootingStar();
            }
        }, this.config.shootingStarInterval);
    }
    
    createShootingStar() {
        if (!this.heroStarfield) return;
        
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        // Random starting position (off-screen top-left area)
        const startX = Math.random() * (window.innerWidth * 0.3) - 100;
        const startY = Math.random() * (window.innerHeight * 0.3) - 100;
        
        shootingStar.style.left = startX + 'px';
        shootingStar.style.top = startY + 'px';
        shootingStar.style.animationDelay = Math.random() * 1 + 's';
        shootingStar.style.animationDuration = (Math.random() * 1.5 + 2) + 's'; // 2-3.5s duration
        
        this.heroStarfield.appendChild(shootingStar);
        
        // Remove after animation
        setTimeout(() => {
            if (shootingStar.parentNode) {
                shootingStar.parentNode.removeChild(shootingStar);
            }
        }, 4000);
    }
    
    setupConstellations() {
        if (!this.heroStarfield) return;
        
        for (let i = 0; i < this.config.constellationCount; i++) {
            this.createConstellation();
        }
    }
    
    createConstellation() {
        const constellation = document.createElement('div');
        constellation.className = 'constellation';
        
        // Create constellation lines
        for (let i = 0; i < 3; i++) {
            const line = document.createElement('div');
            line.className = 'constellation-line';
            
            const angle = Math.random() * 360;
            const length = Math.random() * 100 + 50;
            const x = Math.random() * 80 + 10;
            const y = Math.random() * 80 + 10;
            
            line.style.width = length + 'px';
            line.style.left = x + '%';
            line.style.top = y + '%';
            line.style.transform = `rotate(${angle}deg)`;
            line.style.animationDelay = Math.random() * 4 + 's';
            
            constellation.appendChild(line);
        }
        
        this.heroStarfield.appendChild(constellation);
    }
    
    setupNavbarThemes() {
        // Setup Intersection Observer for navbar theme changes
        const sections = document.querySelectorAll('section[id]');
        
        if (sections.length === 0 || !this.navbarStarfield) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.updateNavbarTheme(sectionId);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Set initial theme
        this.updateNavbarTheme('home');
    }
    
    updateNavbarTheme(sectionId) {
        if (!this.navbarStarfield) return;
        
        // Remove existing theme classes
        this.navbarStarfield.className = this.navbarStarfield.className
            .replace(/theme-\w+/g, '');
        
        // Add new theme class
        this.navbarStarfield.classList.add(`theme-${sectionId}`);
        
        console.log(`🌟 Navbar theme updated to: ${sectionId}`);
    }
    
    startAnimation() {
        // Subtle floating animation for stars
        const animateStars = () => {
            this.stars.forEach(star => {
                if (star.element) {
                    const time = Date.now() * 0.001 * star.floatSpeed;
                    const offsetX = Math.sin(time + star.floatDirection) * 0.5;
                    const offsetY = Math.cos(time + star.floatDirection * 0.7) * 0.3;
                    
                    star.element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                }
            });
            
            this.animationFrame = requestAnimationFrame(animateStars);
        };
        
        animateStars();
    }
    
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        if (this.heroStarfield) {
            this.heroStarfield.innerHTML = '';
        }
        
        this.stars = [];
        this.isInitialized = false;
        
        console.log('🌟 Starfield system destroyed');
    }
    
    // Public methods for external control
    updateStarCount(count) {
        this.config.starCount = count;
        this.createStars();
    }
    
    toggleShootingStars(enabled) {
        // Implementation for toggling shooting stars
        console.log(`Shooting stars ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    setOpacity(opacity) {
        this.stars.forEach(star => {
            if (star.element) {
                star.element.style.opacity = opacity * star.opacity;
            }
            if (star.navElement) {
                star.navElement.style.opacity = opacity * star.opacity * 0.7;
            }
        });
    }
}

// Global starfield instance
let starfieldSystem = null;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    starfieldSystem = new StarfieldSystem();
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (starfieldSystem) {
        starfieldSystem.destroy();
    }
});

// Handle visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (starfieldSystem) {
        if (document.hidden) {
            // Pause animations when tab is hidden
            starfieldSystem.setOpacity(0.3);
        } else {
            // Resume animations when tab is visible
            starfieldSystem.setOpacity(1);
        }
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StarfieldSystem;
} else if (typeof window !== 'undefined') {
    window.StarfieldSystem = StarfieldSystem;
}
