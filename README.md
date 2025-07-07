# 🎨 Rishi Kumar - Portfolio Website

A modern, responsive portfolio website built with Flask featuring enhanced card effects, smooth animations, and professional design.

## ✨ Features

### 🎯 **Core Features**
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Enhanced Card Effects**: Modern glass-morphism cards with hover animations
- **Professional UI**: Clean, modern design with smooth transitions
- **Contact Form**: Functional contact form with Flask backend
- **Performance Optimized**: Minified CSS bundles and optimized loading

### 📱 **Portfolio Sections**
- **Hero Section**: Dynamic introduction with animated background
- **About Me**: Skills, interests, and professional summary
- **Education**: Timeline with certifications and achievements
- **Experience**: Professional work history with enhanced cards
- **Projects**: Portfolio showcase with GitHub/Kaggle integration
- **Testimonials**: Client feedback and recommendations
- **Contact**: Multiple contact methods and functional form

### 🎨 **Enhanced Card Effects**
All cards feature modern hover effects:
- **Transparency**: Semi-transparent background with backdrop blur
- **Hover Animations**: Subtle lift and scale effects
- **Glow Effects**: Blue glow and enhanced shadows
- **3D Tilt**: Subtle parallax effect based on mouse movement
- **Light Sweep**: Animated light sweep on hover
- **Smooth Transitions**: Cubic-bezier animations for premium feel

## 🛠️ Technology Stack

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: 
  - Custom CSS with CSS Grid and Flexbox
  - CSS Bundles (critical.min.css, layout.min.css, sections.min.css, effects.min.css)
  - Enhanced card effects system
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Orbitron, Rajdhani, Exo 2)
- **Effects**: 
  - Starfield animation
  - Doodle system
  - Counter animations
  - Scroll-triggered animations

## 📁 Project Structure

```
project/
├── app.py                     # Flask application
├── requirements.txt           # Python dependencies
├── README.md                 # Project documentation
├── .gitignore               # Git ignore file
├── templates/               # Jinja2 templates
│   ├── base.html           # Base template with optimized loading
│   ├── index.html          # Home page
│   └── 404.html            # Error page
├── static/                 # Static assets
│   ├── css/
│   │   ├── bundles/        # Minified CSS bundles
│   │   │   ├── critical.min.css    # Critical path CSS
│   │   │   ├── layout.min.css      # Layout styles
│   │   │   ├── sections.min.css    # Section-specific styles
│   │   │   └── effects.min.css     # Animation effects
│   │   ├── enhanced-card-effects.css # Enhanced card styling
│   │   └── doodle.css      # Doodle system
│   └── js/
│       ├── navigation.js    # Navigation functionality
│       ├── hero.js         # Hero section animations
│       ├── contact.js      # Contact form handling
│       ├── simple-animations.js # Basic animations
│       ├── counter-animation.js # Counter effects
│       ├── enhanced-starfield.js # Starfield background
│       ├── enhanced-card-interactions.js # Card effects
│       └── doodle.js       # Doodle functionality
└── env/                    # Python virtual environment
```

## 🚀 Installation & Setup

### 1. **Clone or download the project**
```bash
git clone [repository-url]
cd project
```

### 2. **Set up virtual environment (recommended)**
```bash
# Create virtual environment
python -m venv env

# Activate virtual environment
# On Windows:
env\Scripts\activate
# On macOS/Linux:
source env/bin/activate
```

### 3. **Install dependencies**
```bash
pip install -r requirements.txt
```

### 4. **Run the application**
```bash
python app.py
```

### 5. **Open in browser**
Visit `http://127.0.0.1:5000`

## 🎨 Card Effects System

The portfolio features a sophisticated card effects system that applies consistent styling across all card types:

### **Enhanced Card Types:**
- Experience Cards (`.experience-card`)
- Project Cards (`.project-card-new`)
- About Introduction Cards (`.about-intro-card`)
- Skills Cards (`.skills-card`)
- Interests Cards (`.interests-card`)
- Badge Categories (`.badge-category`)
- Individual Badges (`.credly-badge`)
- Timeline Items (`.timeline-item`)
- Contact Link Items (`.contact-link-item`)
- Testimonial Cards (`.testimonial-card`)
- Portfolio Cards (`.portfolio-card`)

### **Effect Details:**
- **Background**: `rgba(30, 41, 59, 0.8)` with backdrop blur
- **Border**: Subtle blue border with hover state changes
- **Animations**: Smooth lift, scale, and glow effects
- **3D Tilt**: Interactive parallax based on mouse movement
- **Light Sweep**: Animated light sweep on hover
- **Responsive**: Mobile-optimized interactions

## 🎯 Performance Optimizations

### **CSS Optimization:**
- **Minified Bundles**: CSS split into optimized bundles
- **Critical Path CSS**: Above-the-fold content prioritized
- **Efficient Loading**: Strategic CSS loading order
- **Responsive Optimizations**: Mobile-first approach

### **JavaScript Optimization:**
- **Modular Code**: Separated functionality into focused modules
- **Event Delegation**: Efficient event handling
- **Intersection Observer**: Performance-optimized scroll animations
- **Debounced Interactions**: Smooth user interactions

## 🔧 Development Features

### **Debug Mode:**
- All console.log statements are commented out for production
- Debug prints in Python are commented out
- Clean codebase with no test artifacts

### **Code Organization:**
- **Modular CSS**: Organized into logical sections
- **Reusable Components**: Consistent design patterns
- **Clean Architecture**: Separation of concerns
- **Optimized Assets**: Minified and bundled resources

## 📱 Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Responsive Design**: Optimized for all screen sizes (320px+)
- **Progressive Enhancement**: Graceful degradation for older browsers

## 🌟 Key Features Implemented

### **Visual Effects:**
- ✅ Enhanced card hover effects with transparency
- ✅ Smooth animations and transitions
- ✅ 3D tilt effects on mouse movement
- ✅ Glow and shadow effects
- ✅ Animated background (starfield)
- ✅ Light sweep animations

### **User Experience:**
- ✅ Responsive navigation with mobile menu
- ✅ Smooth scrolling navigation
- ✅ Scroll-triggered animations
- ✅ Interactive contact form
- ✅ Professional loading states

### **Performance:**
- ✅ Optimized CSS bundles
- ✅ Efficient JavaScript loading
- ✅ Mobile-first responsive design
- ✅ Optimized image loading

## 🚢 Production Deployment

For production deployment:

1. **Environment Setup:**
   ```bash
   # Set environment variables
   export FLASK_ENV=production
   export SECRET_KEY=your-secret-key-here
   ```

2. **Security Configuration:**
   - Set `app.secret_key` to a secure random value
   - Configure HTTPS
   - Set up proper CORS policies

3. **Server Configuration:**
   ```bash
   # Using Gunicorn
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:8000 app:app
   ```

4. **Performance Optimization:**
   - Enable gzip compression
   - Configure CDN for static assets
   - Set up proper caching headers

## 📞 Contact Form

The contact form includes:
- **Validation**: Client and server-side validation
- **Security**: CSRF protection and input sanitization
- **Feedback**: Flash messaging for user feedback
- **Error Handling**: Proper error states and recovery
- **Accessibility**: ARIA labels and keyboard navigation

## 📄 License

This project is for portfolio purposes. Feel free to use as reference for your own projects.

---

**Built with ❤️ by Rishi Kumar**
