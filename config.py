"""
Production Configuration System
Environment-based configuration management
"""

import os
from pathlib import Path
from typing import Dict, Any

class Config:
    """Base configuration class"""
    
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Database settings (for future expansion)
    DATABASE_URL = os.environ.get('DATABASE_URL') or 'sqlite:///portfolio.db'
    
    # Application settings
    APP_NAME = 'Rishi Kumar Portfolio'
    APP_VERSION = '1.0.0'
    
    # Performance settings
    CACHE_TYPE = 'simple'
    CACHE_DEFAULT_TIMEOUT = 300
    
    # Security settings
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
    
    # Rate limiting
    RATELIMIT_STORAGE_URL = 'memory://'
    RATELIMIT_DEFAULT = '100 per hour'
    
    # Logging
    LOG_LEVEL = 'INFO'
    LOG_FILE = 'portfolio.log'
    
    # API settings
    API_RATE_LIMIT = '1000 per hour'
    API_TIMEOUT = 30
    
    # Email settings (for contact form)
    MAIL_SERVER = os.environ.get('MAIL_SERVER') or 'smtp.gmail.com'
    MAIL_PORT = int(os.environ.get('MAIL_PORT') or 587)
    MAIL_USE_TLS = os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', 'on', '1']
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    
    # Static file settings
    STATIC_FOLDER = 'static'
    STATIC_URL_PATH = '/static'
    
    # Template settings
    TEMPLATES_AUTO_RELOAD = False
    
    @staticmethod
    def init_app(app):
        """Initialize application with this config"""
        pass

class DevelopmentConfig(Config):
    """Development configuration"""
    
    DEBUG = True
    DEVELOPMENT = True
    
    # Relaxed security for development
    SESSION_COOKIE_SECURE = False
    
    # More verbose logging
    LOG_LEVEL = 'DEBUG'
    
    # Template auto-reload for development
    TEMPLATES_AUTO_RELOAD = True
    
    # Higher rate limits for development
    RATELIMIT_DEFAULT = '1000 per hour'
    API_RATE_LIMIT = '10000 per hour'

class ProductionConfig(Config):
    """Production configuration"""
    
    DEBUG = False
    DEVELOPMENT = False
    
    # Strict security
    SESSION_COOKIE_SECURE = True
    
    # Production logging
    LOG_LEVEL = 'WARNING'
    
    # Template caching
    TEMPLATES_AUTO_RELOAD = False
    
    # Production rate limits
    RATELIMIT_DEFAULT = '100 per hour'
    API_RATE_LIMIT = '1000 per hour'
    
    @classmethod
    def init_app(cls, app):
        """Production-specific initialization"""
        Config.init_app(app)
        
        # Log to syslog in production
        import logging
        from logging.handlers import SysLogHandler
        syslog_handler = SysLogHandler()
        syslog_handler.setLevel(logging.WARNING)
        app.logger.addHandler(syslog_handler)

class TestingConfig(Config):
    """Testing configuration"""
    
    TESTING = True
    DEBUG = True
    
    # Use in-memory database for testing
    DATABASE_URL = 'sqlite:///:memory:'
    
    # Disable CSRF for testing
    WTF_CSRF_ENABLED = False
    
    # No rate limiting in tests
    RATELIMIT_ENABLED = False

class HerokuConfig(ProductionConfig):
    """Heroku-specific configuration"""
    
    @classmethod
    def init_app(cls, app):
        """Heroku-specific initialization"""
        ProductionConfig.init_app(app)
        
        # Handle proxy headers
        from werkzeug.middleware.proxy_fix import ProxyFix
        app.wsgi_app = ProxyFix(app.wsgi_app)
        
        # Log to stdout
        import logging
        file_handler = logging.StreamHandler()
        file_handler.setLevel(logging.INFO)
        app.logger.addHandler(file_handler)

class DockerConfig(ProductionConfig):
    """Docker-specific configuration"""
    
    @classmethod
    def init_app(cls, app):
        """Docker-specific initialization"""
        ProductionConfig.init_app(app)
        
        # Docker-specific logging
        import logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
        )

# Configuration mapping
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'heroku': HerokuConfig,
    'docker': DockerConfig,
    'default': DevelopmentConfig
}

def get_config() -> Config:
    """Get configuration based on environment"""
    env = os.environ.get('FLASK_ENV', 'default')
    return config.get(env, config['default'])

def load_config_from_file(config_path: str) -> Dict[str, Any]:
    """Load configuration from file"""
    config_file = Path(config_path)
    
    if not config_file.exists():
        return {}
    
    if config_file.suffix == '.json':
        import json
        with open(config_file, 'r') as f:
            return json.load(f)
    elif config_file.suffix in ['.yml', '.yaml']:
        try:
            import yaml
            with open(config_file, 'r') as f:
                return yaml.safe_load(f)
        except ImportError:
            print("PyYAML not installed, cannot load YAML config")
            return {}
    else:
        print(f"Unsupported config file format: {config_file.suffix}")
        return {}

def create_config_file(config_type: str = 'development') -> str:
    """Create a sample configuration file"""
    config_data = {
        'SECRET_KEY': 'your-secret-key-here',
        'DATABASE_URL': 'sqlite:///portfolio.db',
        'MAIL_SERVER': 'smtp.gmail.com',
        'MAIL_PORT': 587,
        'MAIL_USE_TLS': True,
        'MAIL_USERNAME': 'your-email@example.com',
        'MAIL_PASSWORD': 'your-app-password',
        'DEBUG': config_type == 'development',
        'RATELIMIT_DEFAULT': '100 per hour',
        'API_RATE_LIMIT': '1000 per hour',
        'LOG_LEVEL': 'DEBUG' if config_type == 'development' else 'INFO'
    }
    
    config_path = f'config_{config_type}.json'
    
    with open(config_path, 'w') as f:
        import json
        json.dump(config_data, f, indent=2)
    
    return config_path

# Environment validation
def validate_environment():
    """Validate environment configuration"""
    required_vars = []
    missing_vars = []
    
    # Check for required production variables
    if os.environ.get('FLASK_ENV') == 'production':
        required_vars = ['SECRET_KEY', 'MAIL_USERNAME', 'MAIL_PASSWORD']
    
    for var in required_vars:
        if not os.environ.get(var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"WARNING: Missing required environment variables: {', '.join(missing_vars)}")
        return False
    
    return True

# Configuration utilities
def get_database_url():
    """Get database URL with fallback"""
    return os.environ.get('DATABASE_URL') or 'sqlite:///portfolio.db'

def get_redis_url():
    """Get Redis URL for caching"""
    return os.environ.get('REDIS_URL') or 'redis://localhost:6379'

def get_mail_config():
    """Get email configuration"""
    return {
        'server': os.environ.get('MAIL_SERVER', 'smtp.gmail.com'),
        'port': int(os.environ.get('MAIL_PORT', 587)),
        'use_tls': os.environ.get('MAIL_USE_TLS', 'true').lower() in ['true', 'on', '1'],
        'username': os.environ.get('MAIL_USERNAME'),
        'password': os.environ.get('MAIL_PASSWORD')
    }

# Performance configuration
def get_performance_config():
    """Get performance configuration"""
    return {
        'cache_timeout': int(os.environ.get('CACHE_TIMEOUT', 300)),
        'request_timeout': int(os.environ.get('REQUEST_TIMEOUT', 30)),
        'max_workers': int(os.environ.get('MAX_WORKERS', 4)),
        'enable_gzip': os.environ.get('ENABLE_GZIP', 'true').lower() in ['true', 'on', '1']
    }

if __name__ == '__main__':
    # Create sample config files
    print("Creating sample configuration files...")
    dev_config = create_config_file('development')
    prod_config = create_config_file('production')
    
    print(f"Development config: {dev_config}")
    print(f"Production config: {prod_config}")
    
    # Validate current environment
    print("Validating environment...")
    if validate_environment():
        print("✅ Environment validation passed")
    else:
        print("❌ Environment validation failed")
