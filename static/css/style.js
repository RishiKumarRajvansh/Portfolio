.contact-form-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

/* Contact Info Styles */
.contact-info {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.contact-item {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    background: var(--card-bg);
    border-radius: 15px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    cursor: pointer;
    backdrop-filter: blur(10px);
}

.contact-item:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-color);
    background: rgba(30, 41, 59, 0.95);
}

.contact-icon {
    width: 60px;
    height: 60px;
    background: var(--gradient-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    margin-right: 1.5rem;
    flex-shrink: 0;
    transition: all 0.3s ease;
}

.contact-item:hover .contact-icon {
    transform: scale(1.1);
    box-shadow: var(--shadow-glow);
}

.contact-details h4 {
    font-family: var(--font-heading);
    color: var(--text-primary);
    margin-bottom: 0.25rem;
    font-size: 1.1rem;
    font-weight: 600;
}

.contact-details a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.95rem;
}

.contact-details a:hover {
    color: var(--accent-color);
}

// ...existing form styles...