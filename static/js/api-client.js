// Enhanced API Client - Gradual migration from JS to Python
// This file provides a seamless interface for using both old and new APIs

class PortfolioAPIClient {
    constructor() {
        this.apiVersion = 'v2';
        this.fallbackToV1 = true;
        this.baseUrl = '';
        this.performanceMode = this.detectPerformanceMode();
    }

    // Detect device performance capabilities
    detectPerformanceMode() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        
        if (isMobile) return 'mobile';
        if (isTablet) return 'tablet';
        return 'desktop';
    }

    // Enhanced doodle fetching with fallback
    async getDoodles(count = 15, section = null) {
        try {
            // Try enhanced API first
            const response = await fetch(`/api/v2/doodles/optimized?count=${count}&device=${this.performanceMode}&section=${section || ''}`);
            
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    console.log('✅ Using enhanced doodle API v2');
                    return data;
                }
            }
        } catch (error) {
            console.log('⚠️ Enhanced API unavailable, falling back to v1');
        }

        // Fallback to original API
        if (this.fallbackToV1) {
            try {
                const response = await fetch(`/api/doodles?count=${count}&section=${section || ''}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ Using fallback doodle API v1');
                    return { success: true, doodles: data.doodles || [], performance_config: null };
                }
            } catch (error) {
                console.error('❌ Both API versions failed:', error);
            }
        }

        return { success: false, doodles: [], error: 'All APIs unavailable' };
    }

    // Enhanced contact validation with fallback
    async validateContact(contactData) {
        try {
            // Try enhanced validation first
            const response = await fetch('/api/v2/contact/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    console.log('✅ Using enhanced contact validation v2');
                    return data;
                }
            }
        } catch (error) {
            console.log('⚠️ Enhanced contact API unavailable, using client-side validation');
        }

        // Fallback to client-side validation
        return this.clientSideValidation(contactData);
    }

    // Client-side validation fallback
    clientSideValidation(data) {
        const { name, email, subject, message } = data;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            return {
                success: true,
                valid: false,
                message: 'All fields are required',
                details: { client_side: true }
            };
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                success: true,
                valid: false,
                message: 'Please enter a valid email address',
                details: { client_side: true }
            };
        }

        return {
            success: true,
            valid: true,
            message: 'Valid',
            details: { client_side: true, validated_at: new Date().toISOString() }
        };
    }

    // Get performance configuration
    async getPerformanceConfig() {
        try {
            const response = await fetch(`/api/v2/doodles/config/${this.performanceMode}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    return data.config;
                }
            }
        } catch (error) {
            console.log('⚠️ Performance config API unavailable, using defaults');
        }

        // Fallback performance config
        const fallbackConfigs = {
            mobile: {
                max_doodles: 15,
                clean_interval: 45000,
                performance_threshold: 25,
                reduced_effects: true
            },
            tablet: {
                max_doodles: 25,
                clean_interval: 35000,
                performance_threshold: 30,
                reduced_effects: false
            },
            desktop: {
                max_doodles: 35,
                clean_interval: 30000,
                performance_threshold: 45,
                reduced_effects: false
            }
        };

        return fallbackConfigs[this.performanceMode] || fallbackConfigs.desktop;
    }

    // Report performance metrics
    async reportPerformance(metrics) {
        try {
            await fetch('/api/v2/performance/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...metrics,
                    device_type: this.performanceMode,
                    timestamp: new Date().toISOString()
                })
            });
        } catch (error) {
            // Silently fail for performance reporting
            console.log('Performance reporting unavailable');
        }
    }

    // Check API health
    async checkHealth() {
        try {
            const response = await fetch('/api/v2/status');
            if (response.ok) {
                const data = await response.json();
                return data.success;
            }
        } catch (error) {
            // API not available
        }
        return false;
    }
}

// Global API client instance
window.portfolioAPI = new PortfolioAPIClient();

// Initialize API client when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    const isHealthy = await window.portfolioAPI.checkHealth();
    if (isHealthy) {
        console.log('✅ Enhanced APIs available');
    } else {
        console.log('⚠️ Using fallback APIs');
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioAPIClient;
}
