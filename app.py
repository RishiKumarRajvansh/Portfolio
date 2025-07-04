from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, g
import os
import datetime
import random
import json
import time
from error_handling import handle_api_errors, handle_404_error, handle_500_error, performance_monitor, error_handler

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'your-secret-key-change-this-in-production')

# Performance monitoring middleware
@app.before_request
def before_request():
    g.start_time = time.time()
    g.request_id = f"{int(time.time() * 1000)}-{random.randint(1000, 9999)}"

@app.after_request
def after_request(response):
    duration = time.time() - g.start_time
    
    # Log slow requests
    if duration > 2.0:
        app.logger.warning(f'Slow request: {request.path} took {duration:.2f}s')
    
    # Update performance metrics
    performance_monitor.record_request_time(duration, request.endpoint or 'unknown')
    
    # Add performance headers
    response.headers['X-Response-Time'] = f"{duration:.3f}s"
    response.headers['X-Request-ID'] = g.request_id
    
    return response

# Register error handlers
app.register_error_handler(404, handle_404_error)
app.register_error_handler(500, handle_500_error)

# Register enhanced API routes
try:
    from api_routes import api_bp
    app.register_blueprint(api_bp)
    print("✅ Enhanced API routes registered successfully")
except ImportError as e:
    print(f"⚠️ Enhanced API routes not available: {e}")
except Exception as e:
    print(f"❌ Error registering enhanced API routes: {e}")

# Register hero API routes
try:
    from hero_api import hero_api
    app.register_blueprint(hero_api)
    print("✅ Hero API routes registered successfully")
except ImportError as e:
    print(f"⚠️ Hero API routes not available: {e}")
except Exception as e:
    print(f"❌ Error registering hero API routes: {e}")



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

@app.route('/contact')
def contact():
    # Contact form is handled via JavaScript mailto functionality
    # Redirect to home page with contact section
    return redirect(url_for('home') + '#contact')

@app.route('/send-message', methods=['POST'])
def send_message():
    """
    Handle contact form submission - creates mailto URL and redirects
    """
    try:
        # Get form data
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()
        
        # Validate required fields
        if not all([name, email, subject, message]):
            flash('All fields are required.', 'error')
            return redirect(url_for('home') + '#contact')
        
        # Create email body
        email_body = f"""Hello Rishi,

Name: {name}
Email: {email}

Message:
{message}

Best regards,
{name}"""
        
        # Create mailto URL
        import urllib.parse
        mailto_url = f"mailto:rishikumarrajvansh@gmail.com?subject={urllib.parse.quote(subject)}&body={urllib.parse.quote(email_body)}"
        
        # Return JSON response for AJAX handling
        if request.headers.get('Content-Type') == 'application/json':
            return jsonify({
                'status': 'success',
                'mailto_url': mailto_url,
                'message': 'Opening your default mail client...'
            })
        
        # For regular form submission, redirect to mailto URL
        return redirect(mailto_url)
        
    except Exception as e:
        flash('An error occurred while processing your message.', 'error')
        return redirect(url_for('home') + '#contact')

@app.route('/pricing-inquiry')
def pricing_inquiry():
    """
    Handle pricing inquiry - creates mailto URL for pricing request
    """
    try:
        # Create pricing inquiry email body
        email_body = """Hello Rishi,

I'm interested in your freelance services and would like to get pricing information for my project.

Project details:
- Project type: [Please specify: Web Development, Data Science, Integration, Automation, Other]
- Timeline: [Please specify]
- Budget range: [Please specify]
- Additional requirements: [Please describe your project in detail]

I look forward to hearing from you.

Best regards,
[Your Name]"""
        
        # Create mailto URL
        import urllib.parse
        subject = "Freelance Project Pricing Inquiry"
        mailto_url = f"mailto:rishikumarrajvansh@gmail.com?subject={urllib.parse.quote(subject)}&body={urllib.parse.quote(email_body)}"
        
        # Return JSON response for AJAX handling
        if request.headers.get('Accept') == 'application/json':
            return jsonify({
                'status': 'success',
                'mailto_url': mailto_url,
                'message': 'Opening your default mail client for pricing inquiry...'
            })
        
        # For regular requests, redirect to mailto URL
        return redirect(mailto_url)
        
    except Exception as e:
        flash('An error occurred while processing your pricing inquiry.', 'error')
        return redirect(url_for('home') + '#contact')

# Doodle related data and functions - Python & Data Science focused
tech_icons = [
    # Python & Core Programming (highest frequency)
    'fa-python', 'fa-python', 'fa-python', 'fa-python', 'fa-python',  # 5x Python for high frequency
    'fa-code', 'fa-code', 'fa-code',  # 3x code icons
    'fa-terminal', 'fa-laptop-code', 'fa-file-code', 'fa-keyboard',
    
    # Data Science & Analytics (high priority)
    'fa-chart-line', 'fa-chart-line', 'fa-chart-bar', 'fa-chart-bar', 'fa-chart-pie', 'fa-chart-area',
    'fa-database', 'fa-database', 'fa-table', 'fa-table',
    'fa-analytics', 'fa-poll', 'fa-sitemap', 'fa-project-diagram',
    
    # Machine Learning & AI
    'fa-brain', 'fa-brain', 'fa-robot', 'fa-robot',
    'fa-network-wired', 'fa-microscope', 'fa-flask', 'fa-atom',
    'fa-dna', 'fa-calculator', 'fa-square-root-alt', 'fa-function',
    
    # Mathematical & Scientific Computing
    'fa-equals', 'fa-plus', 'fa-minus', 'fa-times', 'fa-percentage',
    'fa-infinity', 'fa-superscript', 'fa-subscript',
    
    # Development Tools
    'fa-github', 'fa-git-alt', 'fa-code-branch', 'fa-bug', 'fa-wrench',
    'fa-tools', 'fa-cogs', 'fa-sync-alt',
    
    # Cloud & Infrastructure for Data Science
    'fa-aws', 'fa-cloud', 'fa-server', 'fa-hdd', 'fa-docker',
    'fa-cubes', 'fa-layer-group',
    
    # Jupyter Notebooks & Documentation
    'fa-file-alt', 'fa-sticky-note', 'fa-edit', 'fa-book',
    'fa-clipboard-list', 'fa-list-alt',
    
    # Data Visualization & Analysis
    'fa-eye', 'fa-search', 'fa-filter', 'fa-sort', 'fa-sort-up', 'fa-sort-down',
    'fa-th', 'fa-th-large', 'fa-th-list', 'fa-stream',
    
    # Performance & Optimization
    'fa-tachometer-alt', 'fa-rocket', 'fa-bolt', 'fa-fire',
    'fa-memory', 'fa-microchip', 'fa-compress-alt'
]

# Icon types (regular vs brands vs solid) - focused on Python & Data Science
icon_types = {
    # Brand icons
    'fa-python': 'fab',
    'fa-github': 'fab',
    'fa-git-alt': 'fab',
    'fa-aws': 'fab',
    'fa-docker': 'fab',
    
    # All others are solid (fas) - most data science and programming icons are solid
    'default': 'fas'
}

# Vibrant full-stack developer brand colors
vibrant_colors = [
    # Blues
    '#3B82F6', '#60A5FA', '#2563EB', '#1D4ED8', '#1E40AF', '#0EA5E9', '#0284C7', '#0891B2', '#06B6D4',
    
    # Greens
    '#10B981', '#059669', '#047857', '#166534', '#22C55E', '#84CC16', '#65A30D',
    
    # Yellow/Orange
    '#F59E0B', '#D97706', '#B45309', '#FB923C', '#F97316', '#EA580C', '#C2410C',
    
    # Reds
    '#EF4444', '#DC2626', '#B91C1C', '#F43F5E', '#BE123C', '#E11D48', '#9F1239',
    
    # Purples
    '#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#A855F7', '#9333EA', '#7E22CE',
    
    # Pinks
    '#EC4899', '#DB2777', '#BE185D', '#E879F9', '#D946EF', '#C026D3',
    
    # Cyans & Teals
    '#14B8A6', '#0D9488', '#0F766E', '#67E8F9', '#22D3EE', '#0EA5E9',
    
    # Multi-tone gradients (CSS gradient strings)
    'linear-gradient(135deg, #3B82F6, #10B981)',
    'linear-gradient(45deg, #F59E0B, #EF4444)',
    'linear-gradient(to right, #8B5CF6, #DB2777)',
    'linear-gradient(to bottom right, #06B6D4, #3B82F6)',
    'linear-gradient(to bottom, #22C55E, #84CC16)',
    'linear-gradient(to right, #FB923C, #F97316)'
]

# Movement patterns for varied animations
movement_patterns = [
    'random',      # Completely random movement in all directions
    'zigzag',      # Back and forth zig-zag pattern
    'spiral',      # Spiral outward or inward
    'bounce',      # Bouncing off invisible walls
    'wave',        # Smooth wave-like motion
    'elastic',     # Spring-like movement with overshoot
    'orbit',       # Circular orbit around a point  
    'swerve',      # Smooth curved paths
    'pulse'        # Stays mostly in place but pulses
]

# Routes for doodle generation
@app.route('/api/doodles', methods=['GET'])
def get_doodles():
    """Generate random doodle data from the server"""
    count = request.args.get('count', default=15, type=int)
    seed = request.args.get('seed', default=None, type=str)
    section = request.args.get('section', default=None, type=int)  # Optional section parameter (0-4)
    
    # Use seed for consistent results if provided
    if seed:
        random.seed(seed)
    else:
        random.seed(datetime.datetime.now().timestamp())
    
    # Visual style options
    visual_styles = ['solid', 'gradient', 'outlined', 'glow', 'split', 'double', 'layered', 'neon']
    
    # Log API request
    # app.logger.info(f"Doodle API request: count={count}, seed={seed}, section={section}")
    
    doodles = []
    for _ in range(count):
        # Select a random tech icon
        icon_name = random.choice(tech_icons)
        icon_prefix = icon_types.get(icon_name, icon_types['default'])
        
        # Random size between 16-40px, weighted toward medium sizes
        size_weights = [0.05, 0.1, 0.2, 0.3, 0.2, 0.1, 0.05]
        size_ranges = range(16, 41, 4)  # 16, 20, 24, 28, 32, 36, 40
        size = random.choices(size_ranges, weights=size_weights)[0]
        
        # Random lifetime weighted toward middle durations (7-15 seconds)
        lifetime_weights = [0.1, 0.15, 0.25, 0.3, 0.25, 0.15, 0.1]
        lifetime_base = 5000  # 5 seconds base
        lifetime_step = 2500  # 2.5 second steps
        lifetime = lifetime_base + random.choices(
            range(0, 7), weights=lifetime_weights
        )[0] * lifetime_step
        
        # Generate full doodle data
        doodle = {
            'icon': icon_name,
            'prefix': icon_prefix,
            'color': random.choice(vibrant_colors),
            'size': size,
            'lifetime': lifetime,
            'style': random.choice(visual_styles),
            'pattern': random.choice(movement_patterns),
            'section': section if section is not None else random.randint(0, 4),
            'opacity': random.uniform(0.6, 0.9),
            'speed': random.uniform(0.8, 1.5),
            'hover_effect': random.choice(['glow', 'scale', 'spin', 'brighten', 'wobble'])
        }
        doodles.append(doodle)
    
    return jsonify({
        'doodles': doodles,
        'timestamp': datetime.datetime.now().isoformat(),
        'count': len(doodles),
        'config': {
            'max_doodles': 50,
            'clean_interval': 30000,  # 30 seconds between cleanups
            'performance_threshold': 30  # fps below which to reduce doodles
        }
    })

@app.route('/api/doodles/status', methods=['POST'])
def update_doodle_status():
    """Update server about current doodle status - useful for tracking"""
    data = request.json
    
    # Update global animation status
    if 'count' in data:
        # app.logger.info(f"Client reports {data['count']} active doodles")
        pass
    
    # Log if client reports issues
    if 'issues' in data and data['issues']:
        # app.logger.warning(f"Client reports doodle issues: {data['issues']}")
        pass
    
    return jsonify({'status': 'ok', 'server_time': datetime.datetime.now().isoformat()})

@app.route('/api/health')
@handle_api_errors
def health_check():
    """Comprehensive health check endpoint"""
    from error_handling import check_system_health
    
    health_status = check_system_health()
    
    return jsonify({
        'success': True,
        'status': health_status['status'],
        'timestamp': datetime.datetime.now().isoformat(),
        'version': '1.0.0',
        'uptime': time.time() - g.start_time if hasattr(g, 'start_time') else 0,
        'health_checks': health_status['checks']
    })

@app.route('/api/metrics')
@handle_api_errors
def get_metrics():
    """Get performance metrics"""
    perf_stats = performance_monitor.get_performance_stats()
    error_stats = error_handler.get_error_stats()
    
    return jsonify({
        'success': True,
        'performance': perf_stats,
        'errors': error_stats,
        'timestamp': datetime.datetime.now().isoformat()
    })

@app.route('/api/status')
@handle_api_errors
def api_status():
    """Get API status"""
    return jsonify({
        'success': True,
        'status': 'operational',
        'apis': {
            'hero': '/api/hero/',
            'doodles': '/api/doodles',
            'enhanced': '/api/v2/',
            'health': '/api/health',
            'metrics': '/api/metrics'
        },
        'timestamp': datetime.datetime.now().isoformat()
    })

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

@app.route('/scroll-test')
def scroll_test():
    """Test page for scroll animations"""
    return render_template('scroll-test.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)