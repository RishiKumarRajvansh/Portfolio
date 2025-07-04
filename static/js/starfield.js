// Starfield System - Seamless Continuous Stars with Dynamic Navbar Themes

class StarfieldSystem {
    constructor() {
        this.stars = [];
        this.globalStars = [];
        this.shootingStars = [];
        this.constellations = [];
        this.heroStarfield = null;
        this.globalStarfield = null;
        this.animationFrame = null;
        this.isInitialized = false;
        
        // Configuration - Enhanced for Better Visual Impact
        this.config = {
            starCount: 150, // Hero section stars
            globalStarCount: 300, // Global page stars
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
        
        // Wait for both DOM and all resources to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.setup(), 500); // Delay to ensure CSS is loaded
            });
        } else {
            setTimeout(() => this.setup(), 500); // Delay to ensure CSS is loaded
        }
    }
    
    setup() {
        this.heroStarfield = document.getElementById('hero-starfield');
        this.globalStarfield = document.getElementById('global-starfield');
        
        // Create global starfield container if it doesn't exist
        if (!this.globalStarfield) {
            this.createGlobalStarfield();
        }
        
        if (!this.heroStarfield) {
            console.warn('Hero starfield container not found');
        }
        
        this.createStars();
        this.setupShootingStars();
        this.setupConstellations();
        this.startAnimation();
        
        this.isInitialized = true;
        console.log('✨ Starfield system initialized with global coverage');
    }
    
    createGlobalStarfield() {
        // Create global starfield container
        this.globalStarfield = document.createElement('div');
        this.globalStarfield.className = 'starfield-global';
        this.globalStarfield.id = 'global-starfield';
        
        // Insert at the beginning of body
        document.body.insertBefore(this.globalStarfield, document.body.firstChild);
        
        console.log('🌌 Global starfield container created');
    }
    
    createStars() {
        // Clear existing stars
        if (this.heroStarfield) {
            this.heroStarfield.innerHTML = '';
        }
        if (this.globalStarfield) {
            this.globalStarfield.innerHTML = '';
        }
        
        this.stars = [];
        this.globalStars = [];
        
        // Create stars for hero section
        for (let i = 0; i < this.config.starCount; i++) {
            this.createStar(true);
        }
        
        // Create stars for global background
        for (let i = 0; i < this.config.globalStarCount; i++) {
            this.createStar(false);
        }
    }
    
    createStar(isHero = true) {
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
        
        // Create star element
        if (isHero && this.heroStarfield) {
            star.element = this.createStarElement(star, false);
            this.heroStarfield.appendChild(star.element);
            this.stars.push(star);
        } else if (!isHero && this.globalStarfield) {
            star.element = this.createStarElement(star, true);
            this.globalStarfield.appendChild(star.element);
            this.globalStars.push(star);
        }
    }
    
    createStarElement(star, isGlobal = false) {
        const element = document.createElement('div');
        element.className = `star ${star.size}${Math.random() < 0.1 ? ' pulse-star' : ''}`;
        element.style.left = star.x + '%';
        element.style.top = star.y + '%';
        element.style.opacity = isGlobal ? star.opacity * 0.4 : star.opacity;
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
    
    // Navbar themes removed - navbar is now integrated into hero section
    // Theme management is handled by the main script.js file
    
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
