// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
    // Contact form handling
    const contactForm = document.querySelector('.modern-contact-form');
    const sendBtn = document.querySelector('.send-message-btn');
    
    if (contactForm && sendBtn) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const subject = formData.get('subject') || '';
            const message = formData.get('message') || '';
            
            // Validate required fields
            if (!name.trim() || !email.trim() || !message.trim()) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Update button state
            const originalText = sendBtn.innerHTML;
            sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            sendBtn.disabled = true;
            
            // Create mailto URL
            const mailtoUrl = createMailtoUrl(email, name, subject, message);
            
            // Show success message and open email client
            setTimeout(() => {
                window.location.href = mailtoUrl;
                showNotification('Email client opened! Please send the email to complete your message.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                sendBtn.innerHTML = originalText;
                sendBtn.disabled = false;
            }, 1000);
        });
    }

    // Handle "Get My Pricing" button
    const pricingBtn = document.querySelector('.hire-btn');
    if (pricingBtn) {
        pricingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const subject = 'Project Inquiry - Request for Pricing';
            const body = `Hello,

I'm interested in your services and would like to discuss a potential project.

Please provide:
1. Your current availability
2. Pricing structure for freelance projects
3. Your preferred communication method for project discussions

Project details:
- Project type: [Please describe your project]
- Timeline: [Your preferred timeline]
- Budget range: [Your budget range]

Best regards,
[Your name]`;
            
            const mailtoUrl = `mailto:${getContactEmail()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoUrl;
            
            showNotification('Email template opened! Please complete and send.', 'info');
        });
    }

    // Server-side form submission fallback
    function submitFormToServer(formData) {
        return fetch('/contact', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification(data.message || 'Message sent successfully!', 'success');
                if (contactForm) contactForm.reset();
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        })
        .catch(error => {
            console.error('Server submission failed:', error);
            throw error;
        });
    }

    // Helper function to get contact email
    function getContactEmail() {
        // You can replace this with your actual email
        return 'hello@example.com';
    }

    // Helper function to create mailto URLs
    function createMailtoUrl(replyTo, name, subject, message) {
        const email = getContactEmail();
        const fullSubject = subject ? `${subject} - From ${name}` : `Contact Form Message - From ${name}`;
        const fullMessage = `From: ${name} (${replyTo})

${message}

---
This message was sent via the contact form.`;
        
        return `mailto:${email}?subject=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(fullMessage)}`;
    }

    // Helper function to show notifications
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}
                </span>
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0ea5e9'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 1000;
            font-family: var(--font-body);
            font-size: 0.9rem;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: auto;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Handle close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
});
