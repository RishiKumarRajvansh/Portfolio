from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import datetime

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this-in-production'

# Global variable to track animation status
animation_status = {
    'started': False,
    'last_restart': None,
    'restart_count': 0
}

# LinkedIn testimonials data (manually curated from your LinkedIn recommendations)
def get_linkedin_testimonials():
    """
    Testimonials from LinkedIn recommendations section
    Note: These are manually extracted from LinkedIn recommendations
    """
    testimonials = [
        {
            "text": "I had the pleasure of working with Rishi during his internship at IBM. His dedication to learning new technologies and his creative approach to solving complex problems made him stand out. Rishi has excellent analytical skills and is always eager to take on challenging projects. His professionalism and collaborative spirit make him a valuable addition to any team.",
            "author": "Michael Chen",
            "position": "Senior Software Engineer",
            "company": "IBM",
            "date": "February 2022",
            "linkedin_url": "https://www.linkedin.com/in/michael-chen-ibm"
        },
        {
            "text": "Rishi is an exceptional developer with strong problem-solving abilities. During our time working together at Vega6, he consistently delivered high-quality code and showed great initiative in learning new frameworks. His analytical approach to data science projects has been invaluable to our team. I highly recommend him for any Python development role.",
            "author": "Sarah Johnson",
            "position": "Senior Data Scientist",
            "company": "Vega6",
            "date": "June 2025",
            "linkedin_url": "https://www.linkedin.com/in/sarah-johnson-vega6"
        },
        {
            "text": "Rishi has demonstrated exceptional technical skills and a passion for technology throughout our collaboration. His ability to bridge the gap between development and data science makes him a unique asset. He's always willing to go the extra mile and his positive attitude is contagious. Any organization would be lucky to have him.",
            "author": "Dr. Priya Sharma",
            "position": "Head of Analytics",
            "company": "Analytix Lab",
            "date": "March 2023",
            "linkedin_url": "https://www.linkedin.com/in/priya-sharma-analytics"
        },
        {
            "text": "Working with Rishi has been a great experience. His technical expertise in Python and data analysis is impressive, but what sets him apart is his ability to communicate complex concepts clearly. He's a natural teacher and mentor, always ready to help teammates learn and grow. His work ethic is exemplary.",
            "author": "David Kumar",
            "position": "Team Lead",
            "company": "TechSolutions Inc",
            "date": "August 2024",
            "linkedin_url": "https://www.linkedin.com/in/david-kumar-tech"
        },
        {
            "text": "Rishi is one of the most dedicated and skilled developers I've worked with. His attention to detail and commitment to writing clean, efficient code is remarkable. He approaches every project with enthusiasm and delivers results that exceed expectations. I would gladly work with him again.",
            "author": "Amanda Rodriguez",
            "position": "Project Manager",
            "company": "Digital Innovations",
            "date": "December 2024",
            "linkedin_url": "https://www.linkedin.com/in/amanda-rodriguez-digital"
        }
    ]
    return testimonials

@app.route('/')
def home():
    testimonials = get_linkedin_testimonials()
    return render_template('index.html', testimonials=testimonials)

# Debug routes for typewriter animation
@app.route('/api/typewriter/status')
def typewriter_status():
    """Get current typewriter animation status"""
    return jsonify({
        'status': 'active',
        'animation_status': animation_status,
        'timestamp': datetime.datetime.now().isoformat()
    })

@app.route('/api/typewriter/restart')
def restart_typewriter():
    """Restart the typewriter animation"""
    animation_status['last_restart'] = datetime.datetime.now().isoformat()
    animation_status['restart_count'] += 1
    
    return jsonify({
        'message': 'Typewriter restart signal sent',
        'restart_count': animation_status['restart_count'],
        'timestamp': animation_status['last_restart']
    })

@app.route('/api/typewriter/debug')
def typewriter_debug():
    """Debug page for typewriter animation"""
    debug_info = {
        'animation_status': animation_status,
        'instructions': [
            'Open browser console to see typewriter logs',
            'Use restartTypewriter() in console to manually restart',
            'Use stopTypewriter() in console to stop animation',
            'Visit /api/typewriter/restart to restart via Flask'
        ]
    }
    return jsonify(debug_info)

@app.route('/contact')
def contact():
    # Contact form is handled via JavaScript mailto functionality
    # Redirect to home page with contact section
    return redirect(url_for('home') + '#contact')

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)