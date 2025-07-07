// Typewriter animation for hero section with API integration
document.addEventListener('DOMContentLoaded', function() {
    // Global variable to prevent multiple typewriter animations
    let typewriterInterval;
    let isTypewriterRunning = false;
    let typewriterNames = ['RISHI KUMAR', 'PYTHON DEVELOPER', 'DATA SCIENTIST', 'ML ENGINEER'];

    // Initialize typewriter with API data
    async function initializeTypewriterWithAPI() {
        try {
            if (window.heroAPIClient) {
                const heroData = await window.heroAPIClient.getHeroData();
                if (heroData.typewriter_names) {
                    typewriterNames = heroData.typewriter_names;
                    // Typewriter names loaded from API
                    // console.log('✅ Typewriter names loaded from API:', typewriterNames);
                }
            }
        } catch (error) {
            console.warn('⚠️ Failed to load typewriter names from API, using defaults:', error);
        }
    }

    // Typing Animation for Name - Continuous Loop with Enhanced Error Handling
    async function startTypewriter() {
        if (isTypewriterRunning) {
            // Typewriter already running, skipping
            // console.log('Typewriter already running, skipping...');
            return;
        }

        // Initialize with API data first
        await initializeTypewriterWithAPI();

        const nameElement = document.getElementById('typewriter');
        if (!nameElement) {
            console.error('Element with ID "typewriter" not found');
            fallbackShowName();
            return;
        }

        const names = typewriterNames;
        let nameIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentName = '';
        const typingSpeed = 100; // ms per character
        const deletingSpeed = 50; // ms per character when deleting
        const pauseDelay = 2000; // ms to pause at end of word
        const deleteDelay = 1000; // ms to pause before starting to delete

        isTypewriterRunning = true;

        function typeWriter() {
            try {
                currentName = names[nameIndex];

                if (!isDeleting && charIndex < currentName.length) {
                    // Typing forward
                    nameElement.textContent = currentName.substring(0, charIndex + 1);
                    charIndex++;
                    typewriterInterval = setTimeout(typeWriter, typingSpeed);
                } else if (!isDeleting && charIndex === currentName.length) {
                    // Finished typing, pause then start deleting
                    typewriterInterval = setTimeout(() => {
                        isDeleting = true;
                        typeWriter();
                    }, pauseDelay);
                } else if (isDeleting && charIndex > 0) {
                    // Deleting
                    nameElement.textContent = currentName.substring(0, charIndex - 1);
                    charIndex--;
                    typewriterInterval = setTimeout(typeWriter, deletingSpeed);
                } else if (isDeleting && charIndex === 0) {
                    // Finished deleting, move to next name
                    isDeleting = false;
                    nameIndex = (nameIndex + 1) % names.length;
                    typewriterInterval = setTimeout(typeWriter, deleteDelay);
                }
            } catch (error) {
                console.error('Error in typewriter animation:', error);
                isTypewriterRunning = false;
                fallbackShowName();
            }
        }

        // Start the animation
        typeWriter();
    }

    // Function to restart typewriter (can be called from console or Flask)
    window.restartTypewriter = function() {
        if (typewriterInterval) {
            clearTimeout(typewriterInterval);
        }
        isTypewriterRunning = false;
        startTypewriter();
    };

    // Function to stop typewriter
    window.stopTypewriter = function() {
        if (typewriterInterval) {
            clearTimeout(typewriterInterval);
            isTypewriterRunning = false;
            // Typewriter stopped
            // console.log('Typewriter stopped');
        }
    };

    // Simple fallback function to show the name with static text
    function fallbackShowName() {
        const nameElement = document.getElementById('typewriter');
        if (nameElement) {
            nameElement.textContent = 'RISHI KUMAR';
            // Fallback: Showing static name
            // console.log('Fallback: Showing static name');
        }
    }

    // Function to refresh hero stats from API
    window.refreshHeroStats = async function() {
        try {
            if (window.heroAPIClient) {
                await window.heroAPIClient.refreshHeroStats();
                // Hero stats refreshed from API
                // console.log('✅ Hero stats refreshed from API');
            } else {
                console.warn('⚠️ Hero API client not available');
            }
        } catch (error) {
            console.error('❌ Failed to refresh hero stats:', error);
        }
    };

    // Function to update hero section with API data
    window.updateHeroFromAPI = async function() {
        try {
            if (window.heroAPIClient) {
                const success = await window.heroAPIClient.initializeHeroSection();
                if (success) {
                    // Restart typewriter with new data
                    window.restartTypewriter();
                    // Force visibility of hero elements
                    setTimeout(() => {
                        // Hero elements will be handled by animations.js
                    }, 100);
                }
            }
        } catch (error) {
            console.error('❌ Failed to update hero from API:', error);
        }
    };

    // Auto-update hero with API data when available
    setTimeout(async () => {
        await window.updateHeroFromAPI();
        // Hero elements will be handled by the main animation system
    }, 500);

    // Start typewriter animation
    startTypewriter();
});
