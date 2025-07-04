/**
 * Hero API Client
 * Handles communication with the Python backend for hero section data
 */

class HeroAPIClient {
    constructor() {
        this.baseURL = '/api/hero';
        this.cache = new Map();
        this.cacheTTL = 300000; // 5 minutes
    }

    /**
     * Make API request with error handling
     */
    async apiRequest(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const defaultOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const requestOptions = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, requestOptions);
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || data.message || 'API request failed');
            }

            return data.data;
        } catch (error) {
            console.error(`Hero API Error (${endpoint}):`, error);
            throw error;
        }
    }

    /**
     * Get cached data or fetch from API
     */
    async getCachedData(key, fetcher) {
        const cachedItem = this.cache.get(key);
        const now = Date.now();

        if (cachedItem && (now - cachedItem.timestamp) < this.cacheTTL) {
            return cachedItem.data;
        }

        try {
            const data = await fetcher();
            this.cache.set(key, {
                data,
                timestamp: now
            });
            return data;
        } catch (error) {
            // Return cached data if available, even if expired
            if (cachedItem) {
                console.warn('Using expired cache data due to API error');
                return cachedItem.data;
            }
            throw error;
        }
    }

    /**
     * Get complete hero section data
     */
    async getHeroData() {
        return this.getCachedData('hero_data', () => this.apiRequest('/'));
    }

    /**
     * Get hero statistics
     */
    async getHeroStats() {
        return this.getCachedData('hero_stats', () => this.apiRequest('/stats'));
    }

    /**
     * Get a specific hero statistic
     */
    async getHeroStat(statId) {
        return this.apiRequest(`/stats/${statId}`);
    }

    /**
     * Get typewriter text
     */
    async getTypewriterText(index = null) {
        const params = index !== null ? `?index=${index}` : '';
        return this.apiRequest(`/typewriter${params}`);
    }

    /**
     * Get next typewriter text
     */
    async getNextTypewriterText() {
        return this.apiRequest('/typewriter/next');
    }

    /**
     * Get profile information
     */
    async getProfileInfo() {
        return this.getCachedData('profile_info', () => this.apiRequest('/profile'));
    }

    /**
     * Get hero buttons
     */
    async getHeroButtons() {
        return this.getCachedData('hero_buttons', () => this.apiRequest('/buttons'));
    }

    /**
     * Increment a statistic
     */
    async incrementStat(statId) {
        return this.apiRequest(`/stats/${statId}/increment`, { method: 'POST' });
    }

    /**
     * Validate hero data
     */
    async validateHeroData() {
        return this.apiRequest('/validate');
    }

    /**
     * Get hero data as JSON
     */
    async getHeroJSON() {
        return this.apiRequest('/json');
    }

    /**
     * Health check
     */
    async healthCheck() {
        return this.apiRequest('/health');
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }

    /**
     * Initialize hero section with API data
     */
    async initializeHeroSection() {
        try {
            console.log('🚀 Initializing hero section with API data...');
            
            // Get hero data
            const heroData = await this.getHeroData();
            console.log('✅ Hero data loaded:', heroData);
            
            // Force hero elements visible first
            this.forceHeroElementsVisible();
            
            // Update statistics
            const stats = heroData.stats || await this.getHeroStats();
            this.updateHeroStats(stats);
            
            // Update typewriter
            if (heroData.typewriter_names) {
                this.initializeTypewriter(heroData.typewriter_names);
            }
            
            // Update buttons
            const buttons = heroData.buttons || await this.getHeroButtons();
            this.updateHeroButtons(buttons);
            
            console.log('✅ Hero section initialized successfully');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to initialize hero section:', error);
            
            // Fallback: still try to make hero elements visible
            this.forceHeroElementsVisible();
            return false;
        }
    }

    /**
     * Update hero statistics in the DOM
     */
    updateHeroStats(stats) {
        try {
            const techStats = document.querySelector('.tech-stats');
            if (!techStats) {
                console.warn('Tech stats container not found');
                return;
            }

            stats.forEach(stat => {
                const statCard = document.querySelector(`[data-stat-id="${stat.id}"]`);
                if (statCard) {
                    const numberElement = statCard.querySelector('.stat-number');
                    const labelElement = statCard.querySelector('.stat-label');
                    const iconElement = statCard.querySelector('.stat-icon i');

                    if (numberElement) {
                        numberElement.textContent = stat.number + '+';
                        numberElement.setAttribute('data-target', stat.number);
                    }
                    if (labelElement) {
                        labelElement.textContent = stat.label;
                    }
                    if (iconElement) {
                        iconElement.className = stat.icon;
                    }
                }
            });

            console.log('✅ Hero stats updated');
        } catch (error) {
            console.error('❌ Failed to update hero stats:', error);
        }
    }

    /**
     * Update hero buttons in the DOM
     */
    updateHeroButtons(buttons) {
        try {
            const buttonsContainer = document.querySelector('.hero-buttons');
            if (!buttonsContainer) {
                console.warn('Hero buttons container not found');
                return;
            }

            buttons.forEach((button, index) => {
                const buttonElement = buttonsContainer.children[index];
                if (buttonElement) {
                    buttonElement.textContent = button.text;
                    buttonElement.href = button.href;
                    buttonElement.className = button.class;
                }
            });

            console.log('✅ Hero buttons updated');
        } catch (error) {
            console.error('❌ Failed to update hero buttons:', error);
        }
    }

    /**
     * Initialize typewriter with API data
     */
    initializeTypewriter(names) {
        try {
            if (window.typewriterNames) {
                window.typewriterNames = names;
                console.log('✅ Typewriter names updated');
            }
        } catch (error) {
            console.error('❌ Failed to initialize typewriter:', error);
        }
    }

    /**
     * Force refresh hero section stats
     */
    async refreshHeroStats() {
        try {
            this.clearCache();
            const stats = await this.getHeroStats();
            this.updateHeroStats(stats);
            
            // Trigger counter animations
            const techStats = document.querySelector('.tech-stats');
            if (techStats && window.animateCounters) {
                window.animateCounters(techStats);
            }
            
            console.log('✅ Hero stats refreshed');
        } catch (error) {
            console.error('❌ Failed to refresh hero stats:', error);
        }
    }

    /**
     * Force hero elements to be visible (delegated to animations.js)
     */
    forceHeroElementsVisible() {
        // Delegate to the main animation system to avoid conflicts
        if (window.forceHeroElementsVisible) {
            window.forceHeroElementsVisible();
        } else {
            console.warn('⚠️ Main animation system not loaded yet');
        }
    }
}

// Global instance
window.heroAPIClient = new HeroAPIClient();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎯 DOM loaded, initializing hero section...');
    
    // Wait a moment for all elements to be in place
    setTimeout(async () => {
        try {
            await window.heroAPIClient.initializeHeroSection();
            
            // Additional fallback after 1 second
            setTimeout(() => {
                window.heroAPIClient.forceHeroElementsVisible();
            }, 1000);
            
        } catch (error) {
            console.error('Failed to auto-initialize hero section:', error);
            
            // Fallback: try to make elements visible anyway
            setTimeout(() => {
                window.heroAPIClient.forceHeroElementsVisible();
            }, 500);
        }
    }, 100);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroAPIClient;
}
