# Rishi Kumar - Portfolio Website

A modern, responsive portfolio website built with Flask, HTML, CSS, and JavaScript.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Contact Form**: Functional contact form with Flask backend
- **Portfolio Sections**: 
  - Hero section with introduction
  - About me with skills and interests
  - Education and certifications timeline
  - Professional experience
  - Projects showcase with GitHub/Kaggle links
  - Testimonials
  - Contact information

## Technology Stack

- **Backend**: Python Flask
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Montserrat, Roboto)

## Project Structure

```
project/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── README.md             # Project documentation
├── .gitignore            # Git ignore file
├── templates/            # Jinja2 templates
│   ├── base.html         # Base template
│   ├── index.html        # Home page
│   ├── contact.html      # Contact page
│   └── 404.html          # Error page
├── static/              # Static assets
│   ├── css/
│   │   └── style.css    # Main stylesheet
│   └── js/
│       └── script.js    # JavaScript functionality
└── env/                 # Python virtual environment
```

## Installation & Setup

1. **Clone or download the project**

2. **Install dependencies** (Flask is already installed in the virtual environment):
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the application**:
   ```bash
   python app.py
   ```

4. **Open in browser**:
   Visit `http://127.0.0.1:5000`

## Features Implemented

### Frontend (Pure JavaScript, HTML, CSS)
- ✅ Responsive navigation with mobile menu
- ✅ Smooth scrolling navigation
- ✅ Animated sections with intersection observer
- ✅ Modern CSS with custom properties (CSS variables)
- ✅ Interactive contact form
- ✅ Professional animations and transitions

### Backend (Python Flask)
- ✅ Route handling for home and contact pages
- ✅ Form processing with validation
- ✅ Flash messaging system
- ✅ Error handling (404 page)
- ✅ Template rendering with Jinja2

## Removed Technologies

This project was converted from a React/Vite setup to pure Flask + JavaScript:

**Removed:**
- React.js and React DOM
- TypeScript
- Vite build system
- ESLint configuration
- Tailwind CSS (replaced with custom CSS)
- All Node.js dependencies

**Replaced with:**
- Pure JavaScript (ES6+)
- Custom CSS with modern features
- Flask template system
- Python-based backend

## Development

The application runs in debug mode by default. For production deployment:

1. Set `app.secret_key` to a secure random value
2. Set `debug=False` in `app.run()`
3. Use a production WSGI server like Gunicorn
4. Configure environment variables for sensitive data

## Contact Form

The contact form is fully functional and includes:
- Form validation (client and server-side)
- Flash messaging for user feedback
- Proper error handling
- Clean form reset after submission

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Responsive design for all screen sizes

## License

This project is for portfolio purposes. Feel free to use as reference for your own projects.
