# Portfolio Services - Enhanced backend functionality
# This file contains services that were moved from JavaScript to Python for better performance and maintainability

import random
import datetime
import re
from typing import Dict, List, Optional, Tuple
from error_handling import handle_service_errors, safe_api_call, ValidationError, ServiceError, validate_required_fields


class DoodleService:
    """Enhanced doodle generation service moved from JavaScript"""
    
    def __init__(self):
        # Python & Data Science focused tech icons with weighted distribution
        self.tech_icons = [
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
        
        # Icon types (regular vs brands vs solid)
        self.icon_types = {
            # Brand icons
            'fa-python': 'fab',
            'fa-github': 'fab',
            'fa-git-alt': 'fab',
            'fa-aws': 'fab',
            'fa-docker': 'fab',
            # All others are solid (fas)
            'default': 'fas'
        }
        
        # Vibrant color schemes for tech themes
        self.vibrant_colors = [
            # Blues (Python/Data Science theme)
            '#3B82F6', '#60A5FA', '#2563EB', '#1D4ED8', '#1E40AF', '#0EA5E9', '#0284C7', '#0891B2', '#06B6D4',
            
            # Greens (Success/Growth)
            '#10B981', '#059669', '#047857', '#166534', '#22C55E', '#84CC16', '#65A30D',
            
            # Yellow/Orange (Energy/Innovation)
            '#F59E0B', '#D97706', '#B45309', '#FB923C', '#F97316', '#EA580C', '#C2410C',
            
            # Reds (Power/Performance)
            '#EF4444', '#DC2626', '#B91C1C', '#F43F5E', '#BE123C', '#E11D48', '#9F1239',
            
            # Purples (AI/ML theme)
            '#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#A855F7', '#9333EA', '#7E22CE',
            
            # Pinks (Creative/Design)
            '#EC4899', '#DB2777', '#BE185D', '#E879F9', '#D946EF', '#C026D3',
            
            # Cyans & Teals (Data/Analytics)
            '#14B8A6', '#0D9488', '#0F766E', '#67E8F9', '#22D3EE', '#0EA5E9'
        ]
        
        # Movement patterns for varied animations
        self.movement_patterns = [
            'random', 'zigzag', 'spiral', 'bounce', 'wave', 
            'elastic', 'orbit', 'swerve', 'pulse'
        ]
        
        # Visual style options
        self.visual_styles = [
            'solid', 'gradient', 'outlined', 'glow', 'split', 
            'double', 'layered', 'neon'
        ]
    
    @handle_service_errors
    def generate_optimized_doodles(self, count: int = 15, device_type: str = 'desktop', 
                                 section: Optional[int] = None) -> List[Dict]:
        """Generate optimized doodles based on device and performance constraints"""
        
        # Validate inputs
        if not isinstance(count, int) or count < 1:
            raise ValidationError("Count must be a positive integer")
        
        if device_type not in ['mobile', 'tablet', 'desktop']:
            raise ValidationError("Device type must be 'mobile', 'tablet', or 'desktop'")
        
        # Performance optimization based on device
        if device_type == 'mobile':
            count = min(count, 15)  # Limit for mobile performance
        elif device_type == 'tablet':
            count = min(count, 25)
        else:  # desktop
            count = min(count, 35)
        
        try:
            doodles = []
            for i in range(count):
                doodle = self._create_single_doodle(section)
                doodles.append(doodle)
            
            return doodles
        except Exception as e:
            raise ServiceError(f"Failed to generate doodles: {str(e)}")
    
    def _create_single_doodle(self, section: Optional[int] = None) -> Dict:
        """Create a single optimized doodle"""
        
        # Select icon with weighted probability
        icon_name = random.choice(self.tech_icons)
        icon_prefix = self.icon_types.get(icon_name, self.icon_types['default'])
        
        # Size distribution - weighted toward medium sizes for better performance
        size_weights = [0.05, 0.1, 0.2, 0.3, 0.2, 0.1, 0.05]
        size_ranges = list(range(16, 41, 4))  # 16, 20, 24, 28, 32, 36, 40
        size = random.choices(size_ranges, weights=size_weights)[0]
        
        # Lifetime distribution - weighted toward middle durations (7-15 seconds)
        lifetime_weights = [0.1, 0.15, 0.25, 0.3, 0.25, 0.15, 0.1]
        lifetime_base = 5000  # 5 seconds base
        lifetime_step = 2500  # 2.5 second steps
        lifetime_multiplier = random.choices(range(0, 7), weights=lifetime_weights)[0]
        lifetime = lifetime_base + (lifetime_multiplier * lifetime_step)
        
        return {
            'icon': icon_name,
            'prefix': icon_prefix,
            'color': random.choice(self.vibrant_colors),
            'size': size,
            'lifetime': lifetime,
            'style': random.choice(self.visual_styles),
            'pattern': random.choice(self.movement_patterns),
            'section': section if section is not None else random.randint(0, 4),
            'opacity': round(random.uniform(0.6, 0.9), 2),
            'speed': round(random.uniform(0.8, 1.5), 2),
            'hover_effect': random.choice(['glow', 'scale', 'spin', 'brighten', 'wobble']),
            'generated_at': datetime.datetime.now().isoformat(),
            'performance_optimized': True
        }
    
    def get_performance_config(self, device_type: str = 'desktop') -> Dict:
        """Get performance configuration based on device capabilities"""
        
        if device_type == 'mobile':
            return {
                'max_doodles': 15,
                'clean_interval': 45000,  # 45 seconds between cleanups
                'performance_threshold': 25,  # fps below which to reduce doodles
                'reduced_effects': True
            }
        elif device_type == 'tablet':
            return {
                'max_doodles': 25,
                'clean_interval': 35000,  # 35 seconds
                'performance_threshold': 30,
                'reduced_effects': False
            }
        else:  # desktop
            return {
                'max_doodles': 35,
                'clean_interval': 30000,  # 30 seconds
                'performance_threshold': 45,
                'reduced_effects': False
            }


class ContactService:
    """Enhanced contact form processing moved from JavaScript"""
    
    def __init__(self):
        # Advanced email validation regex
        self.email_regex = re.compile(
            r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        )
        
        # Spam detection keywords
        self.spam_keywords = [
            'viagra', 'casino', 'lottery', 'winner', 'prize', 'urgent',
            'click here', 'make money', 'work from home', 'get rich',
            'free money', 'investment opportunity'
        ]
    
    @handle_service_errors
    def validate_contact_data(self, data: Dict) -> Tuple[bool, str, Dict]:
        """Advanced contact form validation"""
        
        # Use centralized validation
        required_fields = ['name', 'email', 'subject', 'message']
        is_valid, error_message = validate_required_fields(data, required_fields)
        
        if not is_valid:
            return False, error_message, {}
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()
        
        # Length validation
        if len(name) < 2 or len(name) > 100:
            return False, 'Name must be between 2 and 100 characters', {}
        
        if len(subject) < 5 or len(subject) > 200:
            return False, 'Subject must be between 5 and 200 characters', {}
        
        if len(message) < 10 or len(message) > 2000:
            return False, 'Message must be between 10 and 2000 characters', {}
        
        # Email format validation
        if not self.email_regex.match(email):
            return False, 'Please enter a valid email address', {}
        
        # Spam detection
        spam_score = self._calculate_spam_score(name, email, subject, message)
        if spam_score > 0.7:
            return False, 'Message appears to be spam', {'spam_score': spam_score}
        
        # All validations passed
        return True, 'Valid', {
            'spam_score': spam_score,
            'validated_at': datetime.datetime.now().isoformat(),
            'validation_passed': True
        }
    
    def _calculate_spam_score(self, name: str, email: str, subject: str, message: str) -> float:
        """Calculate spam probability score (0.0 to 1.0)"""
        
        score = 0.0
        total_text = f"{name} {subject} {message}".lower()
        
        # Check for spam keywords
        spam_keyword_count = sum(1 for keyword in self.spam_keywords if keyword in total_text)
        score += spam_keyword_count * 0.15  # Each spam keyword adds 0.15
        
        # Check for excessive capitalization
        if len([c for c in total_text if c.isupper()]) / len(total_text) > 0.5:
            score += 0.2
        
        # Check for excessive exclamation marks
        exclamation_ratio = total_text.count('!') / len(total_text)
        if exclamation_ratio > 0.05:  # More than 5% exclamation marks
            score += 0.3
        
        # Check for suspicious email patterns
        suspicious_domains = ['tempmail', '10minutemail', 'guerrillamail']
        if any(domain in email.lower() for domain in suspicious_domains):
            score += 0.4
        
        # Check for repeated characters (like "hellooooo")
        repeated_char_count = len(re.findall(r'(.)\1{3,}', total_text))
        score += repeated_char_count * 0.1
        
        return min(score, 1.0)  # Cap at 1.0
    
    def generate_email_template(self, name: str, email: str, subject: str, message: str) -> str:
        """Generate professional email template"""
        
        template = f"""Hello Rishi,

You have received a new message through your portfolio website.

From: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
This message was sent through your portfolio contact form at {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}.

Best regards,
Portfolio Contact System"""
        
        return template


class ContentService:
    """Dynamic content management service"""
    
    def __init__(self):
        self.testimonial_rotation_index = 0
    
    def get_testimonials_with_rotation(self) -> Dict:
        """Get testimonials with intelligent rotation"""
        
        # This would typically connect to a database
        # For now, using the existing testimonials from app.py
        testimonials = [
            {
                "text": "Working with Rishi has been a great experience. His technical expertise in Python and data analysis is impressive, but what sets him apart is his ability to communicate complex concepts clearly.",
                "author": "David Kumar",
                "position": "Team Lead",
                "company": "TechSolutions Inc",
                "date": "August 2024",
                "featured": True,
                "rating": 5
            },
            # Add more testimonials here...
        ]
        
        # Rotate featured testimonial
        self.testimonial_rotation_index = (self.testimonial_rotation_index + 1) % len(testimonials)
        
        return {
            'testimonials': testimonials,
            'featured_index': self.testimonial_rotation_index,
            'total_count': len(testimonials),
            'last_updated': datetime.datetime.now().isoformat()
        }
    
    def get_projects_with_filters(self, category: Optional[str] = None, 
                                featured_only: bool = False) -> Dict:
        """Get projects with filtering capabilities"""
        
        projects = [
            {
                'title': 'Flask Portfolio Website',
                'category': 'web-development',
                'technologies': ['Flask', 'Python', 'HTML5', 'CSS3', 'JavaScript'],
                'featured': True,
                'github_url': 'https://github.com/RishiKumarRajvansh',
                'demo_url': None
            },
            {
                'title': 'Customer Churn Prediction Model',
                'category': 'machine-learning',
                'technologies': ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'Matplotlib'],
                'featured': True,
                'github_url': 'https://github.com/RishiKumarRajvansh',
                'kaggle_url': 'https://www.kaggle.com/rishikumarrajvansh'
            }
            # Add more projects...
        ]
        
        # Apply filters
        filtered_projects = projects
        if category:
            filtered_projects = [p for p in filtered_projects if p.get('category') == category]
        if featured_only:
            filtered_projects = [p for p in filtered_projects if p.get('featured', False)]
        
        return {
            'projects': filtered_projects,
            'total_count': len(filtered_projects),
            'categories': list(set(p.get('category', 'other') for p in projects)),
            'last_updated': datetime.datetime.now().isoformat()
        }


# Service instances
doodle_service = DoodleService()
contact_service = ContactService()
content_service = ContentService()
